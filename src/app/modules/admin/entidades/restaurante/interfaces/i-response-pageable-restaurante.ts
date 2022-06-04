import { MyPages } from '../../../../../my-shared/interfaces-shared/my-pages';
import { IRestaurante } from './i-restaurante';
export interface IResponsePageableRestaurante {
  _embedded: {restaurantes: IRestaurante[]};
  _links: {
      self: { href: string ; };
      profile: { href: string ;};
      search: { href: string ; };
  };
  page: MyPages;
}
