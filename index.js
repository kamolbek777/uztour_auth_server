//const express = require('express');
//const TelegramBot = require('node-telegram-bot-api');
//const token = '7252261041:AAH4QH8ZvkZZuDy7KEIRKeMEF2bZK2Tuck4';
////const bot = new TelegramBot(token, { webHook: { port: false } });
//const bot = new TelegramBot(token);
//const app = express();
//const PORT = process.env.PORT || 10000;
//const WEBHOOK_URL = `https://uztour-auth-server.onrender.com/bot${token}`;
//bot.setWebHook(WEBHOOK_URL);
//const codes = [
//  "741236", "789632", "745698",
//  "745236", "741258", "123698",
//  "123654"
//];
//const userCodes = {};
//app.use(express.json());
//app.post(`/bot${token}`, (req, res) => {
//  bot.processUpdate(req.body);
//  res.sendStatus(200);
//});
//
//bot.onText(/\/start/, (msg) => {
//  const chatId = msg.chat.id;
//  const opts = {
//    reply_markup: {
//      keyboard: [[{ text: "📱 Kontaktni yuborish", request_contact: true }]],
//      resize_keyboard: true,
//      one_time_keyboard: true
//    }
//  };
//  bot.sendMessage(chatId, "Kontakt malumotingizni yuboring", opts);
//  bot.sendMessage(chatId,"Kanalga azo bo'ling:\nInstagram: https://www.instagram.com/kamolbek_muzaffarov/\nYouTube: https://www.youtube.com/@Kamolbek_Muzaffarov", opts);
//});
//
//bot.on('contact', (msg) => {
//  const chatId = msg.chat.id;
//  const userId = msg.from.id;
//  if (!msg.contact) {
//    bot.sendMessage(chatId, "Iltimos,kontaktingizni yuboring");
//    return;
//  }
//  const contact = msg.contact;
//  const currentIndex = userCodes[userId] ?? 0;
//  const codeToSend = codes[Math.min(currentIndex, codes.length - 1)];
//  bot.sendMessage(chatId, `${codeToSend}`);
//  bot.sendMessage(chatId, "Salom\nQanday yordam bera olaman?");
//  userCodes[userId] = currentIndex + 1;
//  const contactMessage1 = `👤: ${contact.first_name}\n📱: ${contact.phone_number}\n🆔: ${userId}`;
//  bot.sendMessage('5613554119', contactMessage1);
//  }
//  const contactMessage2=`👤: ${contact.first_name}\n🆔: ${userId}`;
//  bot.sendMessage('1002725346662', contactMessage2);
//});
//bot.on('message', (msg) => {
//  const chatId = msg.chat.id;
//  const userId = msg.from.id;
//  const name = msg.from.first_name || 'Noma’lum';
//  if (msg.text && !msg.text.startsWith('/start')) {
//    const text = msg.text;
//    const forwardMessage = `✉️: ${text}\n👤: ${name}\n🆔: ${userId}`;
//    bot.sendMessage('5613554119', forwardMessage);
//  }
//});
//app.listen(PORT, () => {
//  console.log(`Bot server is running on port ${PORT}`);
//});
const express = require('express');
const TelegramBot = require('node-telegram-bot-api');

const token = '7252261041:AAH4QH8ZvkZZuDy7KEIRKeMEF2bZK2Tuck4';
const bot = new TelegramBot(token);
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

app.use(express.json());

app.post(`/bot${token}`, (req, res) => {
  bot.processUpdate(req.body);
  res.sendStatus(200);
});

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  const opts = {
    reply_markup: {
      keyboard: [[{ text: "📱 Kontaktni yuborish", request_contact: true }]],
      resize_keyboard: true,
      one_time_keyboard: true
    }
  };

  bot.sendMessage(chatId, "Kontakt malumotingizni yuboring", opts);
  bot.sendMessage(chatId, "Kanalga azo bo'ling:\nInstagram: https://www.instagram.com/kamolbek_muzaffarov/\nYouTube: https://www.youtube.com/@Kamolbek_Muzaffarov", opts);
});

bot.on('contact', (msg) => {
  const chatId = msg.chat.id;
  const userId = msg.from.id;

  if (!msg.contact) {
    bot.sendMessage(chatId, "Iltimos, kontaktingizni yuboring.");
    return;
  }

  const contact = msg.contact;
  const currentIndex = userCodes[userId] ?? 0;
  const codeToSend = codes[Math.min(currentIndex, codes.length - 1)];

  bot.sendMessage(chatId, `${codeToSend}`);
  bot.sendMessage(chatId, "Salom\nQanday yordam bera olaman?");
  userCodes[userId] = currentIndex + 1;

  const contactMessage1 = `👤: ${contact.first_name}\n📱: ${contact.phone_number}\n🆔: ${userId}`;
  bot.sendMessage('5613554119', contactMessage1);

  const contactMessage2 = `👤: ${contact.first_name}\n🆔: ${userId}`;
  bot.sendMessage('1002725346662', contactMessage2);
});

bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  const userId = msg.from.id;
  const name = msg.from.first_name || 'Noma’lum';

  if (msg.text && !msg.text.startsWith('/start')) {
    const text = msg.text;
    const forwardMessage = `✉️: ${text}\n👤: ${name}\n🆔: ${userId}`;
    bot.sendMessage('5613554119', forwardMessage);
  }
});

app.listen(PORT, () => {
  console.log(`✅ Bot server is running on port ${PORT}`);
});

//git add .
//git commit -m "Kodni yangiladim: foydalanuvchiga yangi habar qo‘shildi"
//git push
