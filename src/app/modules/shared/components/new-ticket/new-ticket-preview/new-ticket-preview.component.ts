import {Component, ElementRef, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {TicketType, Tip} from '../../../../core/models';

@Component({
  selector: 'betex-new-ticket-preview',
  templateUrl: './new-ticket-preview.component.html',
  styleUrls: ['./new-ticket-preview.component.scss']
})
export class NewTicketPreviewComponent {
  @Input() tipsList: Set<Tip>;
  @Input() selectedTab: TicketType;
  @Input() totalOdds: number;
  @Input() winRate: number;
  @Input() showStatus: boolean;
  @Output() removeTip: EventEmitter<Tip> = new EventEmitter();
  @ViewChild('ticket', {static: false}) ticket: ElementRef;

  date = new Date();
  ticketType = TicketType;

  onRemoveTip(tip: Tip) {
    this.removeTip.emit(tip);
  }

}
