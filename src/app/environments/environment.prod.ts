/**
 * Configuración de entorno para PRODUCCIÓN.
 * Usa proxy reverso (Nginx) para redirigir /api al backend.
 */
export const environment = {
  production: true,
  apiUrl: '/api'
};
