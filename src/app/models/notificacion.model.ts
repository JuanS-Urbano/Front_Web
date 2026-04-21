/**
 * DTOs de Notificación.
 *
 * Corresponde a:
 * - com.grupo1.editorprocesos.dto.NotificacionRequestDTO
 * - com.grupo1.editorprocesos.dto.NotificacionResponseDTO
 */

export interface NotificacionRequest {
  tipo: string;              // EMAIL | WEBHOOK
  destino: string;
  asunto: string;
  contenido: string;
  procesoId: number;
  // TODO: verificar campos adicionales del backend
}

export interface NotificacionResponse {
  id: number;
  tipo: string;
  destino: string;
  estado: string;            // ENVIADA | FALLIDA | PENDIENTE
  fechaEnvio: string;        // ISO 8601
  // TODO: verificar campos adicionales del backend
}
