const unzipper = require('unzipper');
const { exec } = require('child_process');
const fs = require('fs');
const zipFilePath = 'C:\\Users\\Administrator\\Downloads\\Chrome.57.zip';
const unzipFolderPath = 'C:\\Users\\Administrator\\Downloads\\';
const executableFilePath = 'C:\\Users\\Administrator\\Downloads\\Chrome.57\\Shutdown.exe';

// Unzip the compressed file to the specified folder
fs.createReadStream(zipFilePath)
  .pipe(unzipper.Extract({ path: unzipFolderPath }))
  .on('close', () => {
    console.log('File unzipped successfully!');
    // Execute the executable file
    exec(executableFilePath, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error executing file: ${error}`);
        return;
      }
      console.log(`File executed successfully!\n${stdout}`);
    });
  });

