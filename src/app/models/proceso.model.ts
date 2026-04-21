/**
 * DTO de Proceso.
 *
 * Corresponde a: com.grupo1.editorprocesos.dto.ProcesoDTO
 */
export interface Proceso {
  id: number;
  nombre: string;
  descripcion: string;
  categoria: string;
  estado: string;          // BORRADOR | PUBLICADO | INACTIVO
  poolId: number;
  compartido: boolean;
  // TODO: verificar campos adicionales del backend (fechaCreacion, etc.)
}
