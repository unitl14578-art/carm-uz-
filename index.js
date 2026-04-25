const TelegramBot = require("node-telegram-bot-api");

const TOKEN = "8648856347:AAHwY4Xf8J4cNu5Q_IHrwYGex07dv3ssV1w";

const bot = new TelegramBot(TOKEN, {
  polling: true
});

bot.deleteWebHook();

console.log("BOT STARTED");

bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id, "🚗 Car Market", {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "🚗 Open Market",
            web_app: {
              // ⚠️ ВАЖНО: сюда потом вставишь Render ссылку
              url: "https://carm-uz.onrender.com"
            }
          }
        ]
      ]
     }
  });
});

bot.on("polling_error", (err) => {
  console.log("BOT ERROR:", err.message);
});