# ☀️ WEATHER.EXE: Pixel Edition

A functional, real-time weather application that retrieves data from the OpenWeatherMap API and displays it within a custom, nostalgic pixel-art interface. The design goal was to evoke the feeling of running an old-school command-line program or a retro computer operating system.

---

## ✨ Features

### **Real-Time Data**
Fetches current weather conditions (temperature, humidity, wind speed) and descriptions using the OpenWeatherMap API.

### **Pixel-Art Aesthetic**
Designed with a low-fidelity, 8-bit style using the *Press Start 2P* font and chunky retro window borders.

### **Dynamic Theming**
The color palette automatically adjusts depending on the queried city’s time of day:
- Morning  
- Noon  
- Night  

### **API-Driven Iconography**
Weather icons are loaded dynamically from OpenWeatherMap using the returned icon code.

### **Contextual Advice**
Gives personalized clothing or activity suggestions such as:
- “Perfect for a chill walk.”
- “Bundle up, it’s snow time.”

### **Mascot Character**
A tiny pixel mascot changes appearance based on time-of-day theme.

---

## 🛠️ Technologies Used

- **HTML5**
- **CSS3** (pixel-art styling, dynamic theming)
- **JavaScript (Vanilla JS)** – API calls & DOM manipulation
- **OpenWeatherMap API**

---

## 🚀 Getting Started

Follow the steps below to run the project locally.

---

### 1. API Key Setup

You need a free API key from **OpenWeatherMap**.

1. Sign up or log in at OpenWeatherMap.
2. Go to **API Keys** and copy your key.
3. Open `script.js` and replace the placeholder value:

```js
const apiKey = "YOUR_OPENWEATHERMAP_API_KEY_HERE";
