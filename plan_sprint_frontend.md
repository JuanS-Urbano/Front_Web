# 🚀 Plan de Sprints: Entrega 2 – Frontend (Editor de Procesos)

Como Scrum Master, presento la hoja de ruta para la **Fase 2: Frontend Funcional**. El objetivo es construir una interfaz web que consuma al 100% la API REST ya operativa, cubriendo todos los criterios de la rúbrica de calificación para maximizar la nota.

---

## ✅ Arquitectura Base (Completada por el Arquitecto de Software)

> [!IMPORTANT]
> La siguiente infraestructura **ya está creada** y lista para que los Devs la utilicen.
> Los archivos contienen stubs (código base + TODOs) que cada Dev debe completar.

### Lo que ya existe:
| Categoría | Cantidad | Ubicación |
|:----------|:--------:|:----------|
| **Interfaces TypeScript** (DTOs) | 17 archivos, 19 interfaces | `src/app/models/` |
| **Servicios HTTP** | 13 archivos (12 + barrel) | `src/app/services/` |
| **SessionService** (BehaviorSubject) | 1 | `src/app/core/services/` |
| **AuthInterceptor** (X-User-Email) | 1 | `src/app/core/interceptors/` |
| **Guards** (Auth + Role) | 2 | `src/app/core/guards/` |
| **Shared Components** | 7 componentes (21 archivos) | `src/app/shared/components/` |
| **Feature Components** | 27 componentes (91 archivos) | `src/app/features/` |
| **Routes** (lazy loading) | 10 archivos de rutas | Dentro de cada feature |
| **Environments** (dev + prod) | 2 | `src/app/environments/` |
| **Proxy config** | 1 | `proxy.conf.json` |
| **Total archivos** | **154** | `src/app/` |

### Patrón arquitectónico implementado:
- **Componentes**: `standalone: true`, HTML + TypeScript + CSS separados, `OnInit` para carga de datos
- **Modelos**: Interfaces TypeScript que mapean exactamente los DTOs del backend
- **Servicios**: `@Injectable({ providedIn: 'root' })`, retornan `Observable`, encapsulan `HttpClient`
- **Comunicación**: `@Input/@Output` (padre-hijo), `BehaviorSubject` en `SessionService` (estado global)
- **Flujo**: Servicio → Observable → Componente se suscribe → Refresca la interfaz

### Lo que SSR se removió:
- `main.server.ts`, `server.ts`, `app.config.server.ts`, `app.routes.server.ts` — eliminados para SPA pura

---

## 📋 Rúbrica de Calificación y Estrategia de Cobertura

Cada criterio de la rúbrica está mapeado a los Devs y Sprints responsables de cumplirlo:

| Criterio | Peso | Responsables Principales | Sprint |
|:---------|:----:|:------------------------|:------:|
| **Componentes** reutilizables y bien estructurados | 20% | Dev 1, Dev 2, Dev 3 | 1, 2 |
| **Servicios** (consumo REST, HTTP, respuestas) | 20% | Dev 4 | 1 |
| **Modelos** (interfaces/tipos para DTOs) | 10% | Dev 4 | 1 |
| **Manejo de información entre componentes** (Input/Output, estado compartido) | 10% | Todos | 2, 3 |
| **Funcionalidad** (visor y editor de procesos operativo) | 15% | Dev 1, Dev 2, Dev 3 | 2, 3 |
| **Librerías externas** (uso justificado) | 5% | Dev 5 | 2 |
| **Despliegue** (compila, ejecuta, se integra con backend) | 10% | Dev 6 | 3 |
| **Ingeniería de Software** (organización, SonarQube, Git) | 10% | Dev 7 | 3 |

---

## 📌 Reglas del Proyecto Frontend

1. **Framework:** Angular 21 (standalone components, sin NgModules).
2. **Comunicación con Backend:** Toda petición HTTP debe pasar por un **Service** dedicado (nunca `fetch` directo en un componente). Los servicios ya están creados en `services/`.
3. **Modelos/Interfaces:** Cada DTO del backend tiene su equivalente como `interface` TypeScript en `models/`. Usar el barrel export: `import { Proceso, Actividad } from '../models';`
4. **Componentes:** Cada componente usa `standalone: true`. Inicialización de datos en `ngOnInit()`. Los stubs ya están creados con TODOs.
5. **Comunicación entre componentes:** Usar `@Input()/@Output()` para padre-hijo, y `SessionService` (BehaviorSubject) para estado global (sesión, empresa activa).
6. **Observables:** Los servicios retornan `Observable`. El componente se suscribe en `ngOnInit()` para cargar datos y refrescar la interfaz.
7. **Git:** Cada Dev trabaja en su propia feature branch (`feature/dev-X-descripcion`). Se hace Pull Request para merge a `develop`.

---

## 🏃 Sprint 1: Completar Servicios, Autenticación y UI Base (Semana 1)

**Objetivo:** Los stubs ya están creados. Cada Dev debe **completar la implementación** de sus componentes/servicios, verificar contra el backend real, e implementar el flujo de login y registro.

