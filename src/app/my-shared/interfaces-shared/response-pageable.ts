import { MyPages } from "./my-pages";
import { TipoConjunto } from '../../modules/tipo-conjunto/models/tipo-conjunto';

export interface ResponsePageable {
  _embedded: {};
  _links: {
      self: { href: string ; };
      profile: { href: string ;};
      search: { href: string ; };
  };
  page: MyPages;
}
