import axios from 'axios';
import headers from './config';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const base_real = {};
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const base_OCA = {};

// const lmc_identification = 'leve-ms-campo-grande-cel-antonino_bf40';
const lmc_identification = 'leve-sp-mooca-teste-agendado_11468';

// const dc_id = '900';
const dc_id = '5009';

// const routing_code = 'CG5';
const routing_code = 'OCA';

const lmc_dc = `${lmc_identification}:${dc_id}`;

const dns_path = 'https://leve.loggi.com';

const url_circle_list = `${dns_path}/api/v1/${lmc_dc}/circle/list?distribution_center_id=${dc_id}&last_mile_company_id=${lmc_identification}&routing_code=${routing_code}`;

const url_circle_update = `${dns_path}/api/v1/${lmc_dc}/circle/update/unit-load`;

async function requestLPN() {
  // Pegando circulos da Base
  console.log(url_circle_list);
  const { circles } = await axios
    .get(url_circle_list, { headers })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error('Erro na requisição:', error.message);
    });

  for (const circle of circles) {
    // Fazendo request Leve -> LW,
    // para saber se tem pacote no LPN

    // Se não tiver, fazendo request PUT para remover UL do circle
    for (const lpn of circle.unitLoads) {
      console.log(`REQUEST circle:${circle.name} UL:${lpn}`);

      const url = `${dns_path}/proxy/last-mile/v1/leve/unit_load/${lpn}/packages/detail/?distribution_center_id=900&last_mile_company_id=leve-ms-campo-grande-cel-antonino_bf40&routing_code=CG5`;

      await axios
        .get(url, { headers })
        .then(async (response) => {
          if (response?.data?.packageDetails) {
            console.log('TEM PACOTE');
          } else {
            console.log('NÃO TEM PACOTE');
            // Fazendo request PUT removendo UL do circle
            console.log(
              `Request PUT. Removendo UL:${lpn} do circle:${circle.name} circle.id:${circle.id}`
            );

            await axios
              .put(
                url_circle_update,
                {
                  circleId: circle.id,
                  unitLoad: lpn,
                  removeUl: true,
                  distribution_center_id: dc_id,
                  last_mile_company_id: lmc_identification,
                  routing_code: routing_code,
                },
                { headers }
              )
              .then(() => {
                console.log('REMOVIDO COM SUCESSO');
              })
              .catch((error) => {
                console.error('Erro na requisição:', error.message);
              });
          }
        })
        .catch((error) => {
          console.error('Erro na requisição:', error.message);
        });
    }
  }
}

requestLPN();
