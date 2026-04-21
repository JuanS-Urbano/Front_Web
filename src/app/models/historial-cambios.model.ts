/**
 * DTO de Historial de Cambios.
 *
 * Corresponde a: com.grupo1.editorprocesos.dto.HistorialCambiosDTO
 */
export interface HistorialCambios {
  id: number;
  procesoId: number;
  usuarioEmail: string;
  descripcionCambio: string;
  fechaCambio: string;       // ISO 8601
  // TODO: verificar campos adicionales del backend
}
