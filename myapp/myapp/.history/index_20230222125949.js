const puppeteer = require('puppeteer');

(async () => {
  // Khởi tạo trình duyệt Puppeteer
  const browser = await puppeteer.launch();

  // Mở trang web Google để đăng nhập
  const page = await browser.newPage();
  await page.goto('https://www.google.com/');

  // Điền thông tin đăng nhập
  await page.type('input[type="email"]', 'email-của-bạn');
  await page.click('div[id="identifierNext"]');

  await page.waitForTimeout(2000);

  await page.type('input[type="password"]', 'mật-khẩu-của-bạn');
  await page.click('div[id="passwordNext"]');

  // Đợi đến khi trang đã đăng nhập thành công và lưu trữ cookie Google Login
  await page.waitForNavigation({ waitUntil: 'networkidle2' });

  // Lấy cookie Google Login của tài khoản đã đăng nhập thành công
  const cookies = await page.cookies('https://www.google.com');

  // Kiểm tra xem cookie Google Login đã được lưu trữ thành công hay không
  const googleLoginCookie = cookies.find((cookie) => cookie.name === 'SID');
  if (googleLoginCookie) {
    console.log('Cookie Google Login đã được lưu trữ thành công!');
  } else {
    console.log('Cookie Google Login chưa được lưu trữ thành công!');
  }

  // Đóng trình duyệt Puppeteer
  await browser.close();
})();