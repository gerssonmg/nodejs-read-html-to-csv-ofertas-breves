require('dotenv').config();

const headers = {
  authority: 'leve.loggi.com',
  accept: 'application/json, text/plain, */*',
  'accept-language': 'pt,en-US;q=0.9,en;q=0.8',
  appversion: 'prod-20240823.01',
  authorization: process.env.BEARER,
  'cache-control': 'no-cache',
  origin: 'https://arco.loggi.com',
  pragma: 'no-cache',
  referer: 'https://arco.loggi.com/',
  'sec-ch-ua':
    '"Chromium";v="122", "Not(A:Brand";v="24", "Google Chrome";v="122"',
  'sec-ch-ua-mobile': '?0',
  'sec-ch-ua-platform': '"Linux"',
  'sec-fetch-dest': 'empty',
  'sec-fetch-mode': 'cors',
  'sec-fetch-site': 'same-site',
  service: 'arco',
  'user-agent':
    'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
};

module.exports = headers;
