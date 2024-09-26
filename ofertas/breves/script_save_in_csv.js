/**
 * ➜ pnpm -v
 * 9.5.0
 *
 * ➜ node -v
 * v20.15.1
 *
 * ➜ npm -v
 * 10.7.0
 *
 */

// Como executar:
/**
 * pnpm i
 *
 * No arquivo de script_save_in_csv.js TROQUE o
 * valor da variável id_rota para o id da rota que deseja extrair os dados.
 *
 * Salve o arquivo de HTML que pegou do Arco, com o nome index_.....html
 * No final do arquivo, coloque o mesmo ID da rota que colocou
 * em id_rota, porque vai ser usado pelo script, para buscar o arquivo.
 *
 * Confirme que esta na versão de 20 do nove
 * > node -v
 *
 * Pelo terminal, entre na pasta que tem o arquivo script_save_in_csv.js
 * Execute:
 * > node script_save_in_csv.js
 *
 * O arquivo gerado, vai ser salvado na mesma pasta que o script está.
 *
 */

const cheerio = require('cheerio');
const fs = require('fs');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

const id_rota = 3030744;
// Carregue o conteúdo HTML a partir de um arquivo (ou pode ser uma string diretamente)
const html = fs.readFileSync(`index_${id_rota}.html`, 'utf8');

// Carregar o HTML com Cheerio
const $ = cheerio.load(html);

// CSV Writer configuração
const csvWriter = createCsvWriter({
  path: `${id_rota}-output.csv`,
  header: [
    { id: 'volume', title: 'Volume' },
    { id: 'company', title: 'Company' },
    { id: 'barcode', title: 'ID' },
    { id: 'endereco', title: 'endereco' },
    { id: 'cep', title: 'cep' },
    { id: 'address', title: 'Address' },
    { id: 'person_name', title: 'person_name' },
    { id: 'person_number', title: 'person_number' },
    { id: 'person', title: 'Person' },
  ],
});

// Função para extrair dados
const extractData = () => {
  const data = [];

  $('div[data-testid="offer-drawer-volumes"]').each((_, element) => {
    const volume = $(element)
      .find('div[class^="MuiBox-root"]')
      .first()
      .text()
      .trim();
    const company = $(element).find('span[class^="MuiBox-root"]').text().trim();
    const id = $(element).find('p.MuiTypography-root').eq(1).text().trim();
    const address = $(element).find('p.MuiTypography-root').eq(2).text().trim();
    const person = $(element).find('p.MuiTypography-root').eq(3).text().trim();

    let str_person = person.split('•').map((part) => part.trim()); // Remove espaços em branco

    let str_address = address;
    let parts = str_address.split('•').map((part) => part.trim()); // Remove espaços em branco

    let endereco = parts[0] || null; // Endereço
    let cep = parts[parts.length - 1] || null;

    // Removendo # do inicio
    let str = id;
    str = str.replace(/^#\s/, '');

    data.push({
      volume,
      company,
      barcode: str,
      endereco,
      //   bairro,
      //   cidade,
      cep,
      address,
      person_name: str_person[0] ? str_person[0] : '',
      person_number: str_person[1] ? str_person[1] : '',
      str_person,
      person,
    });
  });

  return data;
};

// Extraindo os dados
const data = extractData();

// Escrevendo no CSV
csvWriter
  .writeRecords(data)
  .then(() => console.log('Arquivo CSV criado com sucesso!'));
