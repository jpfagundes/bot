require("dotenv").config();   // <-- carrega as variáveis do arquivo .env
const { chromium } = require("playwright");

async function coletarRecompensa() {
  const browser = await chromium.launch({ headless: false, slowMo: 500 }); // Abre o navegador e roda  com um delay de 500ms
  const page = await browser.newPage(); // Abre uma nova aba

  // 👉 Acesse o site da plataforma
  await page.goto('https://777g.dev/#/home');
  
  // 👉 Login
  await page.locator('.van-popup > div > div > div:nth-child(2) > img').click();
  await page.locator('.app-name-leftbg > img').click();
  await page.locator('.loginreg-frame-bg').click();
  await page.getByText('Entrar').nth(4).click();
  await page.getByRole('textbox', { name: 'Conta / Número de telefone' }).click();
  await page.getByRole('textbox', { name: 'Conta / Número de telefone' }).fill(process.env.USER);
  await page.getByRole('textbox', { name: 'por favor, insira a senha' }).click();
  await page.getByRole('textbox', { name: 'por favor, insira a senha' }).fill(process.env.PASS);
  await page.getByText('Entrar').nth(3).click();
  await page.locator('.fpwa-close-icon').click();
  await page.locator('.ltop-frame-back > .sdcommon-btn-frame').click();
  
  
  // Espera carregar a página principal
  // await page.waitForTimeout(5000);
  
  // 👉 Clicar no botão de recompensa
  await page.locator('.act-icon').first().click();
  await page.locator('.receive-btn').click();
  await page.locator('.receive-btn').click();
  // try {
  //   await page.click("#botao-recompensa");
  //   console.log("✅ Recompensa coletada com sucesso!");
  // } catch (err) {
  //   console.log("⚠️ Não foi possível encontrar o botão de recompensa.");
  // }

  // 👉 Logout
  await page.locator('.app-name-leftbg > img').click();
  await page.locator('div:nth-child(3) > .fun-normal > .cicon-normal-bg').click();
  await page.locator('div:nth-child(10) > .sdcommon-btn-frame').click();
  await page.locator('span').filter({ hasText: 'Sair' }).click();

  await browser.close();
}

// Executa o bot
coletarRecompensa();