| Dev | Módulo / HU | Tareas a Entregar | 🤝 Interacción |
|:----|:------------|:-------------------|:---------------|
| **Dev 1** | **Autenticación UI** (HU-01, HU-03) | • Completar `LoginComponent` → formulario reactivo (email + password). • Completar `RegistroEmpresaComponent` → formulario (nombre, NIT, correo). • Implementar validaciones visuales (required, email format). • Manejar errores del backend (credenciales inválidas, empresa duplicada). • Usar `AuthService.login()` y suscribirse al `Observable` para guardar sesión en `SessionService`. | Con **Dev 4** para validar endpoints de auth. |
| **Dev 2** | **Layout y Navegación** | • Completar `AppLayoutComponent` (el stub ya tiene estructura Header + Sidebar + Vista Central + Footer). • Completar `NavbarComponent` → mostrar nombre de usuario y empresa activa (suscribiéndose a `SessionService.session$`). • Completar `SidebarComponent` → menú con links a cada sección. • Completar `DashboardComponent` → vista de bienvenida con resumen. | Con **Dev 1** para redirigir tras login exitoso. |
| **Dev 3** | **Gestión de Usuarios UI** (HU-02) | • Completar `UsuariosListComponent` → tabla de usuarios (suscribirse a `UsuarioService.getUsuarios()` en `ngOnInit`). • Completar `UsuarioFormComponent` → crear/editar usuario (modal o página). • Implementar badges de rol (Admin, Editor, Lector) con colores. • Integrar `ConfirmDialogComponent` para confirmar eliminaciones. | Con **Dev 4** para consumir `UsuarioService`. |
| **Dev 4** | **Completar Servicios y Modelos** | • Verificar que TODAS las interfaces en `models/` coinciden exactamente con los DTOs del backend (los campos marcados con TODO). • Completar los métodos stub de TODOS los servicios → verificar URLs y parámetros contra los controllers reales del backend. • Completar `SessionService` → agregar persistencia en `localStorage`. • Verificar que `AuthInterceptor` adjunta el header correcto. | Con **todos** los Devs; esta es la capa que alimenta toda la UI. |
| **Dev 5** | **Completar Componentes Compartidos** | • Completar los estilos CSS de los 7 shared components (están en blanco). • Agregar animaciones básicas al `LoadingSpinnerComponent` y `ToastNotificationComponent`. • Investigar y seleccionar librería UI (Angular Material o PrimeNG) → documentar justificación en README. **NO integrar aún**, solo selección. • Completar `SearchBarComponent` con debounce para optimizar búsquedas. | Con **Dev 2** para integrar en el layout. |
| **Dev 6** | **Docker y Entorno** | • Crear `Dockerfile` para el frontend (multi-stage: build Angular + serve con Nginx). • Crear `nginx.conf` para SPA (redirigir todo a index.html). • Crear `docker-compose.yml` que levante frontend + backend juntos. • Verificar que `proxy.conf.json` (ya creado) resuelve correctamente las peticiones al backend local. • Documentar los comandos de arranque en README. | Con **Dev 4** para validar integración con backend. |
| **Dev 7** | **Calidad y Testing** | • Configurar ESLint + Prettier para el proyecto. • Crear tests unitarios para los servicios (mock de `HttpClient`): `AuthService`, `ProcesoService`, `UsuarioService` mínimo. • Configurar SonarQube Scanner para el frontend. • Documentar README.md con instrucciones de instalación, ejecución y estructura de carpetas. | Con **Dev 4** para testear los servicios. |

### ⚠️ Checkpoint Sprint 1
- **Criterio clave cubierto:** Modelos (10%) + Servicios (20%) + parte de Componentes (20%).
- **Prueba de humo:** ✅ Un usuario puede registrar una empresa, hacer login, y ver el Dashboard. (COMPLETADO)

---

## 🏃 Sprint 2: Visor y Editor de Procesos — El Core (Semana 2) - EN PROGRESO

**Objetivo:** Construir toda la funcionalidad CRUD de procesos y el editor visual de diagramas BPMN (actividades, gateways, arcos, lanes). Este es el Sprint más pesado y donde se gana la nota en "Funcionalidad" (15%) y "Componentes" (20%).

| Dev | Módulo / HU | Tareas a Entregar | 🤝 Interacción |
|:----|:------------|:-------------------|:---------------|
| **Dev 1** | **CRUD de Procesos UI** (HU-04 a HU-07) | • Completar `ProcesosListComponent` con tabla/cards mostrando procesos del pool. • Integrar `SearchBarComponent` y filtros (por estado y categoría). • Completar `ProcesoFormComponent` (crear/editar con nombre, descripción, categoría, estado). • Implementar eliminación lógica con `ConfirmDialogComponent`. • Completar `ProcesoDetailComponent` como vista padre que comparte datos a hijos via `@Input`. | Con **Dev 2** para que el detalle del proceso sea la puerta de entrada al editor visual. |
| **Dev 2** | **Editor Visual / Canvas BPMN** (HU-08 a HU-16) | • Completar `EditorCanvasComponent`: el lienzo principal donde se renderizan nodos y conexiones. • Integrar librería de diagramado (ej: **jointjs**, **bpmn-js** o **reactflow**) — justificar elección. • Renderizar Actividades como rectángulos posicionables (drag & drop). • Renderizar Gateways como rombos con icono según tipo (Exclusivo, Paralelo, Inclusivo). • Renderizar Arcos como flechas SVG entre nodos. • Emitir eventos al hacer clic en un nodo/arco para abrir paneles de edición. | Con **Dev 3** para la barra de herramientas y paneles de propiedades. Con **Dev 5** para Lanes. |
| **Dev 3** | **Paneles de Propiedades y Toolbar** (HU-08 a HU-16) | • Completar `ToolbarComponent` con botones: Agregar Actividad, Agregar Gateway, Agregar Arco, Deshacer, Guardar. • Completar `PropiedadesActividadComponent` (panel lateral para editar actividad seleccionada). • Completar `PropiedadesGatewayComponent` (editar nombre, tipo gateway). • Completar `PropiedadesArcoComponent` (editar origen, destino, etiqueta). • Cada panel debe emitir `@Output()` con los cambios para que el canvas actualice. | Con **Dev 2** para la comunicación bidireccional canvas ↔ paneles. |
| **Dev 4** | **Gestión de Roles de Proceso** (HU-17 a HU-20) | • Completar `RolesListComponent` con tabla de roles de la empresa. • Completar `RolFormComponent` (crear/editar nombre y descripción). • Implementar eliminación con validación previa (no eliminar si está en uso). • Completar `RolesSelectComponent` reutilizable (dropdown para asignar rol a un lane). | Con **Dev 5** para vincular roles a lanes. |
| **Dev 5** | **Lanes / Swimlanes** (HU-22) | • Completar `LanesManagerComponent`: panel para gestionar los lanes de un proceso. • Completar `LaneFormComponent` (crear/editar lane: nombre, orden, rol asociado). • Renderizar lanes como franjas horizontales en el canvas del editor. • Permitir asignar una actividad a un lane específico (drag into lane o dropdown). • Implementar eliminación de lane (con validación si tiene actividades). | Con **Dev 2** para el renderizado visual dentro del canvas. Con **Dev 4** para el selector de rol. |
| **Dev 6** | **Historial de Cambios y Pools** (HU-05, HU-21) | • Completar `HistorialComponent` → timeline de cambios del proceso. • Completar `PoolConfigComponent` → visualizar/editar configuración del pool. • Crear toggle para marcar proceso como compartido (HU-23). | Con **Dev 1** para integrar historial dentro del detalle del proceso. |
| **Dev 7** | **Tests de Componentes Sprint 2** | • Escribir tests unitarios para: `ProcesosListComponent`, `ProcesoFormComponent`, `EditorCanvasComponent`. • Validar comunicación `@Input/@Output` entre `EditorCanvasComponent` ↔ `PropiedadesActividadComponent`. • Verificar que todos los servicios consumen correctamente los endpoints reales del backend. | Con **Dev 2** y **Dev 3** para los tests del editor. |

