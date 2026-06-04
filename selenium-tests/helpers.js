const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const chromedriver = require('chromedriver');
const fs = require('fs');
const path = require('path');

const FRONTEND_URL = 'http://localhost:4200';
const BACKEND_URL  = 'http://localhost:8080';
const DEFAULT_EMAIL    = process.env.TEST_EMAIL    || 'admin@techcorp.com';
const DEFAULT_PASSWORD = process.env.TEST_PASSWORD || '900111222-3';

/** Crea un driver de Chrome headless-optional */
function buildDriver() {
  const service = new chrome.ServiceBuilder(chromedriver.path);
  const options = new chrome.Options();
  // Descomenta la siguiente línea para correr en modo headless (sin ventana):
  // options.addArguments('--headless=new');
  options.addArguments('--no-sandbox', '--disable-dev-shm-usage');
  return new Builder()
    .forBrowser('chrome')
    .setChromeService(service)
    .setChromeOptions(options)
    .build();
}

/** Logger que guarda resultados en un array */
function makeLogger(results = []) {
  return function log(status, message) {
    const ts = new Date().toISOString();
    const entry = `[${ts}] ${status}: ${message}`;
    console.log(entry);
    results.push(entry);
    return entry;
  };
}

/** Escribe el reporte en archivo */
function writeReport(filename, results) {
  const reportDir = path.join(__dirname);
  fs.writeFileSync(path.join(reportDir, filename), results.join('\n'), 'utf8');
}

/**
 * Realiza el flujo completo de login con las credenciales indicadas.
 * Espera hasta que la URL contenga '/dashboard'.
 */
async function loginAs(driver, log, email = DEFAULT_EMAIL, password = DEFAULT_PASSWORD) {
  log('ℹ️', `Navegando a login: ${FRONTEND_URL}/auth/login`);
  await driver.get(`${FRONTEND_URL}/auth/login`);

  const emailInput    = await driver.wait(until.elementLocated(By.id('email')), 10000);
  const passwordInput = await driver.findElement(By.id('password'));
  const submitButton  = await driver.findElement(By.css('button[type="submit"]'));

  await emailInput.sendKeys(email);
  await passwordInput.sendKeys(password);
  await submitButton.click();

  await driver.wait(until.urlContains('/dashboard'), 15000);
  log('✅', `Sesión iniciada como: ${email}`);
}

/**
 * Espera que aparezca un elemento y lo retorna.
 * Lanza error claro si no aparece en el timeout.
 */
async function waitFor(driver, locator, timeoutMs = 10000, label = '') {
  return driver.wait(until.elementLocated(locator), timeoutMs,
    `Timeout esperando elemento${label ? ': ' + label : ''}`);
}

/**
 * Espera que el texto del elemento cambie / aparezca en la página.
 */
async function waitForText(driver, locator, text, timeoutMs = 10000) {
  const el = await waitFor(driver, locator, timeoutMs);
  await driver.wait(until.elementTextContains(el, text), timeoutMs);
  return el;
}

module.exports = {
  FRONTEND_URL,
  BACKEND_URL,
  DEFAULT_EMAIL,
  DEFAULT_PASSWORD,
  buildDriver,
  makeLogger,
  writeReport,
  loginAs,
  waitFor,
  waitForText,
};
