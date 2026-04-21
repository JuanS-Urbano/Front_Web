/**
 * DTO de Mensaje (comunicación entre procesos).
 *
 * Corresponde a: com.grupo1.editorprocesos.dto.MensajeDTO
 */
export interface Mensaje {
  id: number;
  nombre: string;
  payload: string;           // JSON string
  procesoOrigenId: number;
  procesoDestinoId: number;
  estado: string;            // ENVIADO | RECIBIDO | PENDIENTE
  // TODO: verificar campos adicionales del backend
}