### ⚠️ Checkpoint Sprint 2
- **Criterio clave cubierto:** Componentes (20%) + Funcionalidad (15%) + Librerías Externas (5%) + Manejo de Info entre Componentes (10%).
- **Prueba de humo:** Un usuario con login debe poder crear un proceso, abrir el editor visual, agregar actividades y gateways con drag & drop, conectarlos con arcos, asignarles un lane, y guardar. Al recargar la página, el diagrama debe cargarse intacto desde el backend.

---

## 🏃 Sprint 3: Integración Final, Pulido y Despliegue (Semana 3)

**Objetivo:** Completar funcionalidades secundarias (mensajería, notificaciones, permisos visuales), pulir la UX, asegurar el despliegue integrado y pasar SonarQube.

| Dev | Módulo / HU | Tareas a Entregar | 🤝 Interacción |
|:----|:------------|:-------------------|:---------------|
| **Dev 1** | **Mensajería UI** (HU-25, HU-27, HU-28) | • Completar `MensajesListComponent` para ver mensajes enviados/recibidos por proceso. • Completar `ThrowMessageFormComponent` (formulario para lanzar un mensaje). • Completar `CatchMessageConfigComponent` (configurar qué mensajes espera un proceso). • Mostrar estado de correlación (éxito / pendiente / sin receptor). | Con **Dev 2** para integrar iconos de mensaje en el canvas. |
| **Dev 2** | **Pulido del Editor Visual** | • Agregar zoom in/out y pan al canvas. • Implementar mini-mapa de navegación del diagrama. • Mejorar el estilo visual de nodos (sombras, colores por tipo, iconos BPMN). • Agregar tooltips informativos al pasar sobre nodos. • Asegurar responsividad del canvas. | Con **Dev 5** para el refinamiento visual. |
| **Dev 3** | **Permisos Visuales y Guards** (HU-24) | • Verificar que `AuthGuard` y `RoleGuard` (ya creados) funcionan correctamente. • Ocultar/deshabilitar botones de edición/eliminación si el usuario es LECTOR. • Mostrar badge de rol en el header. • Manejar errores 403 del backend mostrando mensaje "Sin permisos". | Con **Dev 1** para validar la sesión almacenada. |
| **Dev 4** | **Notificaciones UI** (HU-26) | • Completar `NotificacionesComponent` para enviar notificaciones de prueba. • Completar `ToastNotificationComponent` global → integrar en operaciones CRUD (feedback visual). • Crear un servicio de toast global para emitir notificaciones desde cualquier componente. | Con todos; el toast se usará en toda la app. |
| **Dev 5** | **Diseño Final y Responsive** | • Aplicar estilos CSS consistentes y profesionales a toda la aplicación. • Asegurar responsividad completa (desktop, tablet). • Completar estilos de `NotFoundComponent` (404). • Agregar animaciones de transición entre rutas. • Verificar accesibilidad básica (contraste, ARIA labels). | Con todos los componentes creados. |
| **Dev 6** | **Despliegue e Integración** | • Verificar que `ng build` compila sin errores ni warnings (ya compila ✅). • Configurar Docker para servir el build de producción con Nginx. • Validar integración completa frontend ↔ backend (flujo end-to-end). • Documentar proceso de despliegue en README. • Crear script de arranque rápido (`docker-compose up`). | Con **Dev 7** para el checklist final. |
| **Dev 7** | **QA Final, SonarQube y Git** | • Ejecutar análisis SonarQube sobre el frontend y corregir issues. • Asegurar cobertura de tests ≥ 80% en servicios y componentes críticos. • Revisar que todos los PRs tengan descripción clara. • Validar estructura de carpetas y naming conventions. • Generar reporte final de calidad. • Etiquetar release (`v2.0.0-frontend`). | Con todos los Devs para revisiones finales. |

### ⚠️ Checkpoint Sprint 3 — Demo Final
- **Criterio clave cubierto:** Despliegue (10%) + Ingeniería de Software (10%) + cierre de Funcionalidad.
- **Prueba de humo final:** Demostración completa del flujo:
  1. Registrar empresa → Login → Ver Dashboard
  2. Crear proceso → Abrir editor → Agregar actividades, gateways y arcos visualmente
  3. Asignar lanes y roles → Guardar proceso
  4. Ver historial de cambios → Enviar mensaje entre procesos
  5. Usuario LECTOR no puede editar (permisos visuales)
  6. Todo funcionando desde Docker (`docker-compose up`)

---

## 🎯 Criterios de Éxito para la Entrega 2

| # | Criterio | Meta | Estado |
|:-:|:---------|:-----|:------:|
| 1 | **Compilación** | `ng build` pasa sin errores | ✅ Ya compila |
| 2 | **Componentes** | Mínimo 20 componentes reutilizables documentados | ✅ 34 creados |
| 3 | **Servicios** | 12 servicios Angular consumiendo correctamente los 11 controllers | ✅ Autenticación y Usuarios conectados |
| 4 | **Modelos** | 19 interfaces TypeScript mapeando todos los DTOs | ✅ Creados |
| 5 | **Comunicación** | `@Input/@Output` + servicios compartidos con `BehaviorSubject` | ✅ Patrón establecido |
| 6 | **Funcionalidad** | CRUD completo de procesos + editor visual de diagramas operativo | ⏳ Sprint 2 (Core) |
| 7 | **Librerías** | Mínimo 2 librerías externas justificadas (UI framework + diagramado) | ⏳ Sprint 2 |
| 8 | **Despliegue** | Frontend + Backend corriendo juntos en Docker | ✅ Adelantado |
| 9 | **SonarQube** | Quality Gate PASSED, cobertura ≥ 80%, 0 bugs, duplicación ≤ 3% | ⏳ Sprint 3 |
| 10 | **Git** | Branches por feature, PRs con descripción, tags de release | ⏳ Continuo |

---

## 📁 Estructura de Carpetas del Proyecto

```
src/app/
├── core/                           # Singleton: guards, interceptors, session
│   ├── guards/                     # auth.guard.ts, role.guard.ts
│   ├── interceptors/               # auth.interceptor.ts
│   └── services/                   # session.service.ts (BehaviorSubject)
├── models/                         # 17 archivos de interfaces TypeScript
├── services/                       # 12 servicios HTTP + barrel export
├── shared/components/              # 7 componentes reutilizables
├── features/                       # Módulos de negocio (lazy loaded)
│   ├── auth/                       # Login, Registro
│   ├── layout/                     # AppLayout, Navbar, Sidebar
│   ├── dashboard/                  # Vista principal
│   ├── usuarios/                   # CRUD usuarios
│   ├── procesos/                   # CRUD procesos
│   ├── editor/                     # Canvas BPMN, Toolbar, Propiedades
│   ├── roles/                      # Gestión de roles
│   ├── lanes/                      # Gestión de lanes
│   ├── historial/                  # Historial de cambios
│   └── mensajeria/                 # Mensajes + Notificaciones
├── environments/                   # dev + prod
├── app.ts                          # Componente raíz
├── app.routes.ts                   # Rutas principales con lazy loading
└── app.config.ts                   # Providers (HttpClient + Interceptor)
```

