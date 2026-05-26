import { Referencia } from './referencia';

export interface HistorialCambiosDTO {
  id: number;
  proceso: Referencia;
  usuario: Referencia;
  fecha: string;
  cambio: string;
}

export interface Metricas {
  totalProcesos: number;
  procesosPorEstado: { [key: string]: number };
  totalUsuarios: number;
  usuariosPorRol: { [key: string]: number };
  totalActividades: number;
  totalRolesProceso: number;
  ultimosCambios: HistorialCambiosDTO[];
}
