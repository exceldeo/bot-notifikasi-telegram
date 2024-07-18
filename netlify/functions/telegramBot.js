const { createServer } = require("http");
const TelegramBot = require("node-telegram-bot-api");
const express = require("express");
const serverless = require("serverless-http");
require('dotenv').config();

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

const token = process.env.TOKEN;

const bot = new TelegramBot(token, { polling: true });

bot.on("message", async (msg) => {
  const chatId = msg.chat.id;
  let message = "ChatID : " + chatId;
  try {
    await sendMessage(chatId, message);
  } catch (error) {
    await sendMessage(chatId, error);
  }
});

function sendMessage(chatId, message) {
  return bot.sendMessage(chatId, message);
}

module.exports.handler = serverless(app);
