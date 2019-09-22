import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {FormType, User} from '../../../core/models';
import {UserService} from '../../../core/services';

@Component({
  selector: 'betex-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit, OnDestroy {
  editUser: User;
  formType = FormType.EDIT_USER;
  loading = false;
  formSubmitted = false;
  userSaved = false;
  editUserSub: Subscription;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.editUserSub = this.userService.editUser.subscribe(user => this.editUser = user);
  }

  ngOnDestroy() {
    if (this.editUserSub) this.editUserSub.unsubscribe();
  }

  saveUser(user: User) {
    this.loading = true;

    this.userService.updateUser(user).subscribe(
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
}
