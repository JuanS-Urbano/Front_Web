/**
 * DTO de Arco (conexión entre nodos).
 *
 * Corresponde a: com.grupo1.editorprocesos.dto.ArcoDTO
 */
export interface Arco {
  id: number;
  etiqueta: string;
  origenId: number;
  destinoId: number;
  procesoId: number;
  // TODO: verificar campos adicionales del backend (tipoOrigen, tipoDestino, etc.)
}
