import {Component, Input} from '@angular/core';

@Component({
  selector: 'betex-google-login-button',
  templateUrl: './google-login-button.component.html',
  styleUrls: ['./google-login-button.component.scss']
})
export class GoogleLoginButtonComponent {
  @Input() forSignIn: boolean;
}
