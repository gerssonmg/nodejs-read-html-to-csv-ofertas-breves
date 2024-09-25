const axios = require('axios');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

const rota_id = 3025831;

let config = {
  method: 'get',
  maxBodyLength: Infinity,
  url: `https://leve.loggi.com/api/v1/last_mile/loggi_sp_sao_paulo:4598/offers/${3020255}?distribution_center_id=4598&last_mile_company_id=loggi_sp_sao_paulo&routing_code=MCA`,
  headers: {
    accept: 'application/json, text/plain, */*',
    'accept-language': 'pt,en-US;q=0.9,en;q=0.8',
    appversion: 'prod-20240923.01',
    authorization:
      'Bearer eyJraWQiOiJpOFo2dlpqQlZRT3FkRjFqMEY4TzhWcWl3eEpnXC9jRWR1SjMzd25WMW80UT0iLCJhbGciOiJSUzI1NiJ9.eyJhdF9oYXNoIjoibkphUnJpTHFaQUczajRfY2gzU3lRQSIsInN1YiI6Ijg3YTc1MmRkLWQ0NWItNDBiZi04ODE4LTVkZDAyOWJhNzhkNCIsImNvZ25pdG86Z3JvdXBzIjpbIkFMTF9MT0dHSV9EQ1NfR1JPVVAiLCJBQlJBX0FOQUxZU1QiLCJzdXBwb3J0IiwiQUJSQV9SRUFEX0FMTCIsInVzLWVhc3QtMV9wR0piTHpMRG9fR29vZ2xlIiwiQkFTRV9BTkFMWVNUIl0sImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAudXMtZWFzdC0xLmFtYXpvbmF3cy5jb21cL3VzLWVhc3QtMV9wR0piTHpMRG8iLCJjb2duaXRvOnVzZXJuYW1lIjoiR29vZ2xlXzEwMzc2MTE0NTY4OTA3MDQzNjk0MyIsIm5vbmNlIjoiQ1NGYU5DbUIyd1A2c3RMWGNCcV9YT3E1N2ZycE9tLVk5LU9GNjE5aFlIV3VvT2JVbkVuTlNQX1JZR0drc2FQQ0h3blc4Uzg3WmhrdVhlY3NZTzNoYm9rNl9pcUl0YmFXWFh0aTFEZVJ6UzQtZnA2TGQ3OW1qYmNyU1hUSFlHQ1JZTlpNVkdfS2syRFBDWUlsaXNTeEYtS2RkSFNyRE81SVVKSnVBVHV3V3ZrIiwiY3VzdG9tOmFjY2VzcyI6IntcImxvZ2dpX3VzZXJfaWRcIjogMTg0NDQ5NSwgXCJsYXN0TWlsZVwiOiBbe1wiaWRcIjogXCJsZXZlLXNwLW1vb2NhLXRlc3RlLWFnZW5kYWRvXzExNDY4OjUwMDlcIiwgXCJyb2xlXCI6IFwiT1dORVJcIn1dLCBcImNvbXBhbmllc1wiOiBbe1wiaWRcIjogMzg5MjIyLCBcInJvbGVcIjogXCJPV05FUlwifV19IiwiYXVkIjoiNnVqdThtcGZvYXRwZjI5YWhsYzMyZ3QwN2EiLCJpZGVudGl0aWVzIjpbeyJ1c2VySWQiOiIxMDM3NjExNDU2ODkwNzA0MzY5NDMiLCJwcm92aWRlck5hbWUiOiJHb29nbGUiLCJwcm92aWRlclR5cGUiOiJHb29nbGUiLCJpc3N1ZXIiOm51bGwsInByaW1hcnkiOiJ0cnVlIiwiZGF0ZUNyZWF0ZWQiOiIxNTk5ODU2OTQxODcxIn1dLCJ0b2tlbl91c2UiOiJpZCIsImF1dGhfdGltZSI6MTcyNzI2ODM3MCwibmFtZSI6IkdlcnNvbiBDcmlzb3N0b21vIEFndWlhciBGaWxobyIsImV4cCI6MTcyNzI3MTk3MCwiaWF0IjoxNzI3MjY4MzcxLCJlbWFpbCI6ImdlcnNvbi5maWxob0Bsb2dnaS5jb20iLCJjdXN0b206YWNjZXNzTG9nZ2lFbnZpb3MiOiJ7XCJsb2dnaV91c2VyX2lkXCI6IDE4NDQ0OTUsIFwibGFzdE1pbGVcIjogW3tcImlkXCI6IFwibGV2ZS1zcC1tb29jYS10ZXN0ZS1hZ2VuZGFkb18xMTQ2ODo1MDA5XCIsIFwicm9sZVwiOiBcIk9XTkVSXCJ9XSwgXCJjb21wYW5pZXNcIjogW3tcImlkXCI6IDM4OTIyMiwgXCJyb2xlXCI6IFwiT1dORVJcIn1dfSJ9.hDernPIp6bBeWFGLQ4FnGA7Zo1qF9CdwNTLr-ruPwTA1Ljl__MRzbDMw2evry8ZighVmZ1rn9GT3j6q7DjaFSPU5qLW95VQwJK3wqo-mkPZHA6jCuYq6LClZJNhhSDdrQjrlGdSDNzS8Ab3MFZB-om_gTwF3abQWch4bdJaDTpDtiamhqtPkSwA-cJGhRakbG3cegHqC5fYz5mX0eu-MbrOO8zc81w8ylLODW56S-iO9GqVimV6olU6XK5nL0B4b4JWLGywsl-mI6au0jr8qKfBEP7qzkk0BiIbGmpyM9wNCjhs0X29w3anZuZGKXKiur8WW3xiFEODaC8TGilb4nA',
    origin: 'https://arco.loggi.com',
    priority: 'u=1, i',
    referer: 'https://arco.loggi.com/',
    'sec-ch-ua':
      '"Google Chrome";v="129", "Not=A?Brand";v="8", "Chromium";v="129"',
    'sec-ch-ua-mobile': '?0',
    'sec-ch-ua-platform': '"Linux"',
    'sec-fetch-dest': 'empty',
    'sec-fetch-mode': 'cors',
    'sec-fetch-site': 'same-site',
    service: 'arco',
    'user-agent':
      'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36',
  },
};

