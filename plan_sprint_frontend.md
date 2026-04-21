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
- **Prueba de humo:** Un usuario debe poder registrar una empresa, hacer login, y ver el Dashboard vacío con la navegación correcta y su nombre visible.

---

## 🏃 Sprint 2: Visor y Editor de Procesos — El Core (Semana 2)

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
| 3 | **Servicios** | 12 servicios Angular consumiendo correctamente los 11 controllers | ✅ Stubs creados |
| 4 | **Modelos** | 19 interfaces TypeScript mapeando todos los DTOs | ✅ Creados |
| 5 | **Comunicación** | `@Input/@Output` + servicios compartidos con `BehaviorSubject` | ✅ Patrón establecido |
| 6 | **Funcionalidad** | CRUD completo de procesos + editor visual de diagramas operativo | ⏳ Sprint 2 |
| 7 | **Librerías** | Mínimo 2 librerías externas justificadas (UI framework + diagramado) | ⏳ Sprint 2 |
| 8 | **Despliegue** | Frontend + Backend corriendo juntos en Docker | ⏳ Sprint 3 |
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