---

## 🔍 AUDITORÍA DEL PROYECTO — Revisión del Scrum Master (30/Abril/2026)

> **IMPORTANTE:** Esta sección documenta el estado real del proyecto tras la revisión archivo por archivo.
> Se clasifican los hallazgos en: estado de implementación, errores detectados, problemas de comunicación con el backend, y trabajo pendiente priorizado.

---

### 📊 1. Estado Real de Implementación por Componente

#### ✅ Componentes COMPLETAMENTE Implementados (Lógica + Vista + CSS + Conexión al Backend)

| Componente | Ruta | Observaciones |
|:-----------|:-----|:-------------|
| `LoginComponent` | `/auth/login` | Formulario reactivo, valida con backend, guarda sesión en `SessionService` |
| `RegistroEmpresaComponent` | `/auth/registro` | Formulario reactivo, muestra credenciales del admin generado, timeout de 15s |
| `NavbarComponent` | (layout) | Se suscribe a `session$`, muestra email/empresa/rol, botón logout funcional |
| `SidebarComponent` | (layout) | Se suscribe a `session$` para leer rol, links con `routerLinkActive` |
| `AppLayoutComponent` | (layout) | Estructura Header + Sidebar + RouterOutlet, toggle sidebar funcional |
| `DashboardComponent` | `/dashboard` | Se suscribe a `session$`, muestra datos del usuario (contadores estáticos en 0) |
| `ProcesosListComponent` | `/procesos` | Carga procesos desde API, búsqueda con filtro, eliminación con confirmación |
| `ProcesoFormComponent` | `/procesos/crear` y `/procesos/editar/:id` | Modo crear/editar con formulario reactivo, patchValue para edición |
| `ProcesoDetailComponent` | `/procesos/:id` | Orquestador del editor con sistema de 3 tabs (Editor, Historial, Pool) |
| `EditorCanvasComponent` | (dentro de ProcesoDetail) | Canvas SVG + CDK DragDrop, renderiza actividades/gateways/arcos/lanes |
| `ToolbarComponent` | (dentro de ProcesoDetail) | Botones con `@Output()` para agregar elementos y guardar |
| `PropiedadesActividadComponent` | (sidebar editor) | Formulario reactivo con `@Input/@Output`, emite cambios con `valueChanges` |
| `PropiedadesGatewayComponent` | (sidebar editor) | Similar patrón a PropiedadesActividad |
| `PropiedadesArcoComponent` | (sidebar editor) | Similar patrón, con warning de optional chain en template |
| `RolesListComponent` | `/roles` | Tabla de roles, eliminación con confirmación |
| `RolFormComponent` | `/roles/nuevo` y `/roles/editar/:id` | Formulario reactivo para CRUD de roles |
| `RolesSelectComponent` | (reutilizable) | Dropdown de roles reutilizable en otros formularios |
| `LanesManagerComponent` | (sidebar editor) | Lista de lanes del proceso, eliminación con confirmación |
| `LaneFormComponent` | `/lanes/:procesoId/nuevo` | Formulario con integración de `RolesSelect` |
| `HistorialComponent` | (tab en ProcesoDetail) | Timeline de auditoría, ordena por fecha descendente |
| `PoolConfigComponent` | (tab en ProcesoDetail) | Formulario reactivo para editar nombre del pool |
| `UsuariosListComponent` | `/usuarios` | Tabla de usuarios cargados desde API por empresaId de sesión |
| `UsuarioFormComponent` | `/usuarios/nuevo` | Formulario de creación de usuario con empresaId de sesión |

#### ❌ Componentes que son STUBS VACÍOS (Solo tienen el decorador `@Component`, sin lógica)

| Componente | Ruta | Impacto |
|:-----------|:-----|:--------|
| `MensajesListComponent` | `/mensajeria` | **CRÍTICO** — No consume `MensajeService`, no muestra datos |
| `ThrowMessageFormComponent` | `/mensajeria/enviar` | **CRÍTICO** — No tiene formulario, no llama a `enviarMensaje()` |
| `CatchMessageConfigComponent` | `/mensajeria/configurar` | **CRÍTICO** — Completamente vacío |
| `NotificacionesComponent` | `/mensajeria/notificaciones` | **MEDIO** — No consume `NotificacionService` |
| `ToastNotificationComponent` | (shared) | **BAJO** — Tiene `@Input()` pero no tiene lógica de auto-cierre ni animación |

---

### 🐛 2. Errores y Problemas Detectados

#### 🔴 Errores Críticos (Bloquean funcionalidad real)

| # | Archivo | Problema | Detalle |
|:-:|:--------|:---------|:--------|
| 1 | `proceso-detail.ts` L84-89 | **El diagrama NO se carga desde el backend** | `cargarDiagrama()` inicializa arrays vacíos en vez de llamar a `ActividadService.getActividades()`, `GatewayService.getGateways()` y `ArcoService.getArcos()`. Al abrir un proceso existente, el canvas siempre aparece vacío. |
| 2 | `proceso-detail.ts` L143-151 | **El guardado del diagrama es un MOCK** | `onSaveDiagram()` solo hace `console.log()` y `alert()`. No llama a ningún servicio para persistir actividades, gateways o arcos. Todo el trabajo visual se pierde al recargar. |
| 3 | `procesos-list.ts` L35 | **Pool ID hardcodeado** | `getProcesos(1)` siempre envía `poolId=1`. Debería obtener el `poolId` desde la sesión o desde la empresa del usuario. |
| 4 | `proceso-form.ts` L88 | **Pool ID hardcodeado** | `poolId: 1` en la creación de procesos. Mismo problema que el anterior. |
| 5 | `roles-list.ts` | **empresaId hardcodeado** | Se eliminó la dependencia de `Session` pero se dejó un valor fijo `empresaId = 1`. |

#### 🟡 Advertencias (No bloquean pero afectan calidad)

