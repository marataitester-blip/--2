import { GoogleGenAI } from "@google/genai";
import type { Message } from '../types';
import { Sender } from '../types';
import { SYSTEM_PROMPT } from '../constants';

export const getBotResponse = async (history: Message[]): Promise<string> => {
  const API_KEY = process.env.API_KEY;
  if (!API_KEY) {
    console.error("API_KEY environment variable not set");
    return "Ошибка конфигурации: Ключ API не найден. Пожалуйста, убедитесь, что он правильно настроен.";
  }
  const ai = new GoogleGenAI({ apiKey: API_KEY });

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
