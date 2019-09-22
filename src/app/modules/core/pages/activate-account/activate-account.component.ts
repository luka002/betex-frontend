import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {UserService, ProgressBarService} from '../../services';

@Component({
  selector: 'betex-activate-account',
  templateUrl: './activate-account.component.html',
  styleUrls: ['./activate-account.component.scss']
})
export class ActivateAccountComponent implements OnInit {
  loading = true;
  accountActive = false;

  constructor(private route: ActivatedRoute,
              private userService: UserService,
              private progressBarService: ProgressBarService) {}

  ngOnInit() {
    this.progressBarService.requestStart();
    const token = this.route.snapshot.queryParamMap.get('token');

    this.userService.activateUserAccount(token).subscribe(
      () => {
        this.accountActive = true;
        this.loading = false;
        this.progressBarService.requestDone();
      },
      () => {
        this.loading = false;
        this.progressBarService.requestDone();
      });
  }

}
