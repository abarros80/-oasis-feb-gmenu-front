import { ITitem } from "./i-titem";
import { MyPages } from './../../../../../my-shared/interfaces-shared/my-pages';
export interface IResponsePageableTitem {
  _embedded: {tipoitens: ITitem[]};
  _links: {
      self: { href: string ; };
      profile: { href: string ;};
      search: { href: string ; };
  };
  page: MyPages;
}
