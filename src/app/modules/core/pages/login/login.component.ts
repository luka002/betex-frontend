import {Component} from '@angular/core';
import {AuthService, FacebookLoginProvider, GoogleLoginProvider} from 'angularx-social-login';
import {HttpErrorResponse} from '@angular/common/http';
import {RoutingService, MySocialAuthService, UserService, ProgressBarService} from '../../services';
import {NavRoute} from '../../models';

@Component({
  selector: 'betex-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  credentials = {'username': '', 'password': ''};
  loginSuccess = false;
  loginFail = false;
  loginFailMessage = '';
  NavRoute = NavRoute;

  constructor(private routingService: RoutingService,
              private userService: UserService,
              private progressBarService: ProgressBarService,
              private socialAuthService: AuthService,
              private mySocialAuthService: MySocialAuthService) {}

  signIn() {
    this.progressBarService.requestStart();

    this.userService.login(this.credentials).subscribe(
      () => {
        this.loginFail = false;
        this.loginSuccess = true;
        this.routingService.navigate([NavRoute.EMPTY_ROUTE]);
        this.progressBarService.requestDone();
      },
      (error: HttpErrorResponse) => {
        this.loginFailMessage = error.error.message;
        this.loginSuccess = false;
        this.loginFail = true;
        this.progressBarService.requestDone();
      }
    );
  }

  signInWithGoogle() {
    this.progressBarService.requestStart();

    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID)
      .then((userData: any) => {
        this.mySocialAuthService.googleSignIn(userData.idToken).subscribe(
          () => {
            this.loginFail = false;
            this.loginSuccess = true;
            this.routingService.navigate([NavRoute.EMPTY_ROUTE]);
            this.progressBarService.requestDone();
          },
          () => {
            this.loginFailMessage = 'An error occurred.';
            this.loginSuccess = false;
            this.loginFail = true;
            this.progressBarService.requestDone();
          }
        );
      })
      .catch(() => {
        this.progressBarService.requestDone();
      });
  }

  signInWithFacebook() {
    this.progressBarService.requestStart();

    this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID)
      .then((userData: any) => {
        this.mySocialAuthService.facebookSignIn(userData.authToken).subscribe(
          () => {
            this.loginFail = false;
            this.loginSuccess = true;
            this.routingService.navigate([NavRoute.EMPTY_ROUTE]);
            this.progressBarService.requestDone();
          },
          () => {
            this.loginFailMessage = 'An error occurred.';
            this.loginSuccess = false;
            this.loginFail = true;
            this.progressBarService.requestDone();
          }
        );
      })
      .catch(() => {
        this.progressBarService.requestDone();
      });
  }

  forgottenPassword(event: Event) {
    event.preventDefault();
    this.routingService.navigate([NavRoute.FORGOTTEN_PASSWORD]);
  }

}
