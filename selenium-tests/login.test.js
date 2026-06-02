const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const chromedriver = require('chromedriver');
const fs = require('fs');

const chromeService = new chrome.ServiceBuilder(chromedriver.path);

const EMAIL = process.env.TEST_EMAIL || 'admin@techcorp.com';
const PASSWORD = process.env.TEST_PASSWORD || '900111222-3';
const TEST_RESULTS = [];

function logResult(status, message) {
  const timestamp = new Date().toISOString();
  const entry = `[${timestamp}] ${status}: ${message}`;
  console.log(entry);
  TEST_RESULTS.push(entry);
}

async function runLoginTest() {
  logResult('ℹ️', 'Selenium test iniciando');
  logResult('ℹ️', `Backend en: http://localhost:4020`);
  logResult('ℹ️', `Frontend en: http://localhost:4200`);
  logResult('ℹ️', `Credenciales: ${EMAIL} / ${PASSWORD}`);
  
  const driver = await new Builder().forBrowser('chrome').setChromeService(chromeService).build();

  try {
    logResult('ℹ️', 'Abriendo página de login');
    await driver.get('http://localhost:4200/auth/login');
    
    logResult('✅', 'Página de login cargada');

    logResult('ℹ️', 'Buscando campos de formulario');
    const emailInput = await driver.wait(until.elementLocated(By.id('email')), 10000);
    const passwordInput = await driver.findElement(By.id('password'));
    const submitButton = await driver.findElement(By.css('button[type="submit"]'));
    
    logResult('✅', 'Campos encontrados: email, password, submit button');

    logResult('ℹ️', `Ingresando credenciales: ${EMAIL}`);
    await emailInput.sendKeys(EMAIL);
    await passwordInput.sendKeys(PASSWORD);
    
    logResult('✅', 'Credenciales ingresadas');

    logResult('ℹ️', 'Haciendo submit del formulario');
    await submitButton.click();
    
    logResult('✅', 'Formulario enviado');

    logResult('ℹ️', 'Esperando redirección al dashboard...');
    await driver.wait(until.urlContains('/dashboard'), 15000);
    
    const finalUrl = await driver.getCurrentUrl();
    logResult('✅', `Redirección exitosa a: ${finalUrl}`);
    
    logResult('✅', 'PRUEBA COMPLETADA: Login exitoso');
  } catch (error) {
    logResult('❌', `Error: ${error.message}`);
    logResult('❌', 'PRUEBA FALLIDA');
    process.exitCode = 1;
  } finally {
    logResult('ℹ️', 'Cerrando navegador');
    await driver.quit();
    
    // Guardar reporte
    const report = TEST_RESULTS.join('\n');
    fs.writeFileSync('selenium-tests/test-report.txt', report);
    logResult('ℹ️', 'Reporte guardado en selenium-tests/test-report.txt');
  }
}

runLoginTest();
