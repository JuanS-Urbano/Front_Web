/**
 * DTOs de autenticación.
 *
 * Corresponde a:
 * - com.grupo1.editorprocesos.dto.AuthRequestDTO
 * - com.grupo1.editorprocesos.dto.AuthResponseDTO
 */

export interface AuthRequest {
  email: string;
  password: string;
  // TODO: verificar campos adicionales del backend
}

export interface AuthResponse {
  token: string;
  email: string;
  rol: string;
  empresaId: number;
  nombreEmpresa: string;
  // TODO: verificar campos adicionales del backend (nombre usuario, etc.)
}
