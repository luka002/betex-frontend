import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Page, User} from '../../../../core/models';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';

@Component({
  selector: 'betex-manage-users-table',
  templateUrl: './manage-users-table.component.html',
  styleUrls: ['./manage-users-table.component.scss']
})
export class ManageUsersTableComponent {
  @Input() page: Page;
  @Output() editUser = new EventEmitter<User>();
  @Output() deleteUser = new EventEmitter<User>();

  modalRef: BsModalRef;

  constructor(private modalService: BsModalService) {}

  openModal(template) {
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }

  onEditUser(user: User) {
    this.editUser.emit(user);
  }

  confirmDeleteUser(user: User) {
    this.deleteUser.emit(user);
    this.modalRef.hide();
  }

  decline(): void {
    this.modalRef.hide();
  }

}
