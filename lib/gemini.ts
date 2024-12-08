import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function createChatBot(context: string) {
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });
  
  const prompt = `
    You are a specialized chatbot with the following context and information:
    ${context}
    
    Please respond to user queries based on this context while staying in character.
    Keep responses concise, relevant, and helpful.
  `;

  const chat = model.startChat({
    history: [
      {
        role: "user",
        parts: prompt,
      },
    ],
  });

  return chat;
}

export async function generateBotResponse(chat: any, message: string) {
  try {
    const result = await chat.sendMessage(message);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Error generating bot response:', error);
    throw error;
  }
}