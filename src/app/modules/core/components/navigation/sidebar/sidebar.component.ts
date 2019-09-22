import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {Subscription} from 'rxjs';
import {User, NavRoute} from '../../../models';
import {UserService} from '../../../services';

@Component({
  selector: 'betex-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit, OnDestroy {
  @Output() toggleSidebar = new EventEmitter();
  @Output() changeRoute = new EventEmitter<NavRoute>();

  user: User;
  touchScreen = false;
  tabPressed: NavRoute = null;
  NavRoute = NavRoute;
  userSub: Subscription;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userSub = this.userService.user.subscribe(user => this.user = user);
  }

  ngOnDestroy() {
    if (this.userSub) this.userSub.unsubscribe();
  }

  confirmTouchScreen() {
    this.touchScreen = true;
  }

  pressed(route: NavRoute) {
    this.tabPressed = route;
  }

  unPressed() {
    this.tabPressed = null;
  }

  onChangeRoute(route: NavRoute) {
    this.tabPressed = route;
    this.changeRoute.emit(route);
    setTimeout(() => this.tabPressed = null, 200);
  }

  getTouchClasses(route: NavRoute) {
    return {
      'finger-press': this.touchScreen && this.tabPressed === route,
      'finger-un-press': this.touchScreen && this.tabPressed !== route
    };
  }
}
