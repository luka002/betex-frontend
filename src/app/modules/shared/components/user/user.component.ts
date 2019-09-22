import {Component, EventEmitter, Input, OnInit, Output, TemplateRef} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import termsOfAgreement from '../../../../../assets/terms-of-agreement.json';
import {FormType, User, UserRole} from '../../../core/models';
import {mustMatch, EmailValidator, UsernameValidator} from '../../../core/validators';

@Component({
  selector: 'betex-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  @Input() user: User;
  @Input() formType: FormType;
  @Input() loading: boolean;
  @Input() formSubmitted: boolean;
  @Input() userSaved: boolean;
  @Input() socialAuthError: boolean;
  @Input() socialAuthFailMessage: string;
  @Output() saveUser = new EventEmitter<User>();
  @Output() signUpWithGoogle = new EventEmitter<void>();
  @Output() signUpWithFacebook = new EventEmitter<void>();

  termsOfAgreement: any = termsOfAgreement;
  modalRef: BsModalRef;
  userForm: FormGroup;
  FormType = FormType;

  constructor(private formBuilder: FormBuilder,
              private usernameValidator: UsernameValidator,
              private emailValidator: EmailValidator,
              private modalService: BsModalService) {}

  ngOnInit() {
    this.fillForm();
  }

  fillForm() {
    this.userForm = this.formBuilder.group({
      username: [
        {value: this.user.username, disabled: this.user.socialName},
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(30),
          Validators.pattern('^[a-zA-Z\\d-_]+$')
        ],
        this.formType === FormType.EDIT_USER ? '' : this.usernameValidator.uniqueUsername.bind(this.usernameValidator)
      ],
      password: [
        {value: '', disabled: this.user.socialName},
        [
          Validators.required ,
          Validators.minLength(8)
        ]
      ],
      confirmPassword: [
        {value: '', disabled: this.user.socialName},
        [
          Validators.required,
          // compareValidator('password')
        ]
      ],
      doValidatePassword: [
        {value: !this.user.socialName, disabled: this.user.socialName},
      ],
      email: [
        {value: this.user.email, disabled: this.user.socialName},
        [
          Validators.required,
          Validators.email
        ],
        this.formType === FormType.EDIT_USER ? '' : this.emailValidator.uniqueEmail.bind(this.emailValidator)
      ],
      termsOfAgreement: [
        false,
        this.formType === FormType.REGISTER ? Validators.requiredTrue : ''
      ],
      role: [
        this.user.userRole === undefined ? '' : this.user.userRole.role,
        this.formType !== FormType.REGISTER ? Validators.required : ''
      ],
      enabled: [
        this.user.enabled,
        this.formType !== FormType.REGISTER ? Validators.required : ''
      ],
      socialName: [
        this.user.socialName,
        this.user.socialName ? Validators.required : ''
      ],
      lastPaymentTime: [this.user.lastPaymentTime],
      premiumExpiryTime: [this.user.premiumExpiryTime]
    },
    {
      validators: mustMatch('password', 'confirmPassword')
    });
  }

  isInvalidAndDirty(fieldName: string) {
    const field = this.userForm.get(fieldName);
    return !field.valid && field.touched;
  }

  hasError(fieldName: string, error: string) {
    const field = this.userForm.get(fieldName);
    return field.touched && field.hasError(error);
  }

  onSaveUser() {
    this.user.username = this.userForm.getRawValue().username;
    this.user.password = this.userForm.value.password;
    this.user.confirmPassword = this.userForm.value.confirmPassword;
    this.user.email = this.userForm.getRawValue().email;

    if (this.formType !== FormType.REGISTER) {
      this.user.doValidatePassword = this.userForm.getRawValue().doValidatePassword;
      this.user.userRole = new UserRole(this.userForm.value.role);
      this.user.enabled = this.userForm.value.enabled;
      this.user.lastPaymentTime = this.userForm.value.lastPaymentTime;
      this.user.premiumExpiryTime = this.userForm.value.premiumExpiryTime;
      this.user.socialName = this.userForm.value.socialName;
    }
    this.saveUser.emit(this.user);
  }

  checkBoxClicked() {
    if (this.userForm.value.doValidatePassword) {
      this.userForm.get('password').enable();
      this.userForm.get('password').markAsTouched();
      this.userForm.get('confirmPassword').enable();
      this.userForm.get('confirmPassword').markAsTouched();
    } else {
      this.userForm.get('password').disable();
      this.userForm.get('password').markAsUntouched();
      this.userForm.get('confirmPassword').disable();
      this.userForm.get('confirmPassword').markAsUntouched();
    }
  }

  openModal(event: Event, template: TemplateRef<any>) {
    event.preventDefault();
    this.modalRef = this.modalService.show(template);
  }

  onSignUpWithGoogle() {
    this.signUpWithGoogle.emit();
  }

  onSignUpWithFacebook() {
    this.signUpWithFacebook.emit();
  }

}
