import { ChatOpenAI } from "langchain/chat_models/openai";
import { config } from "../../config/config.js";
export const chat = new ChatOpenAI({
  openAIApiKey: config.openAIApiKey,
  modelName: "gpt-3.5-turbo",
});
