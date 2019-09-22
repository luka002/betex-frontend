import {Component, OnInit} from '@angular/core';
import {Observable, of, zip} from 'rxjs';
import {NavRoute} from './models';
import {
  ProgressBarService,
  ResponsiveService,
  RoutingService,
  StatisticsService,
  TicketService,
  TipService,
  UserService,
  WeekendPackageSettingsService,
  SandboxService
} from './services';

@Component({
  selector: 'betex-core',
  templateUrl: './core.component.html',
  styleUrls: ['./core.component.scss']
})
export class CoreComponent implements OnInit {
  opened = false;
  routeWhenSideNavClosed: NavRoute;
  sideNavStillClosing: boolean;

  constructor(private responsiveService: ResponsiveService,
              private statisticsService: StatisticsService,
              private progressBarService: ProgressBarService,
              private weekendPackageService: WeekendPackageSettingsService,
              public sandboxService: SandboxService,
              private userService: UserService,
              private tipService: TipService,
              private ticketService: TicketService,
              private routingService: RoutingService) {}

  ngOnInit(): void {
    this.statisticsService.increaseVisitCounter().subscribe();
  }

  toggleSidebar() {
    this.opened = !this.opened;
  }

  onResize() {
    this.responsiveService.onResize();
  }

  onSidebarClosed() {
    this.sideNavStillClosing = false;
    if (this.routeWhenSideNavClosed) {
      this.goToRoute(this.routeWhenSideNavClosed);
      this.routeWhenSideNavClosed = null;
    }
  }

  onChangeRoute(route: NavRoute) {
    this.sideNavStillClosing = this.opened;
    this.opened = false;
    this.progressBarService.requestStart();
    const request: Observable<any> = this.getRequest(route);

    request.subscribe(() => {
      if (!this.sideNavStillClosing) {
        this.goToRoute(route);
      } else {
        this.routeWhenSideNavClosed = route;
      }
    });
  }

  private goToRoute(route: NavRoute) {
    this.routingService
      .navigate([route])
      .then(() => {
        this.progressBarService.requestDone();
      });
  }

  private getRequest(route: NavRoute) {
    switch (route) {
      case NavRoute.FREE_TIPS:
        return this.tipService.getFreeActiveTips();

      case NavRoute.TICKETS:
        return this.ticketService.getTickets();

      case NavRoute.HISTORY:
        return this.tipService.getPremiumHistoryTips();

      case NavRoute.LOGOUT:
        return this.userService.logout();

      case NavRoute.PREMIUM_TIPS:
        return zip(
          this.tipService.getPremiumActiveTips(),
          this.weekendPackageService.getSettings()
        );
      case NavRoute.SETTINGS:
        return zip(
          this.statisticsService.getVisitorCounterLastDays(7),
          this.statisticsService.getStatistics(),
          this.weekendPackageService.getSettings()
        );
      case NavRoute.MANAGE_USERS:
        return zip(
          this.statisticsService.getUserCount(),
          this.userService.getUsersWithUsername(1, '')
        );
      case NavRoute.ABOUT:
      case NavRoute.ADD_TIP:
      case NavRoute.ADD_USER:
      case NavRoute.USER_LOGIN:
      case NavRoute.REGISTER:
      case NavRoute.PROFILE:
        return of(route);
    }
  }

}
