export interface Proceso {
  id?: number;
  nombre: string;
  descripcion: string;
  categoria: string;
  estado: string;
  pool?: { id: number; nombre?: string };
  empresa?: { id: number; nombre?: string };
  configuracionCompartido?: boolean;
}
