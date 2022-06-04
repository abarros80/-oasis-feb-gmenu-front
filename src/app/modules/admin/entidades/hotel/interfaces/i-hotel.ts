import { ILog } from '../../../../../my-shared/interfaces-shared/i-log';
export interface IHotel {
  id: number;
  nome: string;
  telefone: string;
  email: string;
  imagemLogo: string;
  activo: boolean;
  log: ILog;
  _links: {};
}
