import { ILog } from '../../../../../my-shared/interfaces-shared/i-log';
import { ILinksTitem } from './i-links-titem';
export interface ITitem {
  id: number;
  nome: string;
  activo: boolean;

  log: ILog;
  _links: ILinksTitem;

}
