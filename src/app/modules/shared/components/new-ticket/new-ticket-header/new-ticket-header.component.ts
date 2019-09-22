import {Component, EventEmitter, Input, Output} from '@angular/core';
import {MatButtonToggleChange} from '@angular/material';
import {TicketType} from '../../../../core/models';

@Component({
  selector: 'betex-new-ticket-header',
  templateUrl: './new-ticket-header.component.html',
  styleUrls: ['./new-ticket-header.component.scss']
})
export class NewTicketHeaderComponent {
  @Input() selectedTab: TicketType;
  @Output() closeTicket = new EventEmitter<void>();
  @Output() clearTicket = new EventEmitter<void>();
  @Output() toggleStatus = new EventEmitter<void>();
  @Output() toggleTab = new EventEmitter<TicketType>();
  ticketType = TicketType;

  onClear() {
    this.clearTicket.emit();
  }

  onClose() {
    this.closeTicket.emit();
  }

  onToggleStatus() {
    this.toggleStatus.emit();
  }

  onToggleChange(button: MatButtonToggleChange) {
    this.toggleTab.emit(button.value);
  }

}
