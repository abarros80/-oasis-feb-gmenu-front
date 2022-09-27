import { ILog } from '../../../../../my-shared/interfaces-shared/i-log';
import { ILinksItem } from './i-links-item';
export interface IItem {
  id: number;
  nomePt: string;
  nomeIng: string;
  nomeFr: string;
  activo: true,
  fotoPath: string;
  descPt: string;
  descFr: string;
  descIng: string;
  preco: number;
  quantidade: number;
  unidadeMedidaEnum: string;

  nometipoItem: string;
  nomeHotel: string;

  log: ILog;
  _links: ILinksItem;
}
