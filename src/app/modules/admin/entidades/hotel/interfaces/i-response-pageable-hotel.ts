import { MyPages } from '../../../../../my-shared/interfaces-shared/my-pages';
import { IHotel } from './i-hotel';
export interface IResponsePageableHotel {
  _embedded: { hoteis: IHotel[]};
  _links: {
      self: { href: string ; };
      profile: { href: string ;};
      search: { href: string ; };
  };
  page: MyPages;
}
