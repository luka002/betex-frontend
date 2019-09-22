import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {httpOptions, url} from '../properties/properties';
import {switchMap} from 'rxjs/operators';
import {UserService} from './user.service';

@Injectable({
  providedIn: 'root'
})
export class MySocialAuthService {

  constructor(private http: HttpClient,
              private userService: UserService) {}

  public googleSignUp(idToken: string) {
    const data = `idToken=${idToken}`;
    return this.http
      .post(url.googleSignUp, data, httpOptions.xWwwFormUrlencoded)
      .pipe(
        switchMap(() => this.googleSignIn(idToken))
      );
  }

  public googleSignIn(idToken: string) {
    const data = `idToken=${idToken}`;
    return this.http
      .post(url.googleSignIn, data, httpOptions.xWwwFormUrlencoded)
      .pipe(
        switchMap(() => this.userService.getUserRoleAndUsername())
      );
  }

  public facebookSignUp(authToken: string) {
    const data = `authToken=${authToken}`;
    return this.http
      .post(url.facebookSignUp, data, httpOptions.xWwwFormUrlencoded)
      .pipe(
        switchMap(() => this.facebookSignIn(authToken))
      );
  }

  public facebookSignIn(authToken: string) {
    const data = `authToken=${authToken}`;
    return this.http
      .post(url.facebookSignIn, data, httpOptions.xWwwFormUrlencoded)
      .pipe(
        switchMap(() => this.userService.getUserRoleAndUsername())
      );
  }

}
