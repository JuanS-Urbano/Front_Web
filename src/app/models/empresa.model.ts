/**
 * DTO de Empresa.
 *
 * Corresponde a: com.grupo1.editorprocesos.dto.EmpresaDTO
 */
export interface Empresa {
  id: number;
  nombre: string;
  nit: string;
  correoContacto: string;
  // TODO: verificar campos adicionales del backend (fechaCreacion, activo, etc.)
}
