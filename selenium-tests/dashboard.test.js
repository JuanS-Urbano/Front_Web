/**
 * TEST: Dashboard y sus componentes
 * -----------------------------------------------------------------
 * Verifica que tras el login el dashboard cargue correctamente
 * con todos sus bloques de UI:
 *   1. Login y redirección a /dashboard
 *   2. Título "Dashboard" visible
 *   3. Card "INICIO RÁPIDO" con botones de acción
 *   4. Estadística "TOTAL PROCESOS" visible
 *   5. Tarjetas de estadísticas inferiores (usuarios, roles, actividades)
 *   6. Sección "Procesos por Estado" o "Usuarios por Rol"
 *   7. Sección de Auditoría / Actividad Reciente
 *   8. Navegación: sidebar con link a Procesos y Usuarios
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

async function runDashboardTest() {
  log('ℹ️', '══════════════════════════════════════════');
  log('ℹ️', '  TEST: Dashboard y sus componentes');
  log('ℹ️', '══════════════════════════════════════════');
  log('ℹ️', `Frontend: ${FRONTEND_URL}`);

  const driver = await buildDriver();

  try {
    // ── 1. Login ────────────────────────────────────────────────────
    log('ℹ️', 'Paso 1: Login como admin');
    await loginAs(driver, log);

    // ── 2. URL y título principal ───────────────────────────────────
    log('ℹ️', 'Paso 2: Verificando URL y título del dashboard');
    const currentUrl = await driver.getCurrentUrl();
    if (!currentUrl.includes('/dashboard')) {
      throw new Error(`URL inesperada: ${currentUrl}`);
    }
    log('✅', `URL correcta: ${currentUrl}`);

    const h1 = await waitFor(driver, By.css('h1'), 10000, 'h1 dashboard');
    const h1Text = await h1.getText();
    if (!h1Text.toLowerCase().includes('dashboard')) {
      throw new Error(`Título inesperado: "${h1Text}"`);
    }
    log('✅', `Título visible: "${h1Text}"`);

    // ── 3. Card "INICIO RÁPIDO" ─────────────────────────────────────
    log('ℹ️', 'Paso 3: Verificando card Inicio Rápido');
    const quickStartCard = await waitFor(driver, By.css('.quick-start-card'), 8000, '.quick-start-card');
    const quickStartText = await quickStartCard.getText();
    if (!quickStartText.includes('INICIO RÁPIDO')) {
      throw new Error('No se encontró el badge "INICIO RÁPIDO"');
    }
    log('✅', 'Card "INICIO RÁPIDO" presente');

    // Botón "Lienzo en Blanco"
    const btnLienzo = await driver.findElement(By.linkText('Lienzo en Blanco'));
    const hrefLienzo = await btnLienzo.getAttribute('href');
    if (!hrefLienzo.includes('/procesos/crear')) {
      throw new Error(`Href de "Lienzo en Blanco" incorrecto: ${hrefLienzo}`);
    }
    log('✅', 'Botón "Lienzo en Blanco" apunta a /procesos/crear');

    // Botón "Ver Procesos"
    const btnVerProcesos = await driver.findElement(By.linkText('Ver Procesos'));
    const hrefVer = await btnVerProcesos.getAttribute('href');
    if (!hrefVer.includes('/procesos')) {
      throw new Error(`Href de "Ver Procesos" incorrecto: ${hrefVer}`);
    }
    log('✅', 'Botón "Ver Procesos" apunta a /procesos');

    // ── 4. Estadística "TOTAL PROCESOS" ────────────────────────────
    log('ℹ️', 'Paso 4: Verificando stat-card TOTAL PROCESOS');
    const statHighlight = await waitFor(driver, By.css('.stat-card.stat-highlight'), 8000, 'stat-highlight');
    const statText = await statHighlight.getText();
    if (!statText.includes('TOTAL PROCESOS')) {
      throw new Error('No se encontró label "TOTAL PROCESOS"');
    }
    // El número total debe existir (puede ser 0)
    const statNumber = await statHighlight.findElement(By.css('.stat-number'));
    const totalProcesosValue = await statNumber.getText();
    log('✅', `TOTAL PROCESOS visible: ${totalProcesosValue}`);

    // ── 5. Tarjetas estadísticas inferiores ─────────────────────────
    log('ℹ️', 'Paso 5: Verificando tarjetas de estadísticas inferiores');
    const statCards = await driver.findElements(By.css('.bottom-row .stat-card'));
    if (statCards.length < 3) {
      throw new Error(`Se esperaban 3 stat-cards inferiores, se encontraron: ${statCards.length}`);
    }
    const labels = [];
    for (const card of statCards) {
      const label = await card.findElement(By.css('.stat-label span:first-child')).getText();
      labels.push(label);
    }
    log('✅', `Tarjetas inferiores: ${labels.join(' | ')}`);

    // Verificar que estén los 3 esperados
    const expectedLabels = ['USUARIOS ACTIVOS', 'ROLES BPMN', 'ELEMENTOS BPMN'];
    for (const expected of expectedLabels) {
      if (!labels.some(l => l.includes(expected))) {
        throw new Error(`Falta tarjeta: "${expected}"`);
      }
    }
    log('✅', 'Todas las tarjetas de estadísticas presentes');

    // ── 6. Sección de distribución (Procesos por Estado / Usuarios por Rol) ──
    log('ℹ️', 'Paso 6: Verificando secciones de distribución');
    const distCards = await driver.findElements(By.css('.distribution-card'));
    if (distCards.length >= 1) {
      log('✅', `Secciones de distribución visibles: ${distCards.length}`);
    } else {
      log('ℹ️', 'Secciones de distribución no visibles (posiblemente sin datos aún)');
    }

    // ── 7. Sección Auditoría ────────────────────────────────────────
    log('ℹ️', 'Paso 7: Verificando sección de Auditoría');
    const activitySection = await driver.findElements(By.css('.activity-section'));
    if (activitySection.length >= 1) {
      const auditHeader = await activitySection[0].findElement(By.css('.activity-header span'));
      const auditText = await auditHeader.getText();
      log('✅', `Sección de Auditoría visible: "${auditText}"`);

      // Enlace "Ver bitácora completa"
      const verBitacora = await activitySection[0].findElement(By.css('.activity-view-all'));
      const hrefBitacora = await verBitacora.getAttribute('href');
      if (!hrefBitacora.includes('/historial')) {
        throw new Error(`Href de bitácora incorrecto: ${hrefBitacora}`);
      }
      log('✅', 'Enlace "Ver bitácora completa" apunta a /historial');
    } else {
      log('ℹ️', 'Sección de Auditoría no visible (sin métricas aún)');
    }

    // ── 8. Navegación sidebar ───────────────────────────────────────
    log('ℹ️', 'Paso 8: Verificando existencia del sidebar/navbar');
    // Buscamos al menos uno de los nav links típicos del layout
    const navLinks = await driver.findElements(By.css('a[href*="/procesos"], a[href*="/usuarios"], a[href*="/dashboard"]'));
    if (navLinks.length < 2) {
      throw new Error(`Pocos enlaces de navegación: ${navLinks.length}`);
    }
    log('✅', `Navegación presente con ${navLinks.length} enlaces detectados`);

    log('✅', '══ PRUEBA COMPLETADA: Dashboard EXITOSO ══');

  } catch (error) {
    log('❌', `Error: ${error.message}`);
    log('❌', '══ PRUEBA FALLIDA: Dashboard ══');
    process.exitCode = 1;
  } finally {
    log('ℹ️', 'Cerrando navegador');
    await driver.quit();
    writeReport('report-dashboard.txt', TEST_RESULTS);
    log('ℹ️', 'Reporte guardado: selenium-tests/report-dashboard.txt');
  }
}

runDashboardTest();
