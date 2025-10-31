
import { GoogleGenAI } from "@google/genai";
import type { Message } from '../types';
import { Sender } from '../types';
import { SYSTEM_PROMPT } from '../constants';

const API_KEY = process.env.API_KEY;
if (!API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

export const getBotResponse = async (history: Message[]): Promise<string> => {
  const model = 'gemini-2.5-flash';
  
  const contents = history.map(msg => ({
    role: msg.sender === Sender.User ? 'user' : 'model',
    parts: [{ text: msg.text }],
  }));

  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: contents,
      config: {
        systemInstruction: {
          parts: [{ text: SYSTEM_PROMPT }],
        },
        temperature: 0.7,
        maxOutputTokens: 900
      }
    });

    return response.text;
  } catch (error) {
    console.error("Error generating content:", error);
    return "Произошла ошибка при обращении к AI. Пожалуйста, проверьте настройки и попробуйте снова.";
  }
};
