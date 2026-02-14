
import { GoogleGenAI } from "@google/genai";

/**
 * Updated GoogleGenAI initialization to follow strict guidelines: 
 * use process.env.API_KEY directly and instantiate inside functions.
 */
export const getAIGovernanceAdvice = async (topic: string) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `You are an AI Corporate Governance Architect. Provide a brief, high-level professional advice on the following topic related to shareholder management: ${topic}. Keep it actionable and mention best practices.`,
      config: {
        thinkingConfig: { thinkingBudget: 0 }
      }
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "The AI consultant is currently unavailable. Please try again later.";
  }
};

export const summarizeMeetingMinutes = async (rawNotes: string) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Summarize these meeting notes into key decisions and action items: ${rawNotes}`,
      config: {
        thinkingConfig: { thinkingBudget: 0 }
      }
    });
    return response.text;
  } catch (error) {
    return "Failed to summarize.";
  }
};
