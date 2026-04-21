/**
 * DTO de resultado de correlación de mensajes.
 *
 * Corresponde a: com.grupo1.editorprocesos.dto.CorrelacionResultDTO
 */
export interface CorrelacionResult {
  mensajeId: number;
  procesoDestinoId: number;
  estado: string;            // EXITOSO | PENDIENTE | SIN_RECEPTOR
  // TODO: verificar campos adicionales del backend
}
