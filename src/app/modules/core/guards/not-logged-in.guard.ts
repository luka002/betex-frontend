import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {RoutingService, UserService} from '../services';
import {NavRoute} from '../models';

@Injectable({
  providedIn: 'root'
})
export class NotLoggedInGuard implements CanActivate {

  constructor(private routingService: RoutingService,
              private userService: UserService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (route.queryParamMap.get('logout')) {
      return true;
    }

    const user = this.userService.user.value;
    if (user.isLoggedIn) {
      this.routingService.navigate([NavRoute.EMPTY_ROUTE]);
      return false;
    } else {
      return true;
    }
  }
}
