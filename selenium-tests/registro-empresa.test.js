/**
 * TEST: Registro de Empresa
 * -----------------------------------------------------------------
 * Verifica el flujo completo de registro de una nueva empresa:
 *   1. Navegación a /auth/registro
 *   2. Validaciones de formulario vacío
 *   3. Relleno de NIT, nombre y correo de contacto
 *   4. Submit y espera de credenciales del admin
 *   5. Visibilidad del botón "Ir al login" tras el registro
 *
 * NOTA: Usa un NIT + correo únicos con timestamp para evitar
 * colisiones con registros previos en la base de datos.
 * -----------------------------------------------------------------
 */

const { By, until } = require('selenium-webdriver');
const {
  FRONTEND_URL,
  buildDriver,
  makeLogger,
  writeReport,
} = require('./helpers');

const TEST_RESULTS = [];
const log = makeLogger(TEST_RESULTS);

async function runRegistroEmpresaTest() {
  log('ℹ️', '══════════════════════════════════════════');
  log('ℹ️', '  TEST: Registro de Empresa');
  log('ℹ️', '══════════════════════════════════════════');
  log('ℹ️', `Frontend: ${FRONTEND_URL}`);

  // Datos únicos: NIT en formato de 9 números, un guion y un número de 1 a 9 (ej. 933111222-3) para evitar colisiones
  const ts = Date.now();
  const tsStr = String(ts).slice(-9).padStart(9, '0');
  const nitUnico = `${tsStr}-3`;
  const nombreEmpresa  = `Empresa Selenium ${ts}`;
  const correoContacto = `selenium.${ts}@test-empresa.com`;

  log('ℹ️', `NIT generado: ${nitUnico}`);
  log('ℹ️', `Nombre: ${nombreEmpresa}`);
  log('ℹ️', `Correo: ${correoContacto}`);

  const driver = await buildDriver();

  try {
    // ── 1. Navegar a la página de registro ─────────────────────────
    log('ℹ️', 'Paso 1: Navegando a /auth/registro');
    await driver.get(`${FRONTEND_URL}/auth/registro`);

    const h1 = await driver.wait(until.elementLocated(By.css('h1')), 10000);
    const titulo = await h1.getText();
    if (!titulo.includes('Registrar Empresa')) {
      throw new Error(`Título inesperado: "${titulo}"`);
    }
    log('✅', `Página cargada correctamente: "${titulo}"`);

    // ── 2. Intentar submit vacío → validaciones ─────────────────────
    log('ℹ️', 'Paso 2: Verificando validaciones con formulario vacío');
    const submitBtn = await driver.findElement(By.css('button[type="submit"]'));
    await submitBtn.click();

    // Esperar que aparezcan mensajes de error requeridos
    const errores = await driver.wait(
      until.elementsLocated(By.css('small.error-text')),
      5000
    );
    if (errores.length < 1) throw new Error('No aparecieron errores de validación');
    log('✅', `Validaciones activas: ${errores.length} mensaje(s) de error visibles`);

    // ── 3. Rellenar formulario ──────────────────────────────────────
    log('ℹ️', 'Paso 3: Rellenando el formulario de registro');
    const nitInput     = await driver.findElement(By.id('nit'));
    const nombreInput  = await driver.findElement(By.id('nombre'));
    const correoInput  = await driver.findElement(By.id('correoContacto'));

    await nitInput.clear();
    await nitInput.sendKeys(nitUnico);

    await nombreInput.clear();
    await nombreInput.sendKeys(nombreEmpresa);

    await correoInput.clear();
    await correoInput.sendKeys(correoContacto);

    log('✅', 'Formulario rellenado');

    // ── 4. Submit ───────────────────────────────────────────────────
    log('ℹ️', 'Paso 4: Enviando formulario');
    await submitBtn.click();

    // Esperar que aparezca el bloque de credenciales
    log('ℹ️', 'Esperando bloque de credenciales (puede tardar hasta 35s)...');

    let credencialesBox;
    let errorVisible = '';

    try {
      await driver.wait(async () => {
        // Esperar credenciales O mensaje de error
        const boxes = await driver.findElements(By.css('.credenciales-box'));
        if (boxes.length > 0) { credencialesBox = boxes[0]; return true; }
        const errs = await driver.findElements(By.css('.alert.alert-error, .alert-error'));
        if (errs.length > 0) { errorVisible = await errs[0].getText(); return true; }
        return false;
      }, 35000, 'Timeout: no apareció el bloque de credenciales tras el registro');
    } catch (waitErr) {
      const errs = await driver.findElements(By.css('.alert-error'));
      if (errs.length > 0) errorVisible = await errs[0].getText();
      throw new Error(`Timeout esperando respuesta. Error visible: "${errorVisible || 'ninguno'}"`);
    }

    if (errorVisible) {
      throw new Error(`El backend rechazó el registro: "${errorVisible}"`);
    }
    log('✅', 'Bloque de credenciales visible');

    // ── 5. Verificar email y contraseña visibles ────────────────────
    log('ℹ️', 'Paso 5: Verificando contenido de credenciales');
    const emailMostrado = await driver.findElement(By.css('.credencial-row code')).getText();
    if (!emailMostrado) throw new Error('El email de credenciales está vacío');
    log('✅', `Email de admin mostrado: ${emailMostrado}`);

    const pwdDisplay = await driver.findElement(By.id('pwd-display')).getText();
    if (!pwdDisplay || pwdDisplay.length < 4) throw new Error('Contraseña no visible o muy corta');
    log('✅', `Contraseña visible (${pwdDisplay.length} chars)`);

    // ── 6. Botón "Ir al login" presente ────────────────────────────
    const irLoginLink = await driver.findElement(By.linkText('Ir al login'));
    const href = await irLoginLink.getAttribute('href');
    if (!href.includes('/auth/login')) throw new Error(`Href inesperado: ${href}`);
    log('✅', 'Enlace "Ir al login" presente y apunta a /auth/login');

    log('✅', '══ PRUEBA COMPLETADA: Registro de Empresa EXITOSO ══');

  } catch (error) {
    log('❌', `Error: ${error.message}`);
    try {
      const logs = await driver.manage().logs().get('browser');
      log('ℹ️', '--- BROWSER CONSOLE LOGS ---');
      for (const entry of logs) {
        log('ℹ️', `[${entry.level.name}] ${entry.message}`);
      }
      log('ℹ️', '----------------------------');
    } catch (logErr) {
      log('⚠️', `No se pudieron obtener logs del navegador: ${logErr.message}`);
    }
    log('❌', '══ PRUEBA FALLIDA: Registro de Empresa ══');
    process.exitCode = 1;
  } finally {
    log('ℹ️', 'Cerrando navegador');
    await driver.quit();
    writeReport('report-registro-empresa.txt', TEST_RESULTS);
    log('ℹ️', 'Reporte guardado: selenium-tests/report-registro-empresa.txt');
  }
}

runRegistroEmpresaTest();
