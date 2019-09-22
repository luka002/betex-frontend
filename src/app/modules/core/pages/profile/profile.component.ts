import {Component} from '@angular/core';
import {UpdatePassword} from '../../models';
import {UserService, ProgressBarService} from '../../services';

@Component({
  selector: 'betex-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  updateSuccess = false;
  loading = false;

  constructor(private userService: UserService,
              private progressBarService: ProgressBarService) {
  }

  updatePassword(updatePassword: UpdatePassword) {
    this.loading = true;
    this.progressBarService.requestStart();

    this.userService.updatePassword(updatePassword).subscribe(
      () => {
        this.loading = false;
        this.updateSuccess = true;
        this.progressBarService.requestDone();
      },
      () => {
        this.loading = false;
        this.updateSuccess = false;
        this.progressBarService.requestDone();
      }
    );
  }

}
