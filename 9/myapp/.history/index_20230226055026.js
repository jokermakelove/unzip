const puppeteer = require('puppeteer-core');
const firefox = require('puppeteer-firefox');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');

(async () => {
  const browser = await firefox.launch({
    headless: false,
    executablePath: 'C:\Program Files\Mozilla Firefox\firefox.exee', // Đường dẫn đến Firefox trên máy của bạn
    args: ['--start-maximized'], // Mở trình duyệt với kích thước cửa sổ tối đa
  });

  const page = await browser.newPage();

  // Sử dụng plugin Stealth để giảm thiểu khả năng phát hiện bot
  const stealth = StealthPlugin();
  await stealth.onBrowser(browser);
  await stealth.onPage(page);

  try {
    // Đi tới trang đăng nhập của Google
    await page.goto('https://accounts.google.com/signin/v2/identifier');

    // Nhập địa chỉ email của bạn và bấm "Tiếp theo"
    await page.type('input[type="email"]', 'your_email@gmail.com');
    await page.click('div[id="identifierNext"]');

    // Chờ cho trang mật khẩu xuất hiện và nhập mật khẩu của bạn
    await page.waitForSelector('input[type="password"]', { visible: true });
    await page.type('input[type="password"]', 'your_password');

    // Bấm nút "Tiếp theo" để đăng nhập vào tài khoản của bạn
    await page.click('div[id="passwordNext"]');

    // Chờ cho trang đăng nhập hoàn thành và kiểm tra xem có bất kỳ lỗi nào xuất hiện không
    await page.waitForNavigation();
    if (page.url().indexOf('https://accounts.google.com/signin/') >= 0) {
      throw new Error('Đăng nhập thất bại');
    }

    console.log('Đăng nhập thành công vào tài khoản Google của bạn');

  } catch (error) {
    console.error('Lỗi: ', error.message);
  }

  await browser.close();
})();
