import { ILog } from '../../../../../my-shared/interfaces-shared/i-log';
export interface ITitem {
  id: number;
  nome: string;
  activo: boolean;

  log: ILog;
  _links: {};

}
