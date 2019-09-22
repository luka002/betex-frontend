import {Component, ElementRef, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {Ticket, Tip, ImageData} from '../../../core/models';
import {Html2ImageService, ResponsiveService} from '../../../core/services';

@Component({
  selector: 'betex-tips-table',
  templateUrl: './tips-table.component.html',
  styleUrls: ['./tips-table.component.scss']
})
export class TipsTableComponent {
  @Input() tips: Tip[];
  @Input() isUserAdmin: boolean;
  @Input() isPremiumTable: boolean;
  @Input() isHistoryTable: boolean;
  @Input() showErrorAlert: boolean;
  @Input() showSuccessAlert: boolean;
  @Input() loading: boolean;
  @Output() updateTip = new EventEmitter<Tip>();
  @Output() createTicket = new EventEmitter<[Ticket, () => void]>();
  @ViewChild('imageToDownload', {static: false}) imageToDownload: ElementRef;

  ticketTips = new Set<Tip>();
  isTicketShown = false;
  imgData = new ImageData();

  constructor(private html2ImageService: Html2ImageService,
              public responsiveService: ResponsiveService) {}

  fillImageData(tip: Tip) {
    this.imgData.name = `${tip.teamHome} - ${tip.teamAway}`;
    this.imgData.body =  `${this.imgData.name}<br>Bet: ${tip.bet}<br>Odds: ${tip.odds}`;
    this.imgData.isPremium = tip.tipType.type === 'PREMIUM';
    this.imgData.win = tip.status;
  }

  getImage() {
    this.html2ImageService.html2Image(this.imageToDownload, this.imgData.name);
  }

  showTicket() {
    this.isTicketShown = true;
  }

  closeTicket() {
    this.isTicketShown = false;
  }

  clearTicket() {
    this.ticketTips = new Set();
  }

  addToTicket(tip) {
    this.ticketTips = new Set(this.ticketTips.add(tip).values());
  }

  removeTipFromTicket(tip: Tip) {
    this.ticketTips.delete(tip);
    this.ticketTips = new Set(this.ticketTips.values());
  }

  onCreateTicket = (ticket: Ticket) => {
    this.createTicket.emit([ticket, this.clearTicket.bind(this)]);
  }

}
