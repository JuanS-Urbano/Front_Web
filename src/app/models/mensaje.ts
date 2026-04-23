export interface Mensaje {
  id: number;
  nombre: string;
  payload: string;
  procesoOrigenId: number;
  procesoDestinoId: number;
  estado: string;
}
