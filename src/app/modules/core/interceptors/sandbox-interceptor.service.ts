import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {SandboxService} from '../services';

@Injectable()
export class SandboxInterceptorService implements HttpInterceptor {

  constructor(private sandboxService: SandboxService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!this.sandboxService.isSandbox) {
      return next.handle(req);
    }
    return next.handle(req.clone({
      url: req.url
        .replace('/api/', '/sandbox/api/')
        .replace('/login', '/sandbox/login')
        .replace('/logout', '/sandbox/logout')
    }));
  }

}
