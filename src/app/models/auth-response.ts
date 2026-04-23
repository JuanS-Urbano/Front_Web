import { Referencia } from './referencia';

export interface AuthResponse {
  token: string;
  usuario: Referencia;
  email: string;
  rolSistema: string;
  empresa: Referencia;
}
