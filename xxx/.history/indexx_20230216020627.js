const unzipper = require('unzipper');
const { exec } = require('child_process');

const zipFilePath = '/path/to/zip/file.zip';
const unzipFolderPath = '/path/to/unzip/folder';
const executableFilePath = '/path/to/executable/file.exe';

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