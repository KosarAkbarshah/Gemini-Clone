// const myapiKey = "AIzaSyDsmvUZMmN_a2eN7RUm5XKWytbumMIXnkY";

import {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
} from "@google/generative-ai"

const apiKey = "AIzaSyDsmvUZMmN_a2eN7RUm5XKWytbumMIXnkY";
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash-exp",
});

const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
};

async function run(propmt) {
    const chatSession = model.startChat({
        generationConfig,
        history: [
        ],
    });

    const result = await chatSession.sendMessage(propmt);
    const response = result.response;
    console.log(result.response.text());
    return response.text();
}

export default run;