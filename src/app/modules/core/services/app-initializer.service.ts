import {Injectable} from '@angular/core';
import {UserService} from './user.service';
import {User} from '../models';
import {SandboxService} from './sandbox.service';

@Injectable({
  providedIn: 'root'
})
export class AppInitializerService {

  constructor(private userService: UserService,
              private sandboxService: SandboxService) {
    sandboxService.checkIfSandbox();
  }

  load(): Promise<User> {
    return new Promise((resolve, reject) => {
      this.userService
        .getUserRoleAndUsername()
        .subscribe(
          user => resolve(user),
          error => resolve(error)
        );
    });
  }

}
