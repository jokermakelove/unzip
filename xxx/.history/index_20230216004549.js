const TelegramBot = require('node-telegram-bot-api');
const { exec } = require('child_process');

// replace the value below with the Telegram token you receive from @BotFather
const token = '5374814839:AAG03l0RflXnIzJE3fMNFfnXymgjQFbg_ac';

// Create a bot instance
const bot = new TelegramBot(token, { polling: true });

// Get the chat ID from a message object
function getChatId(msg) {
  return msg.chat.id;
}

// Start listening for incoming messages
bot.on('message', (msg) => {
  const chatId = getChatId(msg);
  const message = msg.text;

  // Run the command in PowerShell
  exec(`powershell.exe -Command "Write-Host ${message}"`, (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return;
    }
    // Send the output of the command back to the user
    bot.sendMessage(chatId, stdout);
  });
});

// Handle errors
bot.on('polling_error', (error) => {
  console.log(error);
});

// Run the bot as a service
setInterval(() => {
  try {
    bot.startPolling();
  } catch (err) {
    console.error(err);
  }
}, 60000);
