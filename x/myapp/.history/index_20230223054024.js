const { parsePhoneNumberFromString } = require('libphonenumber-js');

// Tạo đối tượng để lưu thông tin nhà mạng điện thoại
const mobileNetworks = {
  'Viettel': ['086', '096', '097', '098', '0162', '0163', '0164', '0165', '0166', '0167', '0168', '0169'],
  'MobiFone': ['0129', '090', '093', '0120', '0129', '0127', '0126', '0128'],
  'Vinaphone': ['0128', '091', '094', '0123', '0124', '0125', '0121', '0122'],
  'Vietnamobile': ['092', '0186', '0188'],
  'GMobile': ['099', '059']
};

// Chọn một nhà mạng điện thoại ngẫu nhiên
const randomIndex = Math.floor(Math.random() * Object.keys(mobileNetworks).length);
const randomNetwork = Object.keys(mobileNetworks)[randomIndex];

// Chọn một đầu số ngẫu nhiên của nhà mạng điện thoại
const randomPrefix = mobileNetworks[randomNetwork][Math.floor(Math.random() * mobileNetworks[randomNetwork].length)];

// Tạo một số ngẫu nhiên với 7 chữ số cuối
const randomSuffix = Math.floor(Math.random() * (9999999 - 1000000 + 1) + 1000000);

// Ghép đầu số và số ngẫu nhiên để tạo ra số điện thoại
const phoneNumber = randomPrefix + randomSuffix.toString().substring(1);

// Sử dụng thư viện libphonenumber-js để kiểm tra số điện thoại và chuyển đổi sang định dạng chuẩn
const phoneNumberObject = parsePhoneNumberFromString(phoneNumber, 'VN');
if (phoneNumberObject) {
  const formattedPhoneNumber = phoneNumberObject.formatInternational();
  console.log(formattedPhoneNumber);
} else {
  console.log('Số điện thoại không hợp lệ');
}

