# 📌 Summarize Tube 

### SummarizeTube is a Chrome extension that provides concise summaries of YouTube videos. By integrating with a Node.js backend and utilizing Gemini AI, it offers users a quick overview of video content without the need to watch the entire video.  


## ✨ Features  
- ✅ **Seamless Integration**
- ✅ **AI-Powered Summaries**
- ✅ **User-Friendly Interface**
- ✅ **Efficient & lightweight**

---

## 📹 Demo  
https://github.com/user-attachments/assets/fd802b81-ecf2-40eb-99cf-f890970f6d68


## 🛠️ Installation  

### 1️⃣ Clone the repository  
```sh
git clone https://github.com/yoni-tad/SummarizeTube.git
cd SummarizeTube
```

### 2️⃣ Setup back-end
- Go to back-end folder
- Install all packages
- Setup Gemini AI at .env 
- Run with **npm start**

### 3️⃣ Load the extension in Chrome
- Open Chrome and go to chrome://extensions/
- Enable Developer Mode (top right)
- Click "Load unpacked" and select the project folder
  
### 4️⃣ Pin the extension
- Click on Extensions (🧩 icon) in Chrome
- Pin the extension for easy access


## 📌 How It Works
1. Open any YouTube video in Chrome.
2. Click on the SummarizeTube extension icon in the toolbar.
3. A side panel will appear displaying the video's thumbnail and a "Summarize" button.
4. Click the "Summarize" button to generate and view the summary of the video.
5. Can copy the summary text.


  
## 🛠️ Technologies Used
- Extension: Manifest V3
- Frontend: JavaScript, HTML, Tailwind CSS
- Backend: Node.js
- AI Integration: Gemini AI



## 📂 Project Structure
```sh
📁 youtube-sidepanel-extension  
 ┣ 📁 assets               # Extension icons  
 ┣ 📁 back-end             # Full node js with AI  
 ┣ 📁 scripts              # JS files (background, content, side panel)   
 ┣ 📜 manifest.json        # Extension config (Manifest V3)  
 ┣ 📜 index.html           # Side Panel UI  
 ┗ 📜 README.md            # You are here 📌  
```



## 🚀 Future Improvements
- ✅ Add video title (if needed)
- ✅ Support chat with video


## 🤝 Contributing
Feel free to fork the repo and submit a pull request if you have improvements!

---

## 📜 License
📄 This project is MIT Licensed – feel free to use & modify!



