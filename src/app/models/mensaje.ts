import { Referencia } from './referencia';

export interface Mensaje {
  id?: number;
  nombre: string;
  payloadJson: string;
  tipo: string;          // 'THROW' | 'CATCH'
  estado?: string;       // 'PENDIENTE' | 'ENTREGADO' | 'FALLIDO'
  correlationKey?: string;
  proceso?: Referencia;
  procesoDestino?: Referencia;
}
