// Store saved words in localStorage
let savedWords = JSON.parse(localStorage.getItem('savedWords')) || [];

const createElement = (arr) => {
  const htmlElement = arr.map((el) => `<span class="btn">${el}</span>`);
  return htmlElement.join(" ");
};

function pronounceWord(word, buttonElement) {
  const utterance = new SpeechSynthesisUtterance(word);
  utterance.lang = "en-EN"; // English
  
  // Add visual feedback
  if (buttonElement) {
    buttonElement.classList.add('btn-accent');
    setTimeout(() => buttonElement.classList.remove('btn-accent'), 1000);
  }
  
  window.speechSynthesis.speak(utterance);
}

const saveWord = (wordData) => {
  // Check if word already exists
  const exists = savedWords.some(w => w.id === wordData.id);
  
  if (exists) {
    // Remove from saved words
    savedWords = savedWords.filter(w => w.id !== wordData.id);
    localStorage.setItem('savedWords', JSON.stringify(savedWords));
  } else {
    // Add to saved words
    savedWords.push(wordData);
    localStorage.setItem('savedWords', JSON.stringify(savedWords));
  }
  
  displaySavedWords();
  // Update the heart icon in current display
  updateHeartIcon(wordData.id);
};

const updateHeartIcon = (wordId) => {
  const heartBtn = document.getElementById(`heart-${wordId}`);
  if (heartBtn) {
    const isSaved = savedWords.some(w => w.id === wordId);
    const heartIcon = heartBtn.querySelector('i');
    if (isSaved) {
      heartIcon.classList.remove('fa-regular');
      heartIcon.classList.add('fa-solid', 'text-red-500');
    } else {
      heartIcon.classList.remove('fa-solid', 'text-red-500');
      heartIcon.classList.add('fa-regular');
    }
  }
};

const displaySavedWords = () => {
  const savedContainer = document.getElementById('saved-words-container');
  
  if (savedWords.length === 0) {
    savedContainer.innerHTML = `
      <div class="text-center col-span-full rounded-xl py-10 space-y-6 font-bangla">
        <p class="text-xl font-medium text-gray-400">
          আপনি এখনো কোন শব্দ Save করেননি
        </p>
        <h2 class="font-bold text-3xl">আপনার পছন্দের শব্দ সংরক্ষণ করুন।</h2>
      </div>
    `;
    return;
  }
  
  savedContainer.innerHTML = '';
  savedWords.forEach((word) => {
    const card = document.createElement('div');
    card.innerHTML = `
      <div class="bg-white rounded-xl shadow-sm text-center py-10 px-5 space-y-4 relative">
        <button onclick="saveWord(${JSON.stringify(word).replace(/"/g, '&quot;')})"
          class="absolute top-3 right-3 btn btn-sm btn-circle btn-ghost">
          <i class="fa-solid fa-times text-red-500"></i>
        </button>
        <h2 class="font-bold text-2xl">${word.word || 'শব্দ পাওয়া যায়নি'}</h2>
        <p class="font-semibold">Meaning / Pronunciation</p>
        <div class="text-2xl font-medium font-bangla">"${word.meaning || 'অর্থ পাওয়া যায়নি'} / ${word.pronunciation || 'উচ্চারণ পাওয়া যায়নি'}"</div>
        <div class="flex justify-between items-center">
          <button onclick="loadWordDetails('${word.id}')" class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]">
            <i class="fa-solid fa-circle-info"></i>
          </button>
          <button onclick="pronounceWord('${word.word}', this)" class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]">
            <i class="fa-solid fa-volume-up"></i>
          </button>
        </div>
      </div>
    `;
    savedContainer.appendChild(card);
  });
};

const manageSpinner = (status) => {
  if (status === true) {
    document.getElementById("spinner").classList.remove("hidden");
    document.getElementById("word-container").classList.add("hidden");
  } else {
    document.getElementById("spinner").classList.add("hidden");
    document.getElementById("word-container").classList.remove("hidden");
  }
};

