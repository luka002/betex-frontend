import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {User} from '../../core/models';
import {UserService} from '../../core/services';

@Injectable()
export class EditUserResolver implements Resolve<User> {

  constructor(private userService: UserService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<User> | Promise<User> | User {
    const editUser = this.userService.editUser.value;
    if (editUser === null) {
      return this.userService.getUser(+route.paramMap.get('id'));
    } else {
      return editUser;
    }
  }

}
