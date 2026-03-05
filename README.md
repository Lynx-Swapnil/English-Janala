# <img width="35px" src="./assets/logo.png" /> English Janala (ইংরেজি জানালা)

**Your Window to Learning English** - An interactive web-based vocabulary learning platform that makes mastering English fun and engaging!

[![Made with Love](https://img.shields.io/badge/Made%20with-❤️-red.svg)](https://github.com)
[![HTML](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

---

## 🌟 Overview

English Janala is a comprehensive vocabulary learning platform designed for Bengali speakers. It provides an intuitive interface to learn English words through organized lessons, interactive cards, voice pronunciation, and personalized word collections.

**Live Demo:** [Visit English Janala](https://lynx-swapnil.github.io/English-Janala/)

---

## ✨ Key Features

### 📚 **Structured Learning**
- **Progressive Lessons**: Multiple difficulty levels organized in sequential lessons
- **Dynamic Content Loading**: Words are fetched from a RESTful API
- **Visual Feedback**: Active lesson highlighting for better navigation

### 🎴 **Interactive Vocabulary Cards**
- **Complete Information**: Each card displays the word, meaning, and pronunciation
- **Detailed Modal View**: Click info icon for comprehensive details including:
  - Example sentences
  - Synonyms
  - Proper pronunciation guide
- **Responsive Design**: Perfectly adapts to mobile, tablet, and desktop screens

### 💾 **Personal Word Collection**
- **Save Favorites**: Add words to your personal collection with a heart icon
- **LocalStorage Persistence**: Your saved words remain even after closing the browser
- **Dedicated Section**: Beautiful pink-themed saved vocabulary display
- **Easy Management**: Toggle to add/remove words instantly

### 🔍 **Smart Search**
- **Real-time Search**: Find words as you type (500ms debounce)
- **Instant Results**: Search across all vocabulary words
- **Responsive UI**: Automatically updates display based on search query

### 🔊 **Voice Pronunciation**
- **Text-to-Speech**: Hear correct pronunciation of any word
- **Visual Feedback**: Button highlights when speaking
- **Browser-based**: Uses Web Speech API (no external dependencies)

### 🎨 **User Experience**
- **Loading Indicators**: Beautiful spinner during data fetch
- **Error Handling**: User-friendly messages in Bengali and English
- **Smooth Animations**: Professional transitions and effects
- **Bilingual Interface**: Bengali and English for better accessibility

---

## 🛠️ Technologies Used

| Technology | Purpose |
|-----------|---------|
| **HTML5** | Semantic structure and accessibility |
| **Tailwind CSS** | Utility-first styling framework |
| **DaisyUI** | Pre-built UI components |
| **JavaScript (ES6+)** | Dynamic functionality and API integration |
| **Web Speech API** | Voice pronunciation feature |
| **LocalStorage** | Client-side data persistence |
| **Font Awesome** | Beautiful icons throughout the app |

---

## 🚀 Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- Internet connection (for API and CDN resources)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/english-janala.git
   cd english-janala
   ```

2. **Open the project**
   ```bash
   # Simply open index.html in your browser
   # Or use a local server (recommended)
   ```

3. **Using Live Server (VS Code)**
   - Install "Live Server" extension
   - Right-click on `index.html` → Open with Live Server

4. **Using Python**
   ```bash
   # Python 3
   python -m http.server 8000
   ```

5. **Using Node.js**
   ```bash
   npx serve
   ```

---

## 📂 Project Structure

```
english-janala/
│
├── index.html              # Main HTML file
├── README.md               # Project documentation
├── tailwind.config.js      # Tailwind configuration
│
├── assets/                 # Images and static files
│   ├── logo.png
│   ├── hero-student.png
│   └── alert-error.png
│
├── script/                 # JavaScript files
│   └── index.js           # Main application logic
│
└── styles/                # CSS files
    └── style.css          # Custom styles and animations
```

---

## 🔌 API Endpoints

This project uses the Programming Hero Open API:

| Endpoint | Description | Example |
|----------|-------------|---------|
| **Get All Levels** | Fetch all available lesson levels | `https://openapi.programming-hero.com/api/levels/all` |
| **Get Words by Level** | Get vocabulary words for a specific level | `https://openapi.programming-hero.com/api/level/5` |
| **Get Word Details** | Get detailed information about a word | `https://openapi.programming-hero.com/api/word/5` |
| **Get All Words** | Fetch complete vocabulary database | `https://openapi.programming-hero.com/api/words/all` |

---

## 💡 How to Use

1. **Select a Lesson**: Click on any lesson button (Lesson - 1, Lesson - 2, etc.)
2. **Browse Words**: Scroll through vocabulary cards for that lesson
3. **View Details**: Click the ℹ️ icon to see detailed information in a modal
4. **Hear Pronunciation**: Click the 🔊 icon to hear the word pronounced
5. **Save Favorites**: Click the ❤️ icon to add words to your collection
6. **Search Words**: Type in the search box to find specific vocabulary
7. **View Saved Words**: Scroll to "Saved Vocabulary" section to see your collection

---

## 🎯 Features Breakdown

### ✅ Implemented Features

- [x] Dynamic lesson buttons from API
- [x] Interactive vocabulary cards
- [x] Active lesson highlighting
- [x] Detailed word information modal
- [x] Voice pronunciation with visual feedback
- [x] Real-time search functionality
- [x] Save words to personal collection
- [x] LocalStorage persistence
- [x] Loading spinner animations
- [x] Comprehensive error handling
- [x] Fully responsive design
- [x] Bilingual UI (Bengali/English)
- [x] Smooth animations and transitions

---

## 🎨 Design Features

- **Color Scheme**: Primary blue with accent colors
- **Typography**: Poppins (English) & Hind Siliguri (Bengali)
- **Responsive Grid**: 1 column (mobile) → 2 columns (tablet) → 3 columns (desktop)
- **Animations**: Smooth transitions, fade effects, and hover states
- **Accessibility**: Semantic HTML, proper ARIA labels, and keyboard navigation

---

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 Future Enhancements

- [ ] User authentication and cloud sync
- [ ] Progress tracking and statistics
- [ ] Quiz and practice modes
- [ ] Word categories and tags
- [ ] Dark mode toggle
- [ ] Export saved words to PDF
- [ ] Spaced repetition algorithm
- [ ] Offline support with Service Workers
- [ ] Multi-language support

---

## 🐛 Known Issues

- Voice pronunciation requires browser support for Web Speech API
- Some older browsers may not support all CSS features

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👤 Author

**Swapnil**
- GitHub: [@lynx-swapnil](https://github.com/lynx-swapnil)
- Portfolio: [lynx-swapnil.github.io/Portfolio](https://lynx-swapnil.github.io/Portfolio/)
- Project: [English Janala](https://lynx-swapnil.github.io/English-Janala/)

---

## 🙏 Acknowledgments

- [Programming Hero](https://programming-hero.com) for the API
- [DaisyUI](https://daisyui.com/) for beautiful UI components
- [Font Awesome](https://fontawesome.com/) for amazing icons
- [Tailwind CSS](https://tailwindcss.com/) for the utility framework

---

## 📸 Screenshots

### Hero Section
![Hero Section](./screenshots/hero.png)

### Vocabulary Cards
![Vocabulary Cards](./screenshots/cards.png)

### Saved Words
![Saved Words](./screenshots/saved.png)

### Modal Details
![Modal](./screenshots/modal.png)

---

<div align="center">

**Made with ❤️ for English Learners**

⭐ Star this repo if you find it helpful!

[Report Bug](https://github.com/lynx-swapnil/English-Janala/issues) · [Request Feature](https://github.com/lynx-swapnil/English-Janala/issues)

</div>
