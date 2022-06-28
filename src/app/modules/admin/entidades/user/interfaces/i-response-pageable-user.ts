import { IUser } from './i-user';
import { MyPages } from '../../../../../my-shared/interfaces-shared/my-pages';
export interface IResponsePageableUser {
  _embedded: {users: IUser[]};
  _links: {
      self: { href: string ; };
      profile: { href: string ;};
      search: { href: string ; };
  };
  page: MyPages;
}


