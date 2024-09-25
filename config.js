require('dotenv').config();

const headers = {
  authority: 'leve.loggi.com',
  accept: 'application/json, text/plain, */*',
  'accept-language': 'pt,en-US;q=0.9,en;q=0.8',
  appversion: 'prod-20240823.01',
  authorization:
    'Bearer eyJraWQiOiJpOFo2dlpqQlZRT3FkRjFqMEY4TzhWcWl3eEpnXC9jRWR1SjMzd25WMW80UT0iLCJhbGciOiJSUzI1NiJ9.eyJhdF9oYXNoIjoibXd5MURNMlN6N3MyV0puTWxOQ0s2USIsInN1YiI6Ijg3YTc1MmRkLWQ0NWItNDBiZi04ODE4LTVkZDAyOWJhNzhkNCIsImNvZ25pdG86Z3JvdXBzIjpbIkFMTF9MT0dHSV9EQ1NfR1JPVVAiLCJBQlJBX0FOQUxZU1QiLCJzdXBwb3J0IiwiQUJSQV9SRUFEX0FMTCIsInVzLWVhc3QtMV9wR0piTHpMRG9fR29vZ2xlIiwiQkFTRV9BTkFMWVNUIl0sImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAudXMtZWFzdC0xLmFtYXpvbmF3cy5jb21cL3VzLWVhc3QtMV9wR0piTHpMRG8iLCJjb2duaXRvOnVzZXJuYW1lIjoiR29vZ2xlXzEwMzc2MTE0NTY4OTA3MDQzNjk0MyIsIm5vbmNlIjoib2drTVZiWW9RMGRDME5XRU5pdGs2Z1EwMUR5MmNKbVZFU0xmOGxOLUV3cVVicExfYlY4cWQySHVuWm02WjQ2YjIyU25wcWlyYjJyTDhWSHVlTUJ5ZEVzZW9Od1VNM0ppYkVqamtqcUhYZWtjbHczQVp6cEN3TWZsUTJrSVB3NFNDME8ta21tYjVCZUkyVDYxT2U5NDVIWTRxQnRiSzZMSEN2ajRWMFBMZkJFIiwiY3VzdG9tOmFjY2VzcyI6IntcImxvZ2dpX3VzZXJfaWRcIjogMTg0NDQ5NSwgXCJsYXN0TWlsZVwiOiBbe1wiaWRcIjogXCJsZXZlLXNwLW1vb2NhLXRlc3RlLWFnZW5kYWRvXzExNDY4OjUwMDlcIiwgXCJyb2xlXCI6IFwiT1dORVJcIn1dLCBcImNvbXBhbmllc1wiOiBbe1wiaWRcIjogMzg5MjIyLCBcInJvbGVcIjogXCJPV05FUlwifV19IiwiYXVkIjoiNnVqdThtcGZvYXRwZjI5YWhsYzMyZ3QwN2EiLCJpZGVudGl0aWVzIjpbeyJ1c2VySWQiOiIxMDM3NjExNDU2ODkwNzA0MzY5NDMiLCJwcm92aWRlck5hbWUiOiJHb29nbGUiLCJwcm92aWRlclR5cGUiOiJHb29nbGUiLCJpc3N1ZXIiOm51bGwsInByaW1hcnkiOiJ0cnVlIiwiZGF0ZUNyZWF0ZWQiOiIxNTk5ODU2OTQxODcxIn1dLCJ0b2tlbl91c2UiOiJpZCIsImF1dGhfdGltZSI6MTcyNzE4MDY3OCwibmFtZSI6IkdlcnNvbiBDcmlzb3N0b21vIEFndWlhciBGaWxobyIsImV4cCI6MTcyNzE4NDI3OCwiaWF0IjoxNzI3MTgwNjc5LCJlbWFpbCI6ImdlcnNvbi5maWxob0Bsb2dnaS5jb20iLCJjdXN0b206YWNjZXNzTG9nZ2lFbnZpb3MiOiJ7XCJsb2dnaV91c2VyX2lkXCI6IDE4NDQ0OTUsIFwibGFzdE1pbGVcIjogW3tcImlkXCI6IFwibGV2ZS1zcC1tb29jYS10ZXN0ZS1hZ2VuZGFkb18xMTQ2ODo1MDA5XCIsIFwicm9sZVwiOiBcIk9XTkVSXCJ9XSwgXCJjb21wYW5pZXNcIjogW3tcImlkXCI6IDM4OTIyMiwgXCJyb2xlXCI6IFwiT1dORVJcIn1dfSJ9.aBXgXJArYSv8XF84RgKKK03XgXVFptnwMX-wzBiNflJM3L7evyAQTH5Vq5L89ofW--oJUAK4MdxTKUBXH8hh9oRaggCqmphToNY8qy_7ELI_7uvoBvLi98HIRL5V20Twvup5NmrazL80z0HgpfeBl7dCoBdSAz91_-6YRmaBhZqleYIkGGs4sQYhu1O16illta4BeLTdDcyMb1ty7OJ-dlvI0R2-iFe0f5kJ2bhDaUcnSHBRVdOrYUJIsdbm1SBkPvBWhOzkB4zMkPMYtUvpKio2lClmC6ID1RZehJ6cp7F-XaBTMnSgUxku8xYHFiHwu16wfs-z6t8oF30uFAm6yQ',
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
