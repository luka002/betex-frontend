import {Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {VirtualScrollerComponent} from 'ngx-virtual-scroller';
import {Tip} from '../../../../core/models';

@Component({
  selector: 'betex-tips-table-mobile',
  templateUrl: './tips-table-mobile.component.html',
  styleUrls: ['./tips-table-mobile.component.scss']
})
export class TipsTableMobileComponent implements OnInit, OnDestroy {
  @Input() tips: Tip[];
  @Input() isTicketShown: boolean;
  @Input() isUserAdmin: boolean;
  @Input() isHistoryTable: boolean;
  @Output() addToTicket = new EventEmitter<Tip>();
  @Output() updateTip = new EventEmitter<Tip>();
  @Output() downloadImage = new EventEmitter<void>();
  @Output() fillImageData = new EventEmitter<Tip>();
  @ViewChild('scroll', {static: false}) virtualScroller: VirtualScrollerComponent;

  isExpanded: Map<number, boolean> = new Map();

  ngOnInit() {
    this.fillMap(this.tips);
    window.addEventListener('scroll', this.invalidateMeasurements, true);
  }

  ngOnDestroy() {
    window.removeEventListener('scroll', this.invalidateMeasurements, true);
  }

  invalidateMeasurements = () => {
    this.virtualScroller.refresh();
  };

  onPanelTap(tip: Tip) {
    this.isExpanded.set(tip.id, !this.isExpanded.get(tip.id));
    if (this.tips.length < 10 && this.isUserAdmin) {
      const timeout = setInterval(() => this.invalidateMeasurements(), 20);
      setTimeout(() => clearInterval(timeout), 400);
    }
  }

  fillMap(tips: Tip[]) {
    tips.forEach(tip => {
      this.isExpanded.set(tip.id, false);
    });
  }

}
