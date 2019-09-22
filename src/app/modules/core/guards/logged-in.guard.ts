import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {RoutingService, UserService} from '../services';
import {NavRoute} from '../models';

@Injectable({
  providedIn: 'root'
})
export class LoggedInGuard implements CanActivate {

  constructor(private routingService: RoutingService,
              private userService: UserService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const user = this.userService.user.value;
    if (user.isLoggedIn) {
      return true;
    } else {
      this.routingService.navigate([NavRoute.USER_LOGIN]);
      return false;
    }
  }

}