| # | Archivo | Problema |
|:-:|:--------|:---------|
| 6 | `propiedades-arco.html` L15 | Warning `NG8107`: Uso innecesario de optional chain `arco?.destinoId` cuando `arco` ya está garantizado no-null. |
| 7 | `dashboard.ts` L26 | Suscripción a `session$` sin `unsubscribe`. Posible memory leak. |
| 8 | `navbar.ts` L24 | Mismo problema de suscripción sin `unsubscribe` / `takeUntilDestroyed`. |
| 9 | `sidebar.ts` L18 | Mismo problema de suscripción sin `unsubscribe`. |
| 10 | `environment.ts` | Solo existe `environment.ts` (dev). Falta `environment.prod.ts` con `production: true`. |

---

### 🔌 3. Comunicación con el Backend — Análisis de Integración

#### Servicios HTTP: Estado de Conexión Real

| Servicio | Endpoints | ¿Se consume en componente? | Estado |
|:---------|:----------|:--------------------------|:------:|
| `AuthService` | `POST /auth/login` | ✅ Sí (`Login`) | ✅ OK |
| `EmpresaService` | `POST /empresas`, `GET /empresas` | ✅ Sí (`RegistroEmpresa`) | ✅ OK |
| `UsuarioService` | `POST`, `GET /empresa/:id`, `PUT /:id/rol` | ✅ Sí (`UsuariosList`, `UsuarioForm`) | ✅ OK |
| `ProcesoService` | Full CRUD (5 métodos) | ✅ Sí (`ProcesosList`, `ProcesoForm`, `ProcesoDetail`) | ✅ OK |
| `ActividadService` | Full CRUD (4 métodos) | ⚠️ **NO se usa en ProcesoDetail** | 🔴 ROTO |
| `GatewayService` | Full CRUD (4 métodos) | ⚠️ **NO se usa en ProcesoDetail** | 🔴 ROTO |
| `ArcoService` | Full CRUD (4 métodos) | ⚠️ **NO se usa en ProcesoDetail** | 🔴 ROTO |
| `LaneService` | Full CRUD (4 métodos) | ✅ Sí (`LanesManager`, `LaneForm`, `ProcesoDetail`) | ✅ OK |
| `RolProcesoService` | Full CRUD (4 métodos) | ✅ Sí (`RolesList`, `RolForm`, `RolesSelect`) | ✅ OK |
| `PoolService` | `GET /:id`, `PUT /:id` | ✅ Sí (`PoolConfig`) | ✅ OK |
| `HistorialCambiosService` | `GET ?procesoId=` | ✅ Sí (`Historial`) | ✅ OK |
| `MensajeService` | 3 métodos (GET, POST throw, GET :id) | ❌ **NINGÚN componente** | 🔴 STUB |
| `NotificacionService` | 2 métodos (POST enviar, GET listar) | ❌ **NINGÚN componente** | 🔴 STUB |

#### Problemas de Integración

| # | Problema | Impacto |
|:-:|:---------|:--------|
| 1 | **Proxy Nginx:** `proxy_pass http://editorprocesos:8080/` — solo funciona si el backend se llama exactamente `editorprocesos` en K8s namespace `grupo23` | Alto |
| 2 | **Sin `environment.prod.ts`:** No hay archivo de entorno de producción explícito | Medio |
| 3 | **Interceptor `X-User-Email`:** Mecanismo de auth débil, pero funcional para el backend actual | Bajo |

---

### 📋 4. Trabajo Pendiente — Priorizado

#### 🔴 Prioridad MÁXIMA (El editor no funciona end-to-end sin esto)

- [ ] **Conectar `cargarDiagrama()`** con los servicios reales (`ActividadService`, `GatewayService`, `ArcoService`) para cargar nodos y conexiones desde la API.
- [ ] **Implementar `onSaveDiagram()` real** que persista actividades, gateways y arcos en el backend.
- [ ] **Desacoplar `poolId` y `empresaId` hardcodeados** (`= 1`) y obtenerlos dinámicamente de `SessionService`.

#### 🟡 Prioridad ALTA (Funcionalidades completas del Sprint 3)

- [ ] **Implementar módulo de Mensajería completo:** `MensajesListComponent`, `ThrowMessageFormComponent`, `CatchMessageConfigComponent`.
- [ ] **Implementar `NotificacionesComponent`** — conectar con `NotificacionService`.
- [ ] **Implementar `ToastNotificationComponent`** con auto-cierre y animaciones — integrarlo globalmente.
- [ ] **Aplicar `RoleGuard`** en rutas donde LECTOR no deba editar/eliminar.

#### 🟢 Prioridad MEDIA (Calidad, Pulido, Despliegue)

- [ ] **Crear `environment.prod.ts`** con `production: true`.
- [ ] **Corregir memory leaks** en `Dashboard`, `Navbar` y `Sidebar` (agregar `DestroyRef` + `takeUntilDestroyed`).
- [ ] **Eliminar warning `NG8107`** en `propiedades-arco.html`.
- [ ] **Agregar contadores reales al Dashboard** (total procesos, usuarios, roles).
- [ ] **Tests unitarios significativos** para servicios críticos y comunicación `@Input/@Output` del editor.
- [ ] **Configurar SonarQube** y alcanzar Quality Gate.

---

### 📈 5. Resumen Ejecutivo — Cobertura de Rúbrica

| Criterio | Peso | Estado Actual | Cobertura |
|:---------|:----:|:-------------|:---------:|
| **Componentes** reutilizables | 20% | 34 creados, 23 funcionales, 5 stubs | ~75% |
| **Servicios** (HTTP/REST) | 20% | 13 servicios creados. 3 no se consumen (Actividad, Gateway, Arco en editor) | ~70% |
| **Modelos** (interfaces DTO) | 10% | 20 interfaces que mapean el backend | ~95% |
| **Comunicación** (@Input/@Output + BehaviorSubject) | 10% | Patrón bien establecido en Editor y Propiedades | ~85% |
| **Funcionalidad** (CRUD + editor visual) | 15% | CRUD procesos funciona. Editor renderiza pero NO carga/guarda al backend | ~50% |
| **Librerías externas** | 5% | `@angular/cdk` (DragDrop) justificada | ~80% |
| **Despliegue** | 10% | Pipeline CI/CD configurado con issues de rollout pendientes | ~70% |
| **Ingeniería de Software** | 10% | Estructura excelente. Falta SonarQube, tests reales y Git tags | ~40% |
| **TOTAL ESTIMADO** | 100% | | **~68%** |

> **ATENCIÓN:** El área que más impacta la nota es **Funcionalidad (15%)**. Si no conectamos el editor con los servicios reales (cargar + guardar diagrama), el flujo end-to-end de la prueba de humo del Sprint 2 **NO pasa**. Esto debe ser la prioridad absoluta.

---

## 🚨 SPRINT FINAL: Asignación de Tareas por Desarrollador

