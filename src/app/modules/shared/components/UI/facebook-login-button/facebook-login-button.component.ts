import {Component, Input} from '@angular/core';

@Component({
  selector: 'betex-facebook-login-button',
  templateUrl: './facebook-login-button.component.html',
  styleUrls: ['./facebook-login-button.component.scss']
})
export class FacebookLoginButtonComponent {
  @Input() forSignIn: boolean;
}
