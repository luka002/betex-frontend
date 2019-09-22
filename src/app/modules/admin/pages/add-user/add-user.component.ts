import {Component} from '@angular/core';
import {FormType, User} from '../../../core/models';
import {UserService} from '../../../core/services';

@Component({
  selector: 'betex-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent {
  newUser = new User();
  formType = FormType.ADD_USER;
  loading = false;
  formSubmitted = false;
  userSaved = false;

  constructor(private userService: UserService) {}

  saveUser(user: User) {
    this.loading = true;

    this.userService.addUser(user).subscribe(
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
