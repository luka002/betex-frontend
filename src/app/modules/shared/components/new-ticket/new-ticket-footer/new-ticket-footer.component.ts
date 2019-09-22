import {Component, EventEmitter, Input, Output, TemplateRef} from '@angular/core';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import {TicketType} from '../../../../core/models';

@Component({
  selector: 'betex-new-ticket-footer',
  templateUrl: './new-ticket-footer.component.html',
  styleUrls: ['./new-ticket-footer.component.scss']
})
export class NewTicketFooterComponent {
  @Input() selectedTab: TicketType;
  @Input() isTicketEmpty: boolean;
  @Input() totalOdds: number;
  @Input() loading: boolean;
  @Output() forInstagram = new EventEmitter<void>();
  @Output() forPurchase = new EventEmitter<number>();

  price: number;
  modalRef: BsModalRef;
  ticketType = TicketType;

  constructor(private modalService: BsModalService) {}

  validatePrice() {
    if (this.price < 0) {
      this.price = 0;
    }
  }

  onForInstagram() {
    this.forInstagram.emit();
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }

  confirm() {
    this.forPurchase.emit(this.price);
    this.modalRef.hide();
  }

  decline() {
    this.modalRef.hide();
  }

}
