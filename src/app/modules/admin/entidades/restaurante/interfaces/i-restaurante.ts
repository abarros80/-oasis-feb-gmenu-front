import { ILog } from '../../../../../my-shared/interfaces-shared/i-log';
export interface IRestaurante {
  id: number;
  nome: string;
  telefone: string;
  numeroInterno: string;
  horario: string;
  imagemCapa: string;
  activo: boolean,
  log: ILog;
  _links: {};
}
