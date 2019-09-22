import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {Subscription} from 'rxjs';
import {User, NavRoute} from '../../../models';
import {UserService, ResponsiveService} from '../../../services';

@Component({
  selector: 'betex-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {
  @Output() toggleSidebar = new EventEmitter<void>();
  @Output() changeRoute = new EventEmitter<NavRoute>();
  NavRoute = NavRoute;
  user: User;
  subscription: Subscription;

  constructor(private userService: UserService,
              public responsiveService: ResponsiveService) {}

  ngOnInit() {
    this.subscription = this.userService.user.subscribe(user => this.user = user);
  }

  ngOnDestroy() {
    if (this.subscription) this.subscription.unsubscribe();
  }
}
