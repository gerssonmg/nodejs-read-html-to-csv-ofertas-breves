const headers = require('../config');
const axios = require('axios');

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const base_real = {};
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const base_OCA = {};

const lmc_identification = 'loggi_sp_sao_paulo';
// const lmc_identification = 'leve-sp-mooca-teste-agendado_11468';

const dc_id = '4598';
// const dc_id = '5009';

const routing_code = 'MCA';
// const routing_code = 'OCA';

const lmc_dc = `${lmc_identification}:${dc_id}`;

const dns_path = 'https://leve.loggi.com';

// const url_oferts_list = `${dns_path}/api/v1/last_mile/${lmc_dc}/offers/list&FKP=Arco_gerson_nodejs`;
const url_oferts_list = `https://leve.loggi.com/api/v1/last_mile/loggi_sp_sao_paulo:4598/offers/list
`;

const write = false;

console.log(url_oferts_list);
console.log(headers);

axios
  .post(url_oferts_list, { headers })
  .then((response) => {
    console.log(response.data);
    return response.data;
  })
  .catch((error) => {
    console.error('Erro na requisição:', error.message);
  });
