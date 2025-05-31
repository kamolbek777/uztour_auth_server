const express = require('express');
const TelegramBot = require('node-telegram-bot-api');

const app = express();
app.use(express.json());

const TOKEN = '7612126652:AAFncxHTMoQCAzpKbnyhyQ3sSStLs4YSJro'; // <- o'zingizning token
const ADMIN_CHAT_ID = '5613554119'; // <- sizning Telegram ID (xabarlar sizga kelsin)

const bot = new TelegramBot(TOKEN, { polling: true });

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  const firstName = msg.from.first_name || '';
  const lastName = msg.from.last_name || '';
  const fullName = `${firstName} ${lastName}`.trim();

  const keyboard = {
    keyboard: [
      [{ text: '📱 Kontaktni yuborish', request_contact: true }]
    ],
    resize_keyboard: true,
    one_time_keyboard: true
  };

  bot.sendMessage(chatId, `Salom ${fullName}!\n\nIlovaga kirish uchun kontaktingizni yuboring.`, {
    reply_markup: keyboard
  });
});

bot.on('contact', (msg) => {
  const contact = msg.contact;
  const fullName = `${msg.from.first_name || ''} ${msg.from.last_name || ''}`.trim();
  const time = new Date().toLocaleString('uz-UZ', { timeZone: 'Asia/Tashkent' });

//  const message = `📞 Telefon: ${contact.phone_number}\n🕓 Vaqt: ${time}\n👤 Ismi: ${fullName}`;
    const message = JSON.stringify(contact, null, 2);

  // Admin (sizga) yuboradi
  bot.sendMessage(ADMIN_CHAT_ID, message);

  // Foydalanuvchiga kod yuboradi
  bot.sendMessage(msg.chat.id, `✅ Tasdiq kodi: 050805\n\nIltimos, ilovaga ushbu kodni kiriting.`);
});

// Express server (ixtiyoriy, hozircha kerak emas)
const PORT = 5001;
app.listen(PORT, () => console.log(`✅ Auth bot server is running on port ${PORT}`));
