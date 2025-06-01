const express = require('express');
const TelegramBot = require('node-telegram-bot-api');

const token = '7612126652:AAFncxHTMoQCAzpKbnyhyQ3sSStLs4YSJro';
const bot = new TelegramBot(token, { webHook: { port: false } });
const app = express();
const PORT = process.env.PORT || 10000;

const WEBHOOK_URL = `https://uztour-auth-server.onrender.com/bot${token}`;
bot.setWebHook(WEBHOOK_URL);

const codes = [
  "741236", "789632", "745698",
  "745236", "741258", "123698",
  "123654"
];
const userCodes = {};

// 📩 Telegramdan keladigan webhook so‘rovlarini qabul qilish
app.use(express.json());
app.post(`/bot${token}`, (req, res) => {
  bot.processUpdate(req.body);
  res.sendStatus(200);
});

// 🟢 Foydalanuvchi /start yozganda kontakt so‘raymiz
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  const opts = {
    reply_markup: {
      keyboard: [[{ text: "📱 Kontaktni yuborish", request_contact: true }]],
      resize_keyboard: true,
      one_time_keyboard: true
    }
  };
  bot.sendMessage(chatId, "Iltimos, kontakt ma'lumotlaringizni yuboring:", opts);
});

// 📱 Kontakt yuborilganda kod jo‘natamiz
//bot.on('contact', (msg) => {
//
//  const chatId = msg.chat.id;
//  const userId = msg.from.id;
//  const currentIndex = userCodes[userId] ?? 0;
//  const codeToSend = codes[Math.min(currentIndex, codes.length - 1)];
//  bot.sendMessage(chatId, `✅ Sizning tasdiqlash kodingiz: ${codeToSend}`);
//  userCodes[userId] = currentIndex + 1;
//});
bot.on('contact', (msg) => {
  const chatId = msg.chat.id;
  const userId = msg.from.id;
  const contact = msg.contact;

  // Kod yuborish
  const currentIndex = userCodes[userId] ?? 0;
  const codeToSend = codes[Math.min(currentIndex, codes.length - 1)];
  bot.sendMessage(chatId, `✅ Sizning tasdiqlash kodingiz: ${codeToSend}`);
  userCodes[userId] = currentIndex + 1;

  // Admin ga kontakt haqida habar yuborish
  const contactMessage = `📞 Yangi foydalanuvchi kontakt yubordi:\n👤 Ismi: ${contact.first_name}\n📱 Raqami: ${contact.phone_number}\n🆔 Telegram ID: ${userId}`;
  bot.sendMessage('5613554119', contactMessage);
});
bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  const userId = msg.from.id;
  const name = msg.from.first_name || 'Noma’lum';

  // Faqat oddiy matnli xabarlar uchun, va /start bo‘lmagan
  if (msg.text && !msg.text.startsWith('/start')) {
    const text = msg.text;
    const forwardMessage = `📩 Foydalanuvchi xabari:\n👤 Ismi: ${name}\n🆔 ID: ${userId}\n✉️ Xabar: ${text}`;
    bot.sendMessage('5613554119', forwardMessage);
  }
});


// 🚀 Express serverni ishga tushuramiz
app.listen(PORT, () => {
  console.log(`Bot server is running on port ${PORT}`);
});
