const puppeteer = require('puppeteer');

(async () => {
  // Khởi tạo trình duyệt Puppeteer
  const browser = await puppeteer.launch();

  // Mở trang web Google để đăng nhập
  const page = await browser.newPage();
  await page.goto('https://accounts.google.com/v3/signin/confirmidentifier?dsh=S-989647164%3A1677045720194241&authuser=1&continue=https%3A%2F%2Fwww.google.com%2Fwebhp%3Fauthuser%3D1&passive=1209600&sacu=1&flowName=GlifWebSignIn&flowEntry=ServiceLogin&ifkv=AWnogHcfArqGIIQf3buq6YJlJMtY9mmHAYGoMISyYc5TjODtdwLB-13JDp-8BOgUvLxj-fOGIE5b');

  // Điền thông tin đăng nhập
  await page.type('input[type="email"]', '0988873444');
  await page.click('div[id="identifierNext"]');

  await page.waitForTimeout(2000);

  await page.type('input[type="password"]', 'nancyhd1');
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