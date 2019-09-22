import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {NavRoute, User} from '../models';
import {UserService, RoutingService} from '../services';

@Injectable()
export class ExpiredSessionInterceptorService implements HttpInterceptor {

  constructor(private userService: UserService,
              private routingService: RoutingService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.error && error.error.message === 'Session expired') {
          this.userService.user.next(new User());
          this.routingService.navigate([NavRoute.USER_LOGIN], true);
        }
        return throwError(error);
      })
    );
  }

}
