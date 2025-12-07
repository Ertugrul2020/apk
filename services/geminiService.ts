import { GoogleGenAI } from "@google/genai";
import { AppConfig, GeneratedAsset } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateAppCode = async (config: AppConfig): Promise<GeneratedAsset[]> => {
  const model = "gemini-2.5-flash"; // Using Flash for speed as per guidelines for basic tasks

  const prompt = `
    You are an expert React Native and Android developer. 
    I need you to generate the source code for a mobile application based on the following configuration:
    
    App Name: ${config.appName}
    Package Name: ${config.packageName}
    Description: ${config.description}
    Primary Color: ${config.primaryColor}
    Category: ${config.category}
    Features Requested: ${config.features.join(", ")}

    Please provide the output strictly as a JSON object containing an array of files. 
    The format should be:
    {
      "files": [
        {
          "fileName": "App.js",
          "code": "...",
          "language": "javascript"
        },
        {
          "fileName": "README.md",
          "code": "...",
          "language": "markdown"
        },
        {
          "fileName": "styles.js",
          "code": "...",
          "language": "javascript"
        }
      ]
    }

    1. The 'App.js' should be a functional React Native component using Expo.
    2. Include comments in Arabic explaining the code sections.
    3. Ensure the UI matches the requested primary color.
    4. Do not wrap the JSON in markdown code blocks (like \`\`\`json). Just return the raw JSON string.
  `;

  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      }
    });

    const text = response.text;
    if (!text) throw new Error("No response from Gemini");

    const data = JSON.parse(text);
    return data.files || [];

  } catch (error) {
    console.error("Error generating app code:", error);
    throw error;
  }
};

export const generateAppDescription = async (appName: string, features: string[]) => {
    const model = "gemini-2.5-flash";
    const prompt = `Write a short, exciting marketing description in Arabic for an app named "${appName}" that has these features: ${features.join(', ')}. Keep it under 50 words.`;
    
    try {
        const response = await ai.models.generateContent({
            model,
            contents: prompt
        });
        return response.text;
    } catch (e) {
        return "وصف التطبيق غير متاح حالياً.";
    }
}