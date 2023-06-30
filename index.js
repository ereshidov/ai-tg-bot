import { Telegraf } from "telegraf";
import { HumanChatMessage } from "langchain/schema";
import { chat } from "./lib/openAI/openAI.js";

import { config } from "./config/config.js";

const bot = new Telegraf(config.botToken);

bot.start((ctx) => ctx.reply("sdarova"));

bot.on("message", async (ctx) => {
  try {
    const botMention = `@${ctx.botInfo.username}`;

    const doesMessageHaveText = ctx?.message?.text
    const shouldRunRequest = doesMessageHaveText && ctx.message.text.includes(botMention)

    if (shouldRunRequest) {
      const loadingMessage = await ctx.reply("Я думаю...");

      const rawRequest = ctx.message.text
        .split(botMention)
        .filter((v) => v !== botMention)
        .join(" ");
      const response = await humanChatCall(rawRequest);

      const replyTo = doesMessageHaveText ? ctx.message.message_id : undefined

      ctx.reply(response, { reply_to_message_id: replyTo});
      ctx.deleteMessage(loadingMessage.message_id);
    }
  } catch (e) {
    ctx.reply(
      "Что-то пошло не так"
    );
  }
});
bot.launch();

export const humanChatCall = async (prompt) => {
  const response = await chat.call([new HumanChatMessage(prompt)]);
  return response.text;
};
