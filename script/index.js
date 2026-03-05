const loadLessons = () => {
  fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((res) => res.json())
    .then((json) => displayLessons(json.data));
};

const removeActiveClassFromButtons = () => {
  const lessonButtons = document.querySelectorAll(".lesson-btn");
    lessonButtons.forEach(btn => btn.classList.remove("active"));
};

const loadLevelWords = (level_no) => {
  url = `https://openapi.programming-hero.com/api/level/${level_no}`;
  fetch(url)
    .then((res) => res.json())
    .then((json) => {
      removeActiveClassFromButtons();
      const clickedBtn = document.getElementById(`lesson-btn-${level_no}`);
      clickedBtn.classList.add("active");
      displayLevelWords(json.data);
    });
};
const loadWordDetails = async (word_id) => {
    const url = `https://openapi.programming-hero.com/api/word/${word_id}`;
        const res = await fetch(url);
        const details = await res.json();
        displayWordDetails(details.data);
};

// "word": "Eager",
// "meaning": "আগ্রহী",
// "pronunciation": "ইগার",
// "level": 1,
// "sentence": "The kids were eager to open their gifts.",
// "points": 1,
// "partsOfSpeech": "adjective",
// "synonyms": [
// "enthusiastic",
// "excited",
// "keen"
// ],
// "id": 5

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
        <span class="btn">${details.synonyms[0]}</span>
        <span class="btn">${details.synonyms[1]}</span>
        <span class="btn">${details.synonyms[2]}</span>
      </div>
    `;
    document.getElementById("word_modal").showModal();
}
const displayLevelWords = (words) => {
  const wordContainer = document.getElementById("word-container");
  wordContainer.innerHTML = "";

  if (words.length === 0) {
    wordContainer.innerHTML = ` <div class="text-center col-span-full rounded-xl py-10 space-y-6 font-bangla">
        <img class="mx-auto" src="./assets/alert-error.png" class="w-1/2 mx-auto" alt="">
        <p class="text-xl font-medium text-gray-400">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
        <h2 class="font-bold text-4xl">নেক্সট Lesson এ যান</h2>
     </div>`;
    return;
  }

  words.forEach((word) => {
    const card = document.createElement("div");
    card.innerHTML = `
         <div class="bg-white rounded-xl shadow-sm text-center py-10 px-5 space-y-4">
            <h2 class="font-bold text-2xl">${word.word ? word.word : "শব্দ পাওয়া যাযনি"}</h2>
            <p class="font-semibold">Meaning /Pronounciation</p>
            <div class="text-2xl font-medium font-bangla">"${word.meaning ? word.meaning : "অর্থ পাওয়া যায়নি"} / ${word.pronunciation ? word.pronunciation : "উচ্চারণ পাওয়া যায়নি"}"</div>
            <div class="flex justify-between items-center">
                <button onclick="loadWordDetails('${word.id}')" class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]"><i class="fa-solid fa-circle-info"></i></button>
                <button class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]"><i class="fa-solid fa-volume-up"></i></button>
            </div>
        </div
        `;
    wordContainer.appendChild(card);
  });
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


loadLessons();
