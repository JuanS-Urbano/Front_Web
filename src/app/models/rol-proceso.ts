import { Referencia } from './referencia';

export interface RolProceso {
  id?: number;
  nombre: string;
  descripcion: string;
  empresa?: Referencia;
}
