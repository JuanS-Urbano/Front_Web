/**
 * DTO de Rol de Proceso.
 *
 * Corresponde a: com.grupo1.editorprocesos.dto.RolProcesoDTO
 */
export interface RolProceso {
  id: number;
  nombre: string;
  descripcion: string;
  empresaId: number;
  // TODO: verificar campos adicionales del backend
}
