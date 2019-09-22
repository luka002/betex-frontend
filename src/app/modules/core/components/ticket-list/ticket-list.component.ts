import {Component, EventEmitter, Input, Output, TemplateRef} from '@angular/core';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import {Router} from '@angular/router';
import {Ticket, User} from '../../models';

@Component({
  selector: 'betex-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.scss']
})
export class TicketListComponent {
  @Input() tickets: Ticket[];
  @Input() ticketOwners: User[];
  @Input() user: User;
  @Input() fetchingTicketOwner = false;
  @Output() buyTicket = new EventEmitter<string>();
  @Output() fetchTicketOwners = new EventEmitter<Ticket>();
  @Output() archiveTicket = new EventEmitter<string>();

  modalRef: BsModalRef;

  constructor(private router: Router,
              private modalService: BsModalService) {}

  onBuyTicket(id: string) {
    this.buyTicket.emit(id);
  }

  onFetchTicketOwners(ticket: Ticket) {
    this.fetchTicketOwners.emit(ticket);
  }

  onArchiveTicket(id: string) {
    this.archiveTicket.emit(id);
  }

  roundDown(number: number) {
    return Math.floor(number);
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }

  archiveTicketConfirm(id: string) {
    this.onArchiveTicket(id);
    this.modalRef.hide();
  }

  decline() {
    this.modalRef.hide();
  }

  openUserModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

}
