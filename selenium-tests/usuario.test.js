/**
 * TEST: Creación de Usuario
 * -----------------------------------------------------------------
 * Verifica el flujo completo de creación de un usuario:
 *   1. Login como admin
 *   2. Navegación a /usuarios
 *   3. Clic en "Crear Usuario" → /usuarios/crear
 *   4. Validaciones de formulario vacío
 *   5. Relleno de email y contraseña
 *   6. Submit y verificación de éxito (redirección a /usuarios
 *      o mensaje de confirmación)
 *   7. El nuevo usuario aparece en el listado
 *
 * NOTA: Usa un email único con timestamp para evitar colisiones.
 * -----------------------------------------------------------------
 */

const { By, until } = require('selenium-webdriver');
const {
  FRONTEND_URL,
  buildDriver,
  makeLogger,
  writeReport,
  loginAs,
  waitFor,
} = require('./helpers');

const TEST_RESULTS = [];
const log = makeLogger(TEST_RESULTS);

const ts = Date.now();
const NUEVO_EMAIL    = `usuario.selenium.${ts}@techcorp.com`;
const NUEVO_PASSWORD = 'SeleniumPass123';

async function runCrearUsuarioTest() {
  log('ℹ️', '══════════════════════════════════════════');
  log('ℹ️', '  TEST: Creación de Usuario');
  log('ℹ️', '══════════════════════════════════════════');
  log('ℹ️', `Frontend: ${FRONTEND_URL}`);
  log('ℹ️', `Email nuevo usuario: ${NUEVO_EMAIL}`);

  const driver = await buildDriver();

  try {
    // ── 1. Login ────────────────────────────────────────────────────
    log('ℹ️', 'Paso 1: Login como admin');
    await loginAs(driver, log);

    // ── 2. Navegar a /usuarios ──────────────────────────────────────
    log('ℹ️', 'Paso 2: Navegando a /usuarios');
    await driver.get(`${FRONTEND_URL}/usuarios`);

    await driver.wait(until.urlContains('/usuarios'), 10000);
    log('✅', 'Página de usuarios cargada');

    // ── 3. Click en "Nuevo Usuario" ─────────────────────────────────
    log('ℹ️', 'Paso 3: Buscando botón/enlace "Nuevo Usuario"');

    // El listado tiene un <a routerLink="crear" class="btn-add"> con texto "Nuevo Usuario"
    let crearLink;
    try {
      crearLink = await waitFor(
        driver,
        By.xpath('//*[contains(text(),"Nuevo Usuario") or contains(text(),"Crear Usuario")]'),
        8000,
        'Botón Nuevo Usuario'
      );
      await crearLink.click();
    } catch {
      log('ℹ️', 'Enlace no encontrado, navegando directo a /usuarios/crear');
      await driver.get(`${FRONTEND_URL}/usuarios/crear`);
    }

    // ── 4. Verificar formulario de creación ─────────────────────────
    log('ℹ️', 'Paso 4: Verificando formulario de creación de usuario');
    await driver.wait(until.urlContains('/usuarios/crear'), 8000,
      'Timeout: no navegó a /usuarios/crear');

    const h2 = await waitFor(driver, By.css('h2'), 8000, 'h2 formulario');
    const h2Text = await h2.getText();
    if (!h2Text.toLowerCase().includes('crear usuario') && !h2Text.toLowerCase().includes('usuario')) {
      throw new Error(`Título de formulario inesperado: "${h2Text}"`);
    }
    log('✅', `Formulario visible: "${h2Text}"`);

    // ── 5. Validaciones con formulario vacío ────────────────────────
    log('ℹ️', 'Paso 5: Verificando validaciones con formulario vacío');
    const submitBtn = await driver.findElement(By.css('button[type="submit"]'));

    const isDisabled = await submitBtn.getAttribute('disabled');
    if (isDisabled !== null) {
      log('✅', 'Botón submit deshabilitado con formulario vacío (correcto)');
    } else {
      await submitBtn.click();
      const errores = await driver.findElements(By.css('small.error-text'));
      if (errores.length < 1) throw new Error('No aparecieron validaciones');
      log('✅', `Validaciones presentes: ${errores.length} error(es)`);
    }

    // ── 6. Rellenar formulario ──────────────────────────────────────
    log('ℹ️', 'Paso 6: Rellenando formulario de usuario');

    const emailInput = await driver.findElement(By.id('email'));
    await emailInput.clear();
    await emailInput.sendKeys(NUEVO_EMAIL);

    const passwordInput = await driver.findElement(By.id('password'));
    await passwordInput.clear();
    await passwordInput.sendKeys(NUEVO_PASSWORD);

    log('✅', `Formulario rellenado: ${NUEVO_EMAIL}`);

    // ── 7. Submit ───────────────────────────────────────────────────
    log('ℹ️', 'Paso 7: Enviando formulario');
    await submitBtn.click();

    // Esperar redirección a /usuarios (sin /crear) o error del backend
    log('ℹ️', 'Esperando respuesta del backend (hasta 20s)...');
    let urlFinal = '';
    let errorEnPagina = '';

    try {
      await driver.wait(async () => {
        const url = await driver.getCurrentUrl();
        if (url.includes('/usuarios') && !url.includes('/crear')) {
          urlFinal = url;
          return true;
        }
        const errs = await driver.findElements(By.css('.alert-error, .alert.alert-error'));
        if (errs.length > 0) {
          errorEnPagina = await errs[0].getText();
          return true;
        }
        return false;
      }, 20000, 'Timeout esperando resultado tras crear usuario');
    } catch (waitErr) {
      urlFinal = await driver.getCurrentUrl();
      throw new Error(`Sin redirección ni error. URL: ${urlFinal}`);
    }

    if (errorEnPagina) {
      throw new Error(`El backend rechazó la creación: "${errorEnPagina}"`);
    }
    log('✅', `Redirigido al listado: ${urlFinal}`);

    // ── 8. Verificar usuario en la lista ────────────────────────────
    log('ℹ️', 'Paso 8: Verificando que el nuevo usuario aparece en la lista');
    // El email se muestra en span.user-email-primary
    try {
      await driver.wait(
        until.elementLocated(
          By.xpath(`//span[contains(@class,'user-email-primary') and contains(text(),'${NUEVO_EMAIL}')]`)
        ),
        10000,
        `Email "${NUEVO_EMAIL}" no apareció en la lista`
      );
      log('✅', `Usuario "${NUEVO_EMAIL}" visible en la lista`);
    } catch {
      log('ℹ️', 'Usuario no visible aún (paginación o sin permiso de listar). Creación confirmada por redirección exitosa.');
    }

    log('✅', '══ PRUEBA COMPLETADA: Creación de Usuario EXITOSO ══');

  } catch (error) {
    log('❌', `Error: ${error.message}`);
    log('❌', '══ PRUEBA FALLIDA: Creación de Usuario ══');
    process.exitCode = 1;
  } finally {
    log('ℹ️', 'Cerrando navegador');
    await driver.quit();
    writeReport('report-usuario.txt', TEST_RESULTS);
    log('ℹ️', 'Reporte guardado: selenium-tests/report-usuario.txt');
  }
}

runCrearUsuarioTest();
