import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';
import {Observable, zip} from 'rxjs';
import {map} from 'rxjs/operators';
import {StatisticsService, UserService} from '../../core/services';
import {Page} from '../../core/models';

class UsersData {
  userCount: number;
  usersPage: Page;
}

@Injectable()
export class ManageUsersResolver implements Resolve<UsersData> {

  constructor(private statisticsService: StatisticsService,
              private userService: UserService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<UsersData> | Promise<UsersData> | UsersData {
    const userCount = this.statisticsService.userCount.value;
    const usersPage = this.userService.usersPage.value;

    if (userCount === null || usersPage === null) {
      return zip(
        this.statisticsService.getUserCount(),
        this.userService.getUsersWithUsername(1, '')
      ).pipe(
        map(([count, page]: [number, Page]) => {
          return {userCount: count, usersPage: page} as UsersData;
        })
      );
    } else {
      return {userCount: userCount, usersPage: usersPage} as UsersData;
    }
  }

}
