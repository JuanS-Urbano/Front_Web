/**
 * DTOs de Usuario.
 *
 * Corresponde a:
 * - com.grupo1.editorprocesos.dto.UsuarioDTO
 * - com.grupo1.editorprocesos.dto.UsuarioCreateDTO
 */

export interface Usuario {
  id: number;
  email: string;
  nombre: string;
  rol: string;           // ADMIN | EDITOR | LECTOR
  empresaId: number;
  // TODO: verificar campos adicionales del backend
}

export interface UsuarioCreate {
  email: string;
  nombre: string;
  password: string;
  rol: string;
  empresaId: number;
  // TODO: verificar campos adicionales del backend
}
