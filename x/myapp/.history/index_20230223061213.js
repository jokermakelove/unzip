const { parsePhoneNumberFromString } = require('libphonenumber-js');

const mobileNetworks = {
  'Viettel': ['086', '096', '097', '098', '0162', '0163', '0164', '0165', '0166', '0167', '0168', '0169'],
  'MobiFone': ['0129', '090', '093', '0120', '0129', '0127', '0126', '0128'],
  'Vinaphone': ['0128', '091', '094', '0123', '0124', '0125', '0121', '0122'],
  'Vietnamobile': ['092', '0186', '0188'],
  'GMobile': ['099', '059']
};

function getRandomPhoneNumber() {
  const randomNetwork = Object.keys(mobileNetworks)[Math.floor(Math.random() * Object.keys(mobileNetworks).length)];
  const randomPrefix = mobileNetworks[randomNetwork][Math.floor(Math.random() * mobileNetworks[randomNetwork].length)];
  const randomSuffix = Math.floor(Math.random() * (9999999 - 1000000 + 1) + 1000000);
  const randomPhoneNumber = randomPrefix + randomSuffix.toString().substring(1);
  
  function formatPhoneNumber(phoneNumber) {
    const formattedPhoneNumber = parsePhoneNumberFromString(phoneNumber, 'VN');
    return formattedPhoneNumber ? formattedPhoneNumber.formatNational() : null;
  }

  function convertPhoneNumber(phoneNumber) {
    const prefix = phoneNumber.substring(0, 4);
  
    if (prefix in convertPrefix) {
      return convertPrefix[prefix] + phoneNumber.substring(4);
    }
  
    return phoneNumber;
  }

  const convertPrefix = {
    '0162': '032',
    '0163': '033',
    '0164': '034',
    '0165': '035',
    '0166': '036',
    '0167': '037',
    '0168': '038',
    '0169': '039',
    '0120': '070',
    '0121': '079',
    '0122': '077',
    '0126': '076',
    '0128': '078',
    '0123': '083',
    '0124': '084',
    '0125': '085',
    '0127': '081',
    '0129': '082',
    '0188': '058',
    '0186': '056'
  };
  
  const convertedPhoneNumber = convertPhoneNumber(randomPhoneNumber);
  const formattedPhoneNumber = formatPhoneNumber(randomPhoneNumber);
  console.log("+84" + convertedPhoneNumber + "," + convertedPhoneNumber + "," + convertedPhoneNumber + "123@hotmail.com" + convertedPhoneNumber + "," + formattedPhoneNumber);
}

getRandomPhoneNumber();