axios
  .request(config)
  .then((response) => {
    const schedules = response.data.volumes;

    // Configuração do CSV Writer
    const csvWriter = createCsvWriter({
      path: 'schedules.csv',
      header: [
        { id: 'rota_id', title: 'rota_id' },
        { id: 'barcode', title: 'barcode' },
        { id: 'companyName', title: 'companyName' },
        { id: 'cep', title: 'cep' },
        { id: 'cidade', title: 'cidade' },
        { id: 'bairro', title: 'bairro' },
        { id: 'logradouro', title: 'logradouro' },
        { id: 'numero', title: 'numero' },
        { id: 'complemento', title: 'complemento' },
        { id: 'telefone', title: 'telefone' },
        { id: 'telefone_Nome', title: 'telefone_Nome' },
        { id: 'deadlineDeliveryTime', title: 'deadlineDeliveryTime' },
      ],
    });

    // Preparar os dados para o CSV
    const records = schedules.map((schedule) => {
      // const pickupOffer = schedule.pickupOfferList[0] || {}; // Assume que há sempre pelo menos uma oferta
      return {
        rota_id: rota_id,
        barcode: schedule.barcode,
        companyName: schedule.companyName,

        cep: schedule.address.coordinatesPostalCode,

        cidade: schedule.address.correiosAddress.cidade,
        bairro: schedule.address.correiosAddress.bairro,
        logradouro: schedule.address.correiosAddress.logradouro,
        numero: schedule.address.correiosAddress.numero,
        complemento: schedule.address.correiosAddress.complemento,
        telefone: schedule.contact.phone,
        telefone_Nome: schedule.contact.name,
        deadlineDeliveryTime: schedule.deadlineDeliveryTime,
      };
    });

    // Escrever os registros no arquivo CSV
    csvWriter.writeRecords(records).then(() => {
      console.log('Arquivo CSV foi salvo com sucesso!');
    });
  })
  .catch((error) => {
    console.log(error);
  });
