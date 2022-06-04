import { ICardapio } from "./i-cardapio";
import { MyPages } from '../../../../../my-shared/interfaces-shared/my-pages';
export interface IResponsePageableCardapio {
  _embedded: {cardapios: ICardapio[]};
  _links: {
      self: { href: string ; };
      profile: { href: string ;};
      search: { href: string ; };
  };
  page: MyPages;
}
