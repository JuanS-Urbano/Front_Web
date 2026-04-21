/**
 * DTO de Gateway (punto de decisión).
 *
 * Corresponde a: com.grupo1.editorprocesos.dto.GatewayDTO
 */
export interface Gateway {
  id: number;
  nombre: string;
  tipo: string;            // EXCLUSIVO | PARALELO | INCLUSIVO
  procesoId: number;
  posicionX: number;
  posicionY: number;
  // TODO: verificar campos adicionales del backend
}
