const loadLessons = () => {
  fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((res) => res.json())
    .then((json) => displayLessons(json.data));
};
const loadLevelWords = (level_no) => {
  url = `https://openapi.programming-hero.com/api/level/${level_no}`;
  fetch(url)
    .then((res) => res.json())
    .then((json) => displayLevelWords(json.data));
};
const displayLevelWords = (words) => {
  const wordContainer = document.getElementById("word-container");
  wordContainer.innerHTML = "";
  words.forEach((word) => {
    const card = document.createElement("div");
    card.innerHTML = `
         <div class="bg-white rounded-xl shadow-sm text-center py-10 px-5 space-y-4">
            <h2 class="font-bold text-2xl">${word.word}</h2>
            <p class="font-semibold">Meaning /Pronounciation</p>
            <div class="text-2xl font-medium font-bangla">"${word.meaning} / ${word.pronunciation}"</div>
            <div class="flex justify-between items-center">
                <button class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]"><i class="fa-solid fa-circle-info"></i></button>
                <button class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]"><i class="fa-solid fa-volume-up"></i></button>
            </div>
        </div>
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
   <button onclick="loadLevelWords(${lesson.level_no})" class="btn btn-outline btn-primary">
   <i class="fa-solid fa-book-open"></i>
    Lesson - ${lesson.level_no}</button>`;
    levelContainer.appendChild(btnDiv);
  }
};

loadLessons();
