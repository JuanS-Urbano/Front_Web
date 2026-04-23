import { Referencia } from './referencia';

export interface Usuario {
  id: number;
  email: string;
  rolSistema: string;
  isActivo: boolean;
  empresa: Referencia;
}
