/**
 * RUNNER: Suite completa de tests Selenium
 * -----------------------------------------------------------------
 * Ejecuta todos los tests de forma secuencial y genera un reporte
 * consolidado con el resumen de resultados.
 *
 * Uso:
 *   node selenium-tests/run-all.js
 *
 * Para correr un test individual:
 *   node selenium-tests/login.test.js
 *   node selenium-tests/dashboard.test.js
 *   node selenium-tests/registro-empresa.test.js
 *   node selenium-tests/proceso.test.js
 *   node selenium-tests/usuario.test.js
 * -----------------------------------------------------------------
 */

const { spawnSync } = require('child_process');
const fs   = require('fs');
const path = require('path');

const TESTS_DIR = __dirname;

const SUITE = [
  { name: 'Login',            file: 'login.test.js' },
  { name: 'Dashboard',        file: 'dashboard.test.js' },
  { name: 'Crear Proceso',    file: 'proceso.test.js' },
  { name: 'Crear Usuario',    file: 'usuario.test.js' },
];

// Pausa síncrona entre tests (evita saturación del pool de conexiones DB)
function sleep(ms) {
  Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, ms);
}

const SEPARATOR  = '═'.repeat(56);
const startTime  = new Date();

console.log('\n' + SEPARATOR);
console.log('  🚀  SUITE SELENIUM — EDITOR DE PROCESOS BPMN');
console.log(SEPARATOR);
console.log(`  Inicio: ${startTime.toLocaleString()}`);
console.log(`  Tests a ejecutar: ${SUITE.length}`);
console.log(SEPARATOR + '\n');

const summary = [];
let passed = 0;
let failed = 0;

for (let i = 0; i < SUITE.length; i++) {
  const test     = SUITE[i];
  const filePath = path.join(TESTS_DIR, test.file);

  if (!fs.existsSync(filePath)) {
    console.log(`⚠️  [SKIP] ${test.name} — archivo no encontrado: ${test.file}\n`);
    summary.push({ name: test.name, status: 'SKIP', duration: 0 });
    continue;
  }

  console.log(`\n▶ Ejecutando: ${test.name} (${test.file})`);
  console.log('─'.repeat(56));

  const t0     = Date.now();
  const result = spawnSync('node', [filePath], {
    stdio: 'inherit',
    shell: true,
    cwd: path.dirname(TESTS_DIR),
  });
  const duration = ((Date.now() - t0) / 1000).toFixed(1);

  const status = result.status === 0 ? 'PASS' : 'FAIL';
  if (status === 'PASS') { passed++; } else { failed++; }

  const icon = status === 'PASS' ? '✅' : '❌';
  console.log(`\n${icon} ${test.name}: ${status} (${duration}s)`);
  summary.push({ name: test.name, status, duration: parseFloat(duration) });

  // Pausa entre tests para liberar conexiones del pool DB (HikariCP max 5)
  if (i < SUITE.length - 1) {
    const PAUSE_MS = 3000;
    process.stdout.write(`\n⏳ Pausa de ${PAUSE_MS / 1000}s para liberar conexiones DB...\n`);
    sleep(PAUSE_MS);
  }
}

// ── Reporte consolidado ──────────────────────────────────────────
const endTime     = new Date();
const totalSeconds = ((endTime - startTime) / 1000).toFixed(1);

console.log('\n' + SEPARATOR);
console.log('  📊  RESUMEN FINAL');
console.log(SEPARATOR);

const lines = [
  `Suite de Tests Selenium — ${endTime.toLocaleString()}`,
  SEPARATOR,
  'RESULTADOS:',
];

for (const r of summary) {
  const icon = r.status === 'PASS' ? '✅' : r.status === 'SKIP' ? '⚠️ ' : '❌';
  const line = `  ${icon} ${r.name.padEnd(25)} ${r.status.padEnd(6)} ${r.duration}s`;
  console.log(line);
  lines.push(line);
}

const summaryLine = `\nTotal: ${SUITE.length} tests | ✅ Pasaron: ${passed} | ❌ Fallaron: ${failed} | Tiempo: ${totalSeconds}s`;
console.log(summaryLine);
lines.push(SEPARATOR);
lines.push(summaryLine);

console.log(SEPARATOR + '\n');

// Guardar reporte consolidado
const reportPath = path.join(TESTS_DIR, 'report-suite.txt');
fs.writeFileSync(reportPath, lines.join('\n'), 'utf8');
console.log(`📄 Reporte consolidado guardado en: selenium-tests/report-suite.txt\n`);

// Exit code según resultado
process.exit(failed > 0 ? 1 : 0);
