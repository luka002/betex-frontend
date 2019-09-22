import {Injectable} from '@angular/core';
import {NavigationExtras, Router} from '@angular/router';
import {SandboxService} from './sandbox.service';

@Injectable({
  providedIn: 'root'
})
export class RoutingService {
  canNavigate = true;

  constructor(private router: Router,
              private sandboxService: SandboxService) {}

  navigate(commands: any[], sessionExpired = false, extras?: NavigationExtras): Promise<boolean> {
    if (this.sandboxService.isSandbox) {
      commands[0] = this.sandboxService.sandboxPrefix + commands[0];
    }
    if (this.canNavigate) {
      if (sessionExpired) {
        this.canNavigate = false;
        setTimeout(() => this.canNavigate = true , 200);
      }
      return this.router.navigate(commands, extras);
    } else {
      return Promise.resolve(true);
    }
  }
}
