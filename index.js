const TelegramBot = require('node-telegram-bot-api');
const token = '7612126652:AAFncxHTMoQCAzpKbnyhyQ3sSStLs4YSJro';
const bot = new TelegramBot(token, { polling: true });
const codes = [
  "741236", "789632", "745698",
  "745236", "741258", "123698",
  "123654"
];
const userCodes = {};
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  const opts = {
    reply_markup: {
      keyboard: [
        [{ text: "📱 Kontaktni yuborish", request_contact: true }]
      ],
      resize_keyboard: true,
      one_time_keyboard: true
    }
  };
  bot.sendMessage(chatId, "Iltimos, kontakt ma'lumotlaringizni yuboring:", opts);
});
bot.on('contact', (msg) => {
  const chatId = msg.chat.id;
  const userId = msg.from.id;
  const currentIndex = userCodes[userId] ?? 0;
  const codeToSend = codes[Math.min(currentIndex, codes.length - 1)];
  bot.sendMessage(chatId, `✅ Sizning tasdiqlash kodingiz: ${codeToSend}`);
  userCodes[userId] = currentIndex + 1;
});