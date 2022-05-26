import { MyPages } from './../../../my-shared/interfaces-shared/my-pages';

import { TipoConjunto } from '../models/tipo-conjunto';

export interface ResponsePageableTipoConjunto {
  _embedded: {tipoconjuntos: TipoConjunto[]};
  _links: {
      self: { href: string ; };
      profile: { href: string ;};
      search: { href: string ; };
  };
  page: MyPages;
}
