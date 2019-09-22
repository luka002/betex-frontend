import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Tip} from '../../../../core/models';

@Component({
  selector: 'betex-tips-table-desktop',
  templateUrl: './tips-table-desktop.component.html',
  styleUrls: ['./tips-table-desktop.component.scss']
})
export class TipsTableDesktopComponent {
  @Input() tips: Tip[];
  @Input() isTicketShown: boolean;
  @Input() isUserAdmin: boolean;
  @Input() isPremiumTable: boolean;
  @Input() isHistoryTable: boolean;
  @Output() addToTicket = new EventEmitter<Tip>();
  @Output() updateTip = new EventEmitter<Tip>();
  @Output() downloadImage = new EventEmitter<void>();
  @Output() fillImageData = new EventEmitter<Tip>();

  tipNotActive(tip: Tip) {
    return tip.tipState.state !== 'ACTIVE';
  }
}
