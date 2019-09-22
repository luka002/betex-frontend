import {Component} from '@angular/core';
import {UserService, ProgressBarService} from '../../services';

@Component({
  selector: 'betex-forgotten-password',
  templateUrl: './forgotten-password.component.html',
  styleUrls: ['./forgotten-password.component.scss']
})
export class ForgottenPasswordComponent {
  email = '';
  message = '';
  submitted = false;
  success = false;

  constructor(private userService: UserService,
              private progressBarService: ProgressBarService) {}

  sendResetPasswordLink() {
    this.progressBarService.requestStart();

    this.userService.forgotPassword(this.email).subscribe(
      (response: any) => {
        this.success = response.success === 'true';
        this.message = response.message;
        this.submitted = true;
        this.progressBarService.requestDone();
      },
      () => {
        this.message = 'Something went wrong. Please try again.';
        this.submitted = true;
        this.success = false;
        this.progressBarService.requestDone();
      }
    );
  }

  fieldChange() {
    this.submitted = false;
  }

}
