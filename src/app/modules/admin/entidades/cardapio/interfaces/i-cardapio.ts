import { ILog } from '../../../../../my-shared/interfaces-shared/i-log';
import { ILinksCardapio } from './i-links-cardapio';
export interface ICardapio {
  id: number;
  nomePt: string;
  nomeIng: string;
  nomeFr: string;
  codigoReduzido: string;
  activo: boolean,
  imagem: string;
  log: ILog;

  nomeHotel: string;
  _links: ILinksCardapio;
}
