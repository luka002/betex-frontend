import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UpdatePassword} from '../../models';
import {mustMatch} from '../../validators';

@Component({
  selector: 'betex-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit, OnChanges {
  @Input() updateSuccess = false;
  @Input() loading: boolean;
  @Input() updatePassword: boolean;
  @Output() savePassword = new EventEmitter<UpdatePassword>();

  passwordForm: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.fillForm();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['updateSuccess'] && changes['updateSuccess'].currentValue) {
      this.passwordForm.reset();
    }
  }

  fillForm() {
    this.passwordForm = this.formBuilder.group({
      currentPassword: ['',
        this.updatePassword ? [
          Validators.required,
          Validators.minLength(8)
        ] : ''
      ],
      password: ['',
        [
          Validators.required,
          Validators.minLength(8)
        ]
      ],
      confirmPassword: ['', Validators.required]
    },
    {
      validators: mustMatch('password', 'confirmPassword')
    });
  }

  fieldChange() {
    this.submitted = false;
  }

  onSavePassword() {
    this.submitted = true;
    this.savePassword.emit({
      currentPassword: this.passwordForm.value.currentPassword,
      password: this.passwordForm.value.password,
      confirmPassword: this.passwordForm.value.confirmPassword
    });
  }

  isInvalidAndDirty(fieldName: string) {
    const field = this.passwordForm.get(fieldName);
    return !field.valid && field.touched;
  }

  hasError(fieldName: string, error: string) {
    const field = this.passwordForm.get(fieldName);
    return field.touched && field.hasError(error);
  }

}
