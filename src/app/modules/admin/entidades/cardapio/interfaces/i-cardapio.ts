import { ILog } from '../../../../../my-shared/interfaces-shared/i-log';
export interface ICardapio {
  id: number;
  nomePt: string;
  nomeIng: string;
  nomeFr: string;
  codigoReduzido: string;
  activo: boolean,
  imagem: string;
  log: ILog;
  _links: {};
}
