import { IItem } from './i-item';
import { MyPages } from '../../../../../my-shared/interfaces-shared/my-pages';
export interface IResponsePageableItem  {
  _embedded: {itens: IItem[]};
  _links: {
      self: { href: string ; };
      profile: { href: string ;};
      search: { href: string ; };
  };
  page: MyPages;
}
