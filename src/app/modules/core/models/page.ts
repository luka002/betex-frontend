import {User} from './user';

export class Page {
  currentPage: number;
  previousPagesCount: number;
  nextPagesCount: number;
  lastPage: number;
  users: Array<User>;
}
