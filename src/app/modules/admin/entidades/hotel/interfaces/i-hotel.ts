import { ILog } from '../../../../../my-shared/interfaces-shared/i-log';
import { ILinksHotel } from './i-links-hotel';
export interface IHotel {
  id: number;
  nome: string;
  telefone: string;
  email: string;
  imagemLogo: string;
  activo: true;

  log: ILog;
  _links: ILinksHotel;
}
