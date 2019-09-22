import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {UserService, ProgressBarService} from '../../services';

@Component({
  selector: 'betex-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent {
  updateSuccess = false;
  loading = false;

  constructor(private route: ActivatedRoute,
              private userService: UserService,
              private progressBarService: ProgressBarService) {}

  resetPassword({password: password, confirmPassword: confirmPassword}) {
    this.loading = true;
    this.progressBarService.requestStart();
    const token = this.route.snapshot.queryParamMap.get('token');

    this.userService.resetPassword(token, password, confirmPassword).subscribe(
      () => {
        this.updateSuccess = true;
        this.loading = false;
        this.progressBarService.requestDone();
      },
      () => {
        this.updateSuccess = false;
        this.loading = false;
        this.progressBarService.requestDone();
      }
    );
  }

}
