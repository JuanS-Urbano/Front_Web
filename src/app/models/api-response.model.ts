/**
 * Respuesta genérica del backend.
 * Envuelve todas las respuestas de la API REST.
 *
 * Corresponde a: com.grupo1.editorprocesos.dto.ApiResponse<T>
 */
export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  // TODO: verificar campos adicionales del backend (timestamp, status, etc.)
}
