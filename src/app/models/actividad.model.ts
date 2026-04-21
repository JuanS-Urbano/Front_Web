/**
 * DTO de Actividad.
 *
 * Corresponde a: com.grupo1.editorprocesos.dto.ActividadDTO
 */
export interface Actividad {
  id: number;
  nombre: string;
  tipo: string;
  procesoId: number;
  laneId: number;
  posicionX: number;
  posicionY: number;
  // TODO: verificar campos adicionales del backend
}
