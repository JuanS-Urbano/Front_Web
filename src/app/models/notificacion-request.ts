export interface NotificacionRequest {
  tipo: string;
  destino: string;
  asunto: string;
  contenido: string;
  procesoId: number;
}
