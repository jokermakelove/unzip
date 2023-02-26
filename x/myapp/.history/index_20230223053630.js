const phone = require('phone');

// Tạo đối tượng để lưu thông tin nhà mạng điện thoại
const mobileNetworks = {
  'Viettel': ['086', '096', '097', '098', '0162', '0163', '0164', '0165', '0166', '0167', '0168', '0169'],
  'MobiFone': ['0129', '090', '093', '0120', '0129', '0127', '0126', '0128'],
  'Vinaphone': ['0128', '091', '094', '0123', '0124', '0125', '0121', '0122'],
  'Vietnamobile': ['092', '0186', '0188'],
  'GMobile': ['099', '059']
};


const randomIndex = Math.floor(Math.random() * Object.keys(mobileNetworks).length);
const randomNetwork = Object.keys(mobileNetworks)[randomIndex];
const randomPrefix = mobileNetworks[randomNetwork][Math.floor(Math.random() * mobileNetworks[randomNetwork].length)];
const randomSuffix = Math.floor(Math.random() * (9999999 - 1000000 + 1) + 1000000);
const phoneNumber = randomPrefix + randomSuffix.toString().substring(1);

console.log(randomPhone);

// Hàm chuyển đổi số điện thoại từ 11 số thành 10 số
const phone = require('phone');
function convertPhoneNumber(phoneNumber) {
  const result = phone(phoneNumber, 'VN');
  if (result.length === 0 || result[1] === null) {
    return null;
  } else {
    return result[0].substring(1);
  }
}

const phoneNumber = '0987654321';
const formattedPhoneNumber = convertPhoneNumber(phoneNumber);
console.log(formattedPhoneNumber);

// Hàm kiểm tra nhà mạng điện thoại của một số điện thoại
function getMobileNetwork(phoneNumber) {
  const convertedPhoneNumber = convertPhoneNumber(phoneNumber);
  if (convertedPhoneNumber !== null) {
    for (let network in mobileNetworks) {
      if (mobileNetworks[network].includes(convertedPhoneNumber.substring(0, 3))) {
        return network;
      }
    }
  }
  return 'Không xác định';
}

// Sử dụng hàm chuyển đổi số điện thoại
const phoneNumber = '01234567891';
const convertedPhoneNumber = convertPhoneNumber(phoneNumber);
console.log(convertedPhoneNumber);

// Sử dụng hàm kiểm tra nhà mạng điện thoại
const mobileNetwork = getMobileNetwork(phoneNumber);
console.log(mobileNetwork);
