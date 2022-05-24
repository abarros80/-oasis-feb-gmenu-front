import { MyPages } from "./my-pages";

export interface ResponsePageable<T> {
  _embedded: {};
  _links: {
      self: { href: string ; };
      profile: { href: string ;};
      search: { href: string ; };
  };
  page: MyPages;
}