const loadLessons = () => {
  fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((res) => {
      if (!res.ok) throw new Error('Failed to fetch lessons');
      return res.json();
    })
    .then((json) => displayLessons(json.data))
    .catch((error) => {
      console.error('Error loading lessons:', error);
      const levelContainer = document.getElementById("level-containter");
      levelContainer.innerHTML = `
        <div class="text-center col-span-full p-5 bg-red-50 rounded-xl">
          <p class="text-red-600 font-bangla">লেসন লোড করতে সমস্যা হয়েছে। পেজ রিলোড করুন।</p>
        </div>
      `;
    });
};

const removeActiveClassFromButtons = () => {
  const lessonButtons = document.querySelectorAll(".lesson-btn");
  lessonButtons.forEach((btn) => btn.classList.remove("active"));
};

const loadLevelWords = (level_no) => {
  manageSpinner(true);
  url = `https://openapi.programming-hero.com/api/level/${level_no}`;
  fetch(url)
    .then((res) => {
      if (!res.ok) throw new Error('Failed to fetch words');
      return res.json();
    })
    .then((json) => {
      removeActiveClassFromButtons();
      const clickedBtn = document.getElementById(`lesson-btn-${level_no}`);
      clickedBtn.classList.add("active");
      displayLevelWords(json.data);
    })
    .catch((error) => {
      console.error('Error loading level words:', error);
      manageSpinner(false);
      const wordContainer = document.getElementById("word-container");
      wordContainer.innerHTML = `
        <div class="text-center col-span-full rounded-xl py-10 space-y-6 font-bangla">
          <p class="text-xl font-medium text-red-500">
            শব্দ লোড করতে সমস্যা হয়েছে।
          </p>
          <h2 class="font-bold text-3xl">আবার চেষ্টা করুন।</h2>
        </div>
      `;
    });
};
const loadWordDetails = async (word_id) => {
  try {
    const url = `https://openapi.programming-hero.com/api/word/${word_id}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error('Failed to fetch word details');
    const details = await res.json();
    displayWordDetails(details.data);
  } catch (error) {
    console.error('Error loading word details:', error);
    const detailsBox = document.getElementById("details-container");
    detailsBox.innerHTML = `
      <div class="text-center p-5 bg-red-50 rounded-xl">
        <p class="text-red-600 font-bangla">বিস্তারিত তথ্য লোড করতে সমস্যা হয়েছে।</p>
      </div>
    `;
    document.getElementById("word_modal").showModal();
  }
};

const displayWordDetails = (details) => {
  const detailsBox = document.getElementById("details-container");
  detailsBox.innerHTML = `
     <div class="">
        <h2 class="text-2xl font-bold">${details.word} (<i class="fa-solid fa-microphone-lines"></i>:${details.pronunciation})</h2>
      </div>
      <div class="">
        <h2 class=" font-bold">Meaning</h2>
        <p>${details.meaning}</p>
      </div>
      <div class="">
        <h2 class ="font-bold">Example</h2>
        <p>${details.sentence}</p>
      </div>
      <div class="">
        <h2 class ="font-bold">সমার্থক শব্দ গুলো</h2>
        <div class="">
        </div>
        ${createElement(details.synonyms)}
      </div>
    `;
  document.getElementById("word_modal").showModal();
};
const displayLevelWords = (words) => {
  const wordContainer = document.getElementById("word-container");
  wordContainer.innerHTML = "";

  if (words.length === 0) {
    wordContainer.innerHTML = ` <div class="text-center col-span-full rounded-xl py-10 space-y-6 font-bangla">
        <img class="mx-auto" src="./assets/alert-error.png" class="w-1/2 mx-auto" alt="">
        <p class="text-xl font-medium text-gray-400">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
        <h2 class="font-bold text-4xl">নেক্সট Lesson এ যান</h2>
     </div>`;
    manageSpinner(false);
    return;
  }

  words.forEach((word) => {
    const isSaved = savedWords.some(w => w.id === word.id);
    const heartClass = isSaved ? 'fa-solid text-red-500' : 'fa-regular';
    
    const card = document.createElement("div");
    card.innerHTML = `
         <div class="bg-white rounded-xl shadow-sm text-center py-10 px-5 space-y-4">
            <h2 class="font-bold text-2xl">${word.word || "শব্দ পাওয়া যায়নি"}</h2>
            <p class="font-semibold">Meaning / Pronunciation</p>
            <div class="text-2xl font-medium font-bangla">"${word.meaning || "অর্থ পাওয়া যায়নি"} / ${word.pronunciation || "উচ্চারণ পাওয়া যায়নি"}"</div>
            <div class="flex justify-between items-center">
                <button onclick="loadWordDetails('${word.id}')" class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]">
                  <i class="fa-solid fa-circle-info"></i>
                </button>
                <div class="flex gap-2">
                  <button id="heart-${word.id}" onclick='saveWord(${JSON.stringify(word).replace(/'/g, "\\'")})' class="btn bg-pink-100 hover:bg-pink-200">
                    <i class="${heartClass} fa-heart"></i>
                  </button>
                  <button onclick="pronounceWord('${word.word}', this)" class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]">
                    <i class="fa-solid fa-volume-up"></i>
                  </button>
                </div>
            </div>
        </div>
        `;
    wordContainer.appendChild(card);
  });
  manageSpinner(false);
};

const displayLessons = (lessons) => {
  const levelContainer = document.getElementById("level-containter");
  levelContainer.innerHTML = "";
  for (const lesson of lessons) {
    const btnDiv = document.createElement("div");
    btnDiv.innerHTML = `
   <button id="lesson-btn-${lesson.level_no}" onclick="loadLevelWords(${lesson.level_no})" class="btn btn-outline btn-primary lesson-btn">
   <i class="fa-solid fa-book-open"></i>
    Lesson - ${lesson.level_no}</button>`;
    levelContainer.appendChild(btnDiv);
  }
};

// Search function
const performSearch = () => {
  removeActiveClassFromButtons();
  const searchInput = document.getElementById("input-search");
  const searchValue = searchInput.value.trim().toLowerCase();
  
  if (searchValue === '') {
    // Reset to default view
    const wordContainer = document.getElementById("word-container");
    wordContainer.innerHTML = `
      <div class="text-center col-span-full rounded-xl py-10 space-y-6 font-bangla">
        <p class="text-xl font-medium text-gray-400">
          আপনি এখনো কোন Lesson Select করেন নি
        </p>
        <h2 class="font-bold text-4xl">একটি Lesson Select করুন।</h2>
      </div>
    `;
    return;
  }
  
  manageSpinner(true);

  fetch("https://openapi.programming-hero.com/api/words/all")
    .then((res) => res.json())
    .then((data) => {
      const allWords = data.data;
      const filteredWords = allWords.filter((word) =>
        word.word.toLowerCase().includes(searchValue),
      );
      displayLevelWords(filteredWords);
    })
    .catch((error) => {
      console.error('Error fetching words:', error);
      manageSpinner(false);
      const wordContainer = document.getElementById("word-container");
      wordContainer.innerHTML = `
        <div class="text-center col-span-full rounded-xl py-10 space-y-6 font-bangla">
          <p class="text-xl font-medium text-red-500">
            দুঃখিত, শব্দ লোড করতে সমস্যা হয়েছে।
          </p>
          <h2 class="font-bold text-3xl">আবার চেষ্টা করুন।</h2>
        </div>
      `;
    });
};

// Initialize
loadLessons();
displaySavedWords();

// Search on button click
document.getElementById("btn-search").addEventListener("click", performSearch);

// Search on input change (with debounce)
let searchTimeout;
document.getElementById("input-search").addEventListener("input", () => {
  clearTimeout(searchTimeout);
  searchTimeout = setTimeout(performSearch, 500); // Wait 500ms after user stops typing
});
