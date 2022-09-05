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
  _links: {
    self: { href: string };
    cardapio: { href: string };
    hotel: { href: string };
    itemCardapio: { href: string };
    restauranteCardapio: { href: string };
  };
}
