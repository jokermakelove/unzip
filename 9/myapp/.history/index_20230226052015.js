const puppeteer = require('puppeteer');

(async () => {
  // Khởi tạo trình duyệt mới và mở trang đăng nhập Google
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://accounts.google.com/signin/v2/challenge/pwd?continue=https%3A%2F%2Fmyaccount.google.com%2Fsigninoptions%2Frescuephone&service=accountsettings&osid=1&rart=ANgoxcfDAtCyW0hcPqsgX3AlUJr6nmtXH-6UAzD4u3jRpZLacF5Ch7BldC-e-XzVcyx2xwbkkQzFifZnd5-CkKAGg3OLOSFGaQ&flowName=GlifWebSignIn&TL=AKqFyY-QAF60_W70bA2u9XvR213jrkLz1egohrMuYvE8OLZpduqGctch_wKduBIs&cid=1&flowEntry=ServiceLogin&hl=vi');

  // Điền thông tin đăng nhập vào form
  await page.type('input[type="email"]', '0988873444', { delay: 10 });
  await page.click('div[id="identifierNext"]');
  await page.waitForTimeout(2000); // Đợi trang tải lại
  await page.type('input[type="password"]', 'nancyhd1', { delay: 10 });
  await page.click('div[id="passwordNext"]');
  await page.waitForTimeout(5000); // Đợi đăng nhập thành công

  // Lấy cookie của trình duyệt và đóng trình duyệt
  const cookies = await page.cookies();
  await browser.close();

  console.log('Login success');
})();
//Bạn cần thay thế YOUR_EMAIL_ADDRESS và YOUR_PASSWORD bằng địa chỉ email và mật khẩu của tài khoản Google của bạn. Sau đó, chạy đoạn mã trên để thực hiện đăng nhập.

Sau khi đăng nhập thành công, đoạn mã trên sẽ lấy cookie của trình duyệt và hiển thị thông báo "Login success". Bạn có thể sử dụng cookie này để thực hiện các hoạt động khác trên tài khoản Google, ví dụ như gửi email, đồng bộ hóa dữ liệu, và nhiều hơn nữa.




