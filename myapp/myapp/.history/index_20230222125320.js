const axios = require('axios');

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function makeRequests() {
  for (let i = 0; i < 10; i++) {
    const response = await axios.get('https://www.google.com');
    console.log(response.data);
    await delay(1000);
  }
}

makeRequests();
