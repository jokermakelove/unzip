const phone = require('phone');

// Tạo đối tượng để lưu thông tin nhà mạng điện thoại
const mobileNetworks = {
  'Viettel': ['086', '096', '097', '098', '032', '033', '034', '035', '036', '037', '038', '039'],
  'MobiFone': ['089', '090', '093', '070', '079', '077', '076', '078'],
  'Vinaphone': ['088', '091', '094', '083', '084', '085', '081', '082'],
  'Vietnamobile': ['092', '056', '058'],
  'GMobile': ['099', '059']
};

// Hàm chuyển đổi số điện thoại từ 11 số thành 10 số
function convertPhoneNumber(phoneNumber) {
  const result = phone(phoneNumber, 'VN');
  if (result.length === 0 || result[1] === null) {
    return null;
  } else {
    return result[0].substring(1);
  }
}

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