> **Contexto:** Basado en la auditoría del 30/Abril, se distribuye el trabajo pendiente entre los 6 Devs.
> **Dev 7 (Scrum Master)** se reserva para: revisión de PRs, resolución de conflictos de compilación, monitoreo de despliegues y QA general.
>
> **Regla de oro para TODOS:** Antes de escribir código, lee los archivos indicados. No inventes servicios nuevos; ya existen en `src/app/services/`. No crees modelos nuevos; ya existen en `src/app/models/`. Usa `standalone: true` en cada componente. Toda suscripción a un Observable debe hacerse en `ngOnInit()`.

---

### 👨‍💻 Dev 1 — Conectar el Editor al Backend (PRIORIDAD MÁXIMA)

**Objetivo:** Hacer que el editor visual cargue datos reales y los guarde en el backend. Sin esto, la funcionalidad del proyecto está rota.

#### Archivos a modificar:
- `src/app/features/procesos/proceso-detail/proceso-detail.ts`

#### Tareas:

**Tarea 1.1: Inyectar los servicios faltantes**
- En el `constructor` de `ProcesoDetail`, inyectar los 3 servicios que faltan:
  ```typescript
  import { Actividad as ActividadService } from '../../../services/actividad';
  import { Gateway as GatewayService } from '../../../services/gateway';
  import { Arco as ArcoService } from '../../../services/arco';
  ```
- Agregarlos al constructor: `private actividadService: ActividadService`, etc.

**Tarea 1.2: Implementar `cargarDiagrama()` real**
- Reemplazar las líneas 84-98 donde dice `this.actividades = []` etc.
- Llamar a cada servicio para cargar los datos existentes:
  ```typescript
  this.actividadService.getActividades(id).subscribe({
    next: (res) => this.actividades = res.data,
    error: (err) => console.error('Error cargando actividades', err)
  });
  // Repetir para gateways y arcos
  ```

**Tarea 1.3: Implementar `onSaveDiagram()` real**
- Reemplazar las líneas 143-151 donde dice `console.log` y `alert`.
- Lógica: recorrer cada array (`actividades`, `gateways`, `arcos`).
  - Si `id < 0` → es nuevo → llamar a `crearActividad()` / `crearGateway()` / `crearArco()`.
  - Si `id > 0` → ya existía → llamar a `updateActividad()` / `updateGateway()` / `updateArco()`.
- Usar `forkJoin` de RxJS para esperar a que todas las peticiones terminen y luego recargar el diagrama.

#### ⚠️ Cuidados:
- **NO** toques el HTML ni el CSS del editor, solo el `.ts`.
- Los IDs negativos (`nextId--`) son temporales para elementos nuevos. Al guardar, el backend devuelve el ID real. Después de guardar, debes llamar a `cargarDiagrama()` de nuevo para sincronizar.
- Prueba con un proceso que ya tenga datos en la base de datos del backend.

#### Criterio de aceptación:
- Al abrir `/procesos/:id`, el canvas muestra las actividades, gateways y arcos que ya existen en el backend.
- Al presionar "Guardar" en el Toolbar, los elementos se persisten en la API y sobreviven un F5.

---

### 👨‍💻 Dev 2 — Desacoplar valores hardcodeados y corregir flujo de sesión

**Objetivo:** Eliminar todos los `poolId: 1` y `empresaId: 1` hardcodeados y obtenerlos dinámicamente de la sesión del usuario.

#### Archivos a modificar:
- `src/app/features/procesos/procesos-list/procesos-list.ts`
- `src/app/features/procesos/proceso-form/proceso-form.ts`
- `src/app/features/roles/roles-list/roles-list.ts`
- `src/app/features/procesos/proceso-detail/proceso-detail.ts` (si Dev 1 no lo hizo)

#### Tareas:

**Tarea 2.1: Inyectar `Session` en `ProcesosListComponent`**
- Importar `Session` desde `../../../core/services/session`.
- En `cargarProcesos()`, obtener el poolId dinámicamente. Como el `AuthResponse` no tiene poolId directamente, necesitas una estrategia:
  - **Opción A (recomendada):** Usar `empresaId` de la sesión. Si el backend tiene un endpoint para obtener el Pool por empresaId, úsalo. Si no, usar `empresaId` como `poolId` (son iguales en muchos casos).
  - **Opción B:** Hardcodear `poolId = 1` **PERO** dejar un comentario `// TODO: obtener poolId de la sesión cuando el backend lo soporte`.

**Tarea 2.2: Inyectar `Session` en `ProcesoFormComponent`**
- En `onSubmit()`, línea 88, cambiar `poolId: 1` por `poolId: this.sessionService.getEmpresaId() ?? 1`.

**Tarea 2.3: Corregir `RolesListComponent`**
- Revisar el componente y asegurarse de que `empresaId` se obtiene de `this.sessionService.getEmpresaId()`.

#### ⚠️ Cuidados:
- El servicio `Session` ya está en `core/services/session.ts` y es inyectable. NO lo recrees.
- `getEmpresaId()` puede retornar `null` si la sesión no existe. Siempre pon un fallback: `?? 1` o muestra un error al usuario.
- **NO** modifiques el `SessionService` ni el `AuthInterceptor`. Solo consume lo que ya existe.

#### Criterio de aceptación:
- Al iniciar sesión con un usuario de empresa X, la lista de procesos muestra solo los procesos de esa empresa.
- Al crear un proceso nuevo, se asigna automáticamente al pool de la empresa del usuario logueado.

---

### 👨‍💻 Dev 3 — Módulo de Mensajería (4 componentes)

**Objetivo:** Implementar toda la funcionalidad de mensajería entre procesos. Los 4 componentes están creados como stubs vacíos.

#### Archivos a modificar:
- `src/app/features/mensajeria/mensajes-list/mensajes-list.ts` + `.html` + `.css`
- `src/app/features/mensajeria/throw-message-form/throw-message-form.ts` + `.html` + `.css`
- `src/app/features/mensajeria/catch-message-config/catch-message-config.ts` + `.html` + `.css`
- `src/app/features/mensajeria/notificaciones/notificaciones.ts` + `.html` + `.css`

#### Servicios que DEBES usar (ya existen, NO los crees):
- `src/app/services/mensaje.ts` → Métodos: `getMensajes(procesoId)`, `enviarMensaje(mensaje)`, `recibirMensaje(mensajeId)`
- `src/app/services/notificacion.ts` → Métodos: `enviarNotificacion(request)`, `getNotificaciones()`

