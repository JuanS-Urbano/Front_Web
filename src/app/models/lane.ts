import { Referencia } from './referencia';

export interface Lane {
  id?: number;
  nombre: string;
  descripcion?: string;
  orden: number;
  posicionX?: number;
  posicionY?: number;
  rolProceso?: Referencia;
  proceso?: Referencia;
}
