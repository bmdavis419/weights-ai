import { createOpenAI } from "@ai-sdk/openai";

// export const groq = createOpenAI({
//   baseURL: "https://api.groq.com/openai/v1",
//   apiKey: env.GROQ_API_KEY,
// });

export const openai = createOpenAI()
export const openaiModel = openai("gpt-3.5-turbo")
export const openaiEmbeddingModel = openai.embedding("text-embedding-ada-002")
