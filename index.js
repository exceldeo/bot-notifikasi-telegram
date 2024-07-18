const TelegramBot = require("node-telegram-bot-api");
const axios = require("axios");
const express = require("express");
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("ini adalah bot telegram");
});

app.post("/sendMessage", (req, res) => {
  console.log("req : ", req.body.chatId);

  const chatId = req.body.chatId;
  const message = req.body.message;

  sendMessage(chatId, message)
    .then(() => {
      res.send("Message sent successfully");
    })
    .catch((error) => {
      res.status(500).send("Failed to send message");
    });
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

// replace the value below with the Telegram token you receive from @BotFather
const token = process.env.TOKEN;

const bot = new TelegramBot(token, { polling: true });

bot.on("message", async (msg) => {
  const chatId = msg.chat.id;
  let message = chatId;
  try {
    bot.sendMessage(chatId, message);
  } catch (error) {
    bot.sendMessage(chatId, error);
  }
});

function sendMessage(chatId, message) {
  return bot.sendMessage(chatId, message);
}
