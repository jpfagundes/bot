require("dotenv").config();   // carrega as variáveis do arquivo .env
const { chromium } = require("playwright");

async function coletarRecompensa() {
  console.log("🔹 Iniciando bot de recompensas...");

  // const browser = await chromium.launch({ headless: false, slowMo: 500 }); // Abre o navegador e roda  com um delay de 500ms
  // const page = await browser.newPage(); // Abre uma nova aba

  // Headless = true → não abre janela, ideal para Actions
  const browser = await chromium.launch({ headless: true, slowMo: 500 });
  const page = await browser.newPage();

  try {
    console.log("🔹 Acessando o site...");
    await page.goto('https://777g.dev/#/home');

  // 👉 Login
    console.log("🔹 Iniciando login...");
    // await page.locator('.van-popup > div > div > div:nth-child(2) > img').click();
    await page.locator('.app-name-leftbg > img').click();
    await page.locator('.loginreg-frame-bg').click();
    await page.getByText('Entrar').nth(4).click();

    console.log("🔹 Preenchendo usuário e senha...");
    await page.getByRole('textbox', { name: 'Conta / Número de telefone' }).fill(process.env.USER);
    await page.getByRole('textbox', { name: 'por favor, insira a senha' }).fill(process.env.PASS);
    await page.getByText('Entrar').nth(3).click();
    console.log("✅ Login realizado com sucesso!");

    await page.locator('.fpwa-close-icon').click();
    await page.locator('.ltop-frame-back > .sdcommon-btn-frame').click();

  // 👉 Clicar no botão de recompensa
    console.log("🔹 Coletando recompensa...");
    await page.locator('.act-icon').first().click();
    await page.locator('.receive-btn').click();
    await page.locator('.receive-btn').click();
    console.log("✅ Recompensa coletada com sucesso!");

    console.log("🔹 Realizando logout...");
  // 👉 Logout
    await page.locator('.app-name-leftbg > img').click();
    await page.locator('div:nth-child(3) > .fun-normal > .cicon-normal-bg').click();
    await page.locator('div:nth-child(10) > .sdcommon-btn-frame').click();
    await page.locator('span').filter({ hasText: 'Sair' }).click();
    console.log("✅ Logout realizado!");

  } catch (err) {
    console.error("❌ Ocorreu um erro durante a execução do bot:", err);
  } finally {
    await browser.close();
    console.log("🔹 Bot finalizado.");
  }
}

// Executa o bot
coletarRecompensa();
