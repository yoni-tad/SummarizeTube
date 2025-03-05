const { GoogleGenerativeAI } = require("@google/generative-ai");
const dotenv = require("dotenv");
const { YoutubeTranscript } = require("youtube-transcript");
dotenv.config();

exports.VideoSummarize = async (req, res) => {
  console.log('🔔 API called');
  const apiKey = process.env.GEMINI_API_KEY;
  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({model: 'gemini-1.5-flash'});

  try {
    const { title, videoUrl } = req.body;

    if (!videoUrl) throw new Error("Video url not found");

    const transcriptArray = await YoutubeTranscript.fetchTranscript(videoUrl);
    const transcript = transcriptArray.map((item) => item.text).join(' ');

    const prompt = `Summarize the following YouTube video ${title} and transcript: ${transcript}`;
    const result = await model.generateContent(prompt)
    const response = await result.response;
    const text = response.text(); 
    
    return res.status(200).json({text});
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "❌ Unable to summarize the video: " + e });
  }
};
