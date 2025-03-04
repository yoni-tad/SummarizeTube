const express = require('express');
const { GoogleGenerativeAI } = require("@google/generative-ai");
const route = require('./router/route');
const { YoutubeTranscript } = require('youtube-transcript');
const dotenv = require('dotenv');
dotenv.config();
const app = express();


app.use(express.json());
app.use('/api', route);

// app.use('/', async (req, res) => {
//     const videoUrl = 'https://www.youtube.com/watch?v=ez6Fsta1vhA';
//     const apiKey = process.env.GEMINI_API_KEY;

//     console.log("🔗 Video URL:", videoUrl);
//     const summary = await summarizeYoutubeVideo(videoUrl, apiKey);
//     console.log("📌 Summary:", summary);
// });

async function summarizeYoutubeVideo(videoUrl, apiKey) {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({model: "gemini-1.5-flash"});

    try {
        const transcriptArray = await YoutubeTranscript.fetchTranscript(videoUrl);
        const transcript = transcriptArray.map(entry => entry.text).join(' ');
        const title = 'Barcelona vs Real Sociedad 4-0 Highlights & All Goals 2025 🔥 Lewandowski Goal';

        const prompt = `Summarize the following YouTube video ${title} and transcript: ${transcript}`;
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        return text;
    } catch(e) {
        console.error("Error summarizing video:", e);
        return "❌ Unable to summarize the video.";
    }
}

app.listen(3030, () => {
    console.log('✅ Server start listening http://localhost:3030');
})