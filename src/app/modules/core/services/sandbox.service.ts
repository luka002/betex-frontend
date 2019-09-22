import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SandboxService {
  isSandbox: boolean;
  sandboxPrefix = '/sandbox';

  checkIfSandbox() {
    this.isSandbox = (window.location.href.includes('/sandbox'));
  }

}
