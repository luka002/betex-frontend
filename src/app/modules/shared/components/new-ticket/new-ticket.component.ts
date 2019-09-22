import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild} from '@angular/core';
import {NewTicketPreviewComponent} from './new-ticket-preview/new-ticket-preview.component';
import {UUID} from 'angular2-uuid';
import {Ticket, TicketType, Tip} from '../../../core/models';
import {Html2ImageService} from '../../../core/services';

@Component({
  selector: 'betex-new-ticket',
  templateUrl: './new-ticket.component.html',
  styleUrls: ['./new-ticket.component.scss']
})
export class NewTicketComponent implements OnInit, OnChanges {
  @Input() tipsList: Set<Tip>;
  @Input() showSuccessAlert: boolean;
  @Input() showErrorAlert: boolean;
  @Input() loading: boolean;
  @Output() closeTicket = new EventEmitter<void>();
  @Output() clearTicket = new EventEmitter<void>();
  @Output() removeTipFormTicket = new EventEmitter<Tip>();
  @Output() createTicket = new EventEmitter<Ticket>();
  @ViewChild(NewTicketPreviewComponent, {static: false}) preview: NewTicketPreviewComponent;

  totalOdds = 1;
  winRate: number;
  showStatus = false;
  selectedTab = TicketType.REGULAR;

  constructor(private html2ImageService: Html2ImageService) {}

  ngOnInit() {
    this.calculateOddsAndWinRate();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['tipsList']) {
      this.calculateOddsAndWinRate();
    }
  }

  calculateOddsAndWinRate() {
    this.totalOdds = 1;
    this.tipsList.forEach(tip => this.totalOdds *= +tip.odds);

    let gamesWon = 0;
    this.tipsList.forEach(game => game.status ? gamesWon++ : null);
    this.winRate = gamesWon / this.tipsList.size;
  }

  onForPurchase(price: number) {
    this.createTicket.emit({
      id: UUID.UUID(),
      tips: Array.from(this.tipsList.values()),
      price: +price.toFixed(2),
      odds: +this.totalOdds.toFixed(2)
    } as Ticket);
  }

  forInstagram() {
    this.html2ImageService.html2Image(this.preview.ticket, 'ticket');
  }

  removeTip(tip: Tip) {
    this.removeTipFormTicket.emit(tip);
  }

  toggleTab(tab: TicketType) {
    this.selectedTab = tab;
  }

  toggleShowStatus() {
    this.showStatus = !this.showStatus;
  }

  clear() {
    this.clearTicket.emit();
  }

  close() {
    this.closeTicket.emit();
  }

}
