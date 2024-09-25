const cheerio = require('cheerio');
const fs = require('fs');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

// Carregue o conteúdo HTML a partir de um arquivo (ou pode ser uma string diretamente)
const html = fs.readFileSync('index_v2.html', 'utf8');

// Carregar o HTML com Cheerio
const $ = cheerio.load(html);

const id_rota = 3025789;

// CSV Writer configuração
const csvWriter = createCsvWriter({
  path: `${3025789}-output.csv`,
  header: [
    { id: 'volume', title: 'Volume' },
    { id: 'company', title: 'Company' },
    { id: 'id', title: 'ID' },
    { id: 'endereco', title: 'endereco' },
    // { id: 'bairro', title: 'bairro' },
    // { id: 'cidade', title: 'cidade' },
    { id: 'cep', title: 'cep' },
    { id: 'address', title: 'Address' },
    { id: 'person_name', title: 'person_name' },
    { id: 'person_number', title: 'person_number' },
    { id: 'person', title: 'Person' },
  ],
});

// volume,
// company,
// id: str,
// endereco,
// bairro,
// cidade,
// cep,
// address,
// person,

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
      id: str,
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