#### Modelos que DEBES usar (ya existen):
- `src/app/models/mensaje.ts` → `{ id, nombre, tipo, contenido, procesoOrigenId, procesoDestinoId }`
- `src/app/models/correlacion-result.ts` → `{ mensajeId, correlacionExitosa, detalle }`
- `src/app/models/notificacion-request.ts` → `{ destinatarioEmail, asunto, cuerpo }`
- `src/app/models/notificacion-response.ts` → `{ id, destinatarioEmail, asunto, cuerpo, fechaEnvio }`

#### Tareas:

**Tarea 3.1: `MensajesListComponent`**
- Necesita un `@Input() procesoId` O leer el procesoId de la ruta.
- En `ngOnInit()`, llamar a `mensajeService.getMensajes(procesoId)`.
- Mostrar tabla con columnas: Nombre, Tipo (THROW/CATCH), Proceso Origen, Proceso Destino.
- Usa el patrón de `ProcesosListComponent` como referencia (tabla + loading + error).

**Tarea 3.2: `ThrowMessageFormComponent`**
- Formulario reactivo con campos: nombre, tipo (fijar en 'THROW'), contenido, procesoOrigenId, procesoDestinoId.
- En `onSubmit()`, llamar a `mensajeService.enviarMensaje(mensaje)`.
- Mostrar la respuesta de correlación (`CorrelacionResult`) después de enviar.

**Tarea 3.3: `CatchMessageConfigComponent`**
- Mostrar lista de mensajes de tipo CATCH del proceso actual.
- Permitir ver el detalle de un mensaje recibido con `mensajeService.recibirMensaje(id)`.

**Tarea 3.4: `NotificacionesComponent`**
- Formulario para enviar notificación: `destinatarioEmail`, `asunto`, `cuerpo`.
- Tabla con el historial de notificaciones enviadas (`notificacionService.getNotificaciones()`).

#### ⚠️ Cuidados:
- Cada componente DEBE tener `standalone: true` en el decorador `@Component`.
- Usa `ReactiveFormsModule` para los formularios (importarlo en el array `imports` del componente).
- Copia el estilo visual de los formularios existentes (`rol-form.css`, `lane-form.css`) para mantener coherencia.
- Revisa `src/app/features/mensajeria/mensajeria.routes.ts` para entender las rutas ya definidas. NO cambies las rutas.

#### Criterio de aceptación:
- Al navegar a `/mensajeria`, se ve la lista de mensajes del proceso.
- Se puede enviar un mensaje THROW y ver el resultado de correlación.
- Se pueden ver notificaciones enviadas.

---

### 👨‍💻 Dev 4 — Toast Global, Dashboard real, y Memory Leaks

**Objetivo:** Mejorar la experiencia de usuario con feedback visual en operaciones CRUD, poner datos reales en el Dashboard, y corregir memory leaks.

#### Archivos a modificar:
- `src/app/shared/components/toast-notification/toast-notification.ts` + `.html` + `.css`
- `src/app/features/dashboard/dashboard.ts` + `.html`
- `src/app/features/layout/navbar/navbar.ts`
- `src/app/features/layout/sidebar/sidebar.ts`

#### Tareas:

**Tarea 4.1: Completar `ToastNotificationComponent`**
- Agregar lógica de auto-cierre (usar `setTimeout` de 3-5 segundos).
- Agregar animación CSS de entrada/salida (slide-in desde arriba o desde la derecha).
- Agregar estilos por tipo: `success` (verde), `error` (rojo), `info` (azul).
- Ejemplo de template:
  ```html
  @if (visible) {
    <div class="toast toast-{{tipo}}" [class.show]="visible">
      {{ mensaje }}
    </div>
  }
  ```

**Tarea 4.2: Dashboard con datos reales**
- Inyectar `ProcesoService`, `UsuarioService` y `RolProcesoService`.
- En `ngOnInit()`, hacer las 3 llamadas para obtener los conteos reales:
  ```typescript
  this.procesoService.getProcesos(poolId).subscribe(res => this.totalProcesos = res.data.length);
  ```
- Actualizar el HTML para mostrar estos valores en las tarjetas del dashboard.

**Tarea 4.3: Corregir memory leaks en 3 archivos**
- En `Dashboard`, `Navbar` y `Sidebar`, las suscripciones a `session$` nunca se limpian.
- Solución recomendada (Angular 16+):
  ```typescript
  import { DestroyRef, inject } from '@angular/core';
  import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
  
  private destroyRef = inject(DestroyRef);
  
  ngOnInit(): void {
    this.sessionService.session$.pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe(session => { ... });
  }
  ```

#### ⚠️ Cuidados:
- `takeUntilDestroyed()` solo funciona si se inyecta `DestroyRef` en el campo de la clase (no en el constructor).
- Para el Dashboard, el `poolId` tiene el mismo problema de hardcodeo. Usa `this.sessionService.getEmpresaId() ?? 1` como fallback.
- El Toast no necesita un servicio global por ahora. Solo completa el componente. Si quieres, puedes crear un servicio después.

#### Criterio de aceptación:
- El Dashboard muestra contadores reales (no 0).
- No hay memory leaks reportados en la consola del navegador al navegar entre rutas.
- El componente Toast muestra mensajes con estilos correctos y desaparece automáticamente.

---

### 👨‍💻 Dev 5 — Permisos Visuales (RoleGuard) y Pulido CSS

**Objetivo:** Asegurar que los usuarios con rol LECTOR no puedan ver botones de edición/eliminación, y pulir los estilos de componentes que aún se ven genéricos.

#### Archivos a modificar:
- `src/app/features/layout/layout.routes.ts` (agregar `RoleGuard` a rutas)
- `src/app/features/procesos/procesos-list/procesos-list.html`
- `src/app/features/roles/roles-list/roles-list.html`
- `src/app/features/editor/propiedades-arco/propiedades-arco.html` (fix warning)
- CSS de componentes que necesiten pulido visual

#### Tareas:

**Tarea 5.1: Aplicar `RoleGuard` en rutas sensibles**
- El guard ya existe en `src/app/core/guards/role.guard.ts` y funciona.
- En `layout.routes.ts`, agregar `canActivate: [roleGuard]` y `data: { roles: ['ADMIN', 'EDITOR'] }` a las rutas de creación/edición:
  ```typescript
  { 
    path: 'roles', 
    canActivate: [roleGuard],
    data: { roles: ['ADMIN', 'EDITOR'] },
    loadChildren: () => import('../roles/roles.routes').then(m => m.ROLES_ROUTES) 
  }
  ```

