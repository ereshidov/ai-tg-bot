import 'dotenv/config'
export const config = {
  openAIApiKey: process.env.OPENAI_API_KEY,
  botToken: process.env.TELEGRAM_BOT_TOKEN,
}
