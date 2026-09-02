/**
 * Script para gerar PDF do currículo usando Puppeteer
 */

const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

async function generatePDF() {
  // Ler o arquivo HTML
  const htmlPath = path.join(__dirname, '..', 'src', 'index.html');
  const htmlContent = fs.readFileSync(htmlPath, 'utf8');

  // Criar o navegador
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
  });

  const page = await browser.newPage();

  // Carregar o HTML
  await page.setContent(htmlContent, { waitUntil: 'networkidle0' });

  // Aguardar os ícones serem carregados
  await page.waitForSelector('.resume-container');

  // Gerar o PDF
  await page.pdf({
    path: path.join(__dirname, '..', 'dist', 'curriculo-marcelino-thigana.pdf'),
    format: 'A4',
    printBackground: true,
    margin: {
      top: '0',
      right: '0',
      bottom: '0',
      left: '0'
    }
  });

  await browser.close();

  console.log('PDF gerado com sucesso!');
}

generatePDF().catch(err => {
  console.error('Erro ao gerar PDF:', err);
  process.exit(1);
});