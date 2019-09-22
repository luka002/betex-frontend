import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {NavRoute} from '../models';
import {UserService, RoutingService} from '../services';

@Injectable({
  providedIn: 'root'
})
export class IsUserAdminGuard implements CanActivate {

  constructor(private routingService: RoutingService,
              private userService: UserService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const user = this.userService.user.value;
    if (user.isAdmin) {
      return true;
    } else {
      this.routingService.navigate([NavRoute.EMPTY_ROUTE]);
      return false;
    }
  }

}
