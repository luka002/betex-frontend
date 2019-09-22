import {Component} from '@angular/core';
import {AuthService, FacebookLoginProvider, GoogleLoginProvider} from 'angularx-social-login';
import {User, FormType, NavRoute} from '../../models';
import {RoutingService, UserService, MySocialAuthService} from '../../services';

@Component({
  selector: 'betex-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  newUser = new User();
  formType = FormType.REGISTER;
  loading = false;
  formSubmitted = false;
  socialAuthError = false;
  socialAuthFailMessage: string;
  userSaved = false;

  constructor(private routingService: RoutingService,
              private userService: UserService,
              private socialAuthService: AuthService,
              private mySocialAuthService: MySocialAuthService) {}

  registerUser(user: User) {
    this.loading = true;

    this.userService.register(user).subscribe(
      () => {
        this.userSaved = true;
        this.formSubmitted = true;
        this.loading = false;
      },
      () => {
        this.userSaved = false;
        this.formSubmitted = true;
        this.loading = false;
      }
    );
  }

  onSignUpWithGoogle() {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID)
      .then((userData: any) => {
        this.mySocialAuthService.googleSignUp(userData.idToken).subscribe(
          () => this.routingService.navigate([NavRoute.FREE_TIPS]),
          () => {
            this.socialAuthError = true;
            this.socialAuthFailMessage = 'You have already registered with this email or your email' +
              ' has not been verified.';
          }
        );
      })
      .catch(() => {
        this.socialAuthError = true;
        this.socialAuthFailMessage = 'An error occurred, please try again.';
      });
  }

  onSignUpWithFacebook() {
    this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID)
      .then((userData: any) => {
        this.mySocialAuthService.facebookSignUp(userData.authToken).subscribe(
          () => this.routingService.navigate([NavRoute.FREE_TIPS]),
          () => {
            this.socialAuthError = true;
            this.socialAuthFailMessage = 'You have already registered with this email or your email' +
              ' has not been verified.';
          }
        );
      })
      .catch(() => {
        this.socialAuthError = true;
        this.socialAuthFailMessage = 'An error occurred, please try again.';
      });
  }

}