**Tarea 5.2: Ocultar botones de edición/eliminación para LECTOR**
- En `ProcesosListComponent`, `RolesListComponent` y templates similares:
  - Inyectar `Session` y crear variable `userRole`.
  - Envolver botones de "Editar" y "Eliminar" con `@if (userRole !== 'LECTOR')`.

**Tarea 5.3: Fix warning NG8107**
- En `propiedades-arco.html`, línea 15, cambiar `arco?.destinoId` por `arco.destinoId` (el `@if` padre ya garantiza que arco no es null).

**Tarea 5.4: Pulido CSS general**
- Revisar que todos los formularios tengan estilos coherentes (bordes, colores, espaciado).
- Revisar que el `NotFoundComponent` (404) se vea profesional.
- Verificar que las tablas tengan hover effects y bordes sutiles.

#### ⚠️ Cuidados:
- El `roleGuard` lee `route.data?.['roles']`. Si no pones `data`, el guard deja pasar a todos (por diseño).
- **NO** muevas ni renombres archivos de componentes. Solo modifica contenido.
- **NO** cambies la lógica de `SessionService` ni de `AuthGuard`.

#### Criterio de aceptación:
- Un usuario LECTOR puede ver listas pero NO ve botones de crear/editar/eliminar.
- Un usuario ADMIN ve todo.
- El warning NG8107 desaparece del build.

---

### 👨‍💻 Dev 6 — Environment de Producción y Despliegue Estable

**Objetivo:** Asegurar que el proyecto compile limpio para producción, crear el environment de producción, y verificar la integración Nginx ↔ Backend en Kubernetes.

#### Archivos a crear/modificar:
- `src/app/environments/environment.prod.ts` (CREAR)
- `angular.json` (configurar fileReplacements para producción)
- `nginx.conf` (verificar el nombre del servicio backend)
- `k8s/deployment.yaml` (verificar configuración)
- `.github/workflows/deploy.yml` (verificar pipeline)

#### Tareas:

**Tarea 6.1: Crear `environment.prod.ts`**
```typescript
export const environment = {
  production: true,
  apiUrl: '/api/v1'
};
```

**Tarea 6.2: Configurar `angular.json` para reemplazo de environment**
- En la sección `configurations > production`, agregar:
```json
"fileReplacements": [
  {
    "replace": "src/app/environments/environment.ts",
    "with": "src/app/environments/environment.prod.ts"
  }
]
```

**Tarea 6.3: Verificar nombre del backend en `nginx.conf`**
- Actualmente dice `proxy_pass http://editorprocesos:8080/`.
- Confirmar con el equipo de backend que su servicio en Kubernetes namespace `grupo23` se llama exactamente `editorprocesos`. Si no, actualizar el nombre.
- Puedes verificar ejecutando: `sudo microk8s kubectl get services -n grupo23`

**Tarea 6.4: Verificar que `ng build` compile limpio**
- Ejecutar `ng build` localmente y asegurarse de que no hay errores (solo warnings tolerables).
- Verificar que la carpeta `dist/Front-proyecto/browser/` se genera correctamente.

**Tarea 6.5: Verificar el pipeline completo**
- Hacer push a `main` y monitorear GitHub Actions.
- Verificar que la imagen Docker se publica en GHCR.
- Verificar que el pod arranca en Kubernetes (revisar en `https://javeriana.inphotech.co/k8smonitor`).

#### ⚠️ Cuidados:
- El `Dockerfile` usa `npm run build` (que ejecuta `ng build` con la configuración `production` por defecto gracias a `defaultConfiguration: "production"` en `angular.json`).
- **NO** modifiques el `Dockerfile` a menos que sea absolutamente necesario.
- Si el pod sigue en CrashLoopBackOff, el problema más probable es que Nginx no puede resolver el nombre DNS del backend. Verifica con `kubectl logs`.

#### Criterio de aceptación:
- `ng build` compila sin errores.
- El pipeline de GitHub Actions pasa en verde (Build + Deploy).
- La aplicación es accesible desde `https://grupo23.inphotech.co` y puede comunicarse con el backend.

---

### 👨‍💻 Dev 7 (Scrum Master / Tú) — QA, Revisión y Despliegue

**Objetivo:** Supervisar el trabajo de los 6 Devs, resolver conflictos de compilación, validar PRs y garantizar que la demo final funciona end-to-end.

#### Responsabilidades:
- [ ] Revisar PRs de cada Dev antes de merge a `main`.
- [ ] Ejecutar `ng build` después de cada merge para detectar errores de compilación temprano.
- [ ] Monitorear el pipeline de GitHub Actions y diagnosticar fallos.
- [ ] Verificar en `https://javeriana.inphotech.co/k8smonitor` que el pod esté corriendo.
- [ ] Ejecutar la prueba de humo final completa (ver checklist abajo).
- [ ] Documentar issues encontrados y comunicarlos al Dev responsable.

#### Checklist de Prueba de Humo Final:
1. [ ] Registrar empresa → ver credenciales generadas
2. [ ] Login con las credenciales → llegar al Dashboard con datos reales
3. [ ] Ir a `/procesos` → ver lista de procesos de la empresa
4. [ ] Crear proceso nuevo → verificar que aparece en la lista
5. [ ] Abrir proceso en editor → verificar que carga actividades/gateways/arcos existentes
6. [ ] Agregar actividades y gateways con drag & drop
7. [ ] Conectar con arcos → guardar → recargar → verificar persistencia
8. [ ] Ir a tab "Historial" → ver cambios registrados
9. [ ] Ir a tab "Pool" → editar nombre del pool
10. [ ] Ir a `/roles` → crear un rol nuevo
11. [ ] Ir a `/mensajeria` → enviar un mensaje entre procesos
12. [ ] Verificar que usuario LECTOR no ve botones de edición
13. [ ] Todo funcionando desde la URL de despliegue (Kubernetes)

---

### 📅 Cronograma Sugerido

| Día | Dev 1 | Dev 2 | Dev 3 | Dev 4 | Dev 5 | Dev 6 | Dev 7 |
|:----|:------|:------|:------|:------|:------|:------|:------|
| **Día 1** | Cargar diagrama desde backend | Desacoplar poolId/empresaId | MensajesListComponent | ToastNotification | RoleGuard en rutas | Crear environment.prod.ts | Revisar PRs |
| **Día 2** | Guardar diagrama al backend | Probar flujo con sesión real | ThrowMessageForm + CatchConfig | Dashboard con datos reales | Ocultar botones para LECTOR | Verificar Nginx + K8s | Compilar y detectar errores |
| **Día 3** | Testing manual editor | Testing manual procesos | NotificacionesComponent | Fix memory leaks | Pulido CSS | Pipeline verde | Prueba de humo final |

