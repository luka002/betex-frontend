import {Component, HostListener, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {switchMap} from 'rxjs/operators';
import {NavRoute, Page, User} from '../../../core/models';
import {
  ProgressBarService,
  StatisticsService,
  UserService,
  RoutingService
} from '../../../core/services';

export enum KEY_CODE {
  RIGHT_ARROW = 39,
  LEFT_ARROW = 37
}

@Component({
  selector: 'betex-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.scss']
})
export class ManageUsersComponent implements OnInit, OnDestroy {
  userCount: number;
  page: Page;
  username = '';
  countSub: Subscription;
  pageSub: Subscription;

  constructor(private userService: UserService,
              private statisticsService: StatisticsService,
              private progressBarService: ProgressBarService,
              private routingService: RoutingService) {}

  @HostListener('window:keydown', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (event.keyCode === KEY_CODE.RIGHT_ARROW && this.page.currentPage < this.page.lastPage) {
      this.getUsers(this.page.currentPage + 1);
    } else if (event.keyCode === KEY_CODE.LEFT_ARROW && this.page.currentPage > 1) {
      this.getUsers(this.page.currentPage - 1);
    }
  }

  ngOnInit() {
    this.countSub = this.statisticsService.userCount.subscribe(count => this.userCount = count);
    this.pageSub = this.userService.usersPage.subscribe(page => this.page = page);
  }

  ngOnDestroy() {
    if (this.countSub) this.countSub.unsubscribe();
    if (this.pageSub) this.pageSub.unsubscribe();
  }

  onEditUser(user: User) {
    this.userService.editUser.next(user);
    this.routingService.navigate([NavRoute.EDIT_USER, user.id]);
  }

  onDeleteUser(user: User) {
    this.progressBarService.requestStart();

    this.userService
      .deleteUser(user)
      .pipe(
        switchMap(() => {
          let page = this.page.currentPage;
          if (this.page.users.length <= 1 && this.page.currentPage === this.page.lastPage) {
            page = this.page.currentPage - 1;
          }
          return this.userService.getUsersWithUsername(page, this.username);
        })
      )
      .subscribe(
        () => this.progressBarService.requestDone(),
        () => this.progressBarService.requestDone()
      );
  }

  getUsers(page: number) {
    this.progressBarService.requestStart();

    this.userService.getUsersWithUsername(page, this.username).subscribe(
      newPage => {
        this.page = newPage;
        this.progressBarService.requestDone();
      },
      () => this.progressBarService.requestDone()
    );
  }

  setUsername(username: string) {
    this.username = username;
  }

}
