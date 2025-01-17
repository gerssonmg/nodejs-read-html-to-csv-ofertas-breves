const headers = require('./config');
const axios = require('axios');

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const base_real = {};
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const base_OCA = {};

const lmc_identification = 'leve-ms-campo-grande-cel-antonino_bf40';
// const lmc_identification = 'leve-sp-mooca-teste-agendado_11468';

const dc_id = '900';
// const dc_id = '5009';

const routing_code = 'CG5';
// const routing_code = 'OCA';

const lmc_dc = `${lmc_identification}:${dc_id}`;

const dns_path = 'https://leve.loggi.com';

const url_circle_list = `${dns_path}/api/v1/${lmc_dc}/circle/list?distribution_center_id=${dc_id}&last_mile_company_id=${lmc_identification}&routing_code=${routing_code}&FKP=Arco_gerson_nodejs`;

const url_circle_update = `${dns_path}/api/v1/${lmc_dc}/circle/update/unit-load?FKP=Arco_gerson_nodejs`;

async function requestGetCircleByBase(write = false) {
  // Pegando circulos da Base
  console.log(url_circle_list);
  const { circles } = await axios
    .get(url_circle_list + '_' + write, { headers })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error('Erro na requisição:', error.message);
    });

  await metricsByCircles(circles);

  // const circlesFirst = circles.slice(0, 1);
  // console.log('circlesFirst:', circlesFirst);
  // const circle_updated = await requestCircles(circlesFirst, write);
  // console.log('circle_updated:', circle_updated);
}

async function metricsByCircles(circles) {
  // console.log('Circles:', circles);
  const data = circles.map((circle) => {
    console.log(`Circle: ${circle.name} - ULs: ${circle.unitLoads.length}`);
    return {
      id: circle.id,
      name: circle.name,
      ulCount: circle.unitLoads.length,
      citiesCount: circle.cities.length,
      driversCount: circle.drivers.length,
      keywords: circle.keywords.length,
      operators: circle.operators.length,
    };
  });

  console.log(data.sort((a, b) => b.ulCount - a.ulCount));
}

async function requestCircles(circles, write) {
  circle_updated = [];

  console.log('Function requestCircles');
  for (const circle of circles) {
    // Fazendo request Leve -> LW,
    // para saber se tem pacote no LPN

    // Se não tiver, fazendo request PUT para remover UL do circle
    for (const lpn of circle.unitLoads) {
      console.log(`\n REQUEST circle:${circle.name} UL:${lpn}`);

      const url = `${dns_path}/proxy/last-mile/v1/leve/unit_load/${lpn}/packages/detail/?distribution_center_id=900&last_mile_company_id=leve-ms-campo-grande-cel-antonino_bf40&routing_code=CG5&FKP=Arco_gerson_nodejs`;

      await axios
        .get(url + '_' + write, { headers })
        .then(async (response) => {
          if (response?.data?.packageDetails) {
            circle_updated.push(lpn);
            console.log('TEM PACOTE');
          } else {
            console.log('NÃO TEM PACOTE');
            // Fazendo request PUT removendo UL do circle
            console.log(
              `Request PUT. Removendo UL:${lpn} do circle:${circle.name} circle.id:${circle.id}`
            );

            if (write)
              await axios
                .put(
                  url_circle_update + '_' + write,
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
                .then((response) => {
                  console.log('REMOVIDO COM SUCESSO');
                })
                .catch((error) => {
                  console.error('Erro na requisição:', error.message);
                });
            else {
              console.log('Não foi feito o request PUT');
            }
          }
        })
        .catch((error) => {
          console.error('Erro na requisição:', error.message);
        });
    }
  }

  return circle_updated;
}

requestGetCircleByBase(false);
