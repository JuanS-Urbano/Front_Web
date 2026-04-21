/**
 * DTO de Lane (swimlane dentro de un pool).
 *
 * Corresponde a: com.grupo1.editorprocesos.dto.LaneDTO
 */
export interface Lane {
  id: number;
  nombre: string;
  orden: number;
  rolProcesoId: number;
  procesoId: number;
  // TODO: verificar campos adicionales del backend
}
