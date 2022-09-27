import { ILog } from '../../../../../my-shared/interfaces-shared/i-log';
import { ILinksRestaurante } from './i-links-restaurante';
export interface IRestaurante {
  id: number;
  nome: string;
  telefone: string;
  numeroInterno: string;
  horario: string;
  imagemCapa: string;
  activo: boolean;

  log: ILog;

  nomeHotel: string;
  _links: ILinksRestaurante;

}
