import {Component, EventEmitter, Input, Output} from '@angular/core';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import {TipService, RoutingService} from '../../../../core/services';
import {NavRoute, Tip} from '../../../../core/models';

@Component({
  selector: 'betex-tips-table-row-menu',
  templateUrl: './tips-table-row-menu.component.html',
  styleUrls: ['./tips-table-row-menu.component.scss']
})
export class TipsTableRowMenuComponent {
  @Input() isTicketShown: boolean;
  @Input() tip: Tip;
  @Input() isHistory: boolean;
  @Output() addToTicket = new EventEmitter<Tip>();
  @Output() updateTip = new EventEmitter<Tip>();
  @Output() downloadImage = new EventEmitter<Tip>();
  @Output() fillImageData = new EventEmitter<Tip>();

  modalRef: BsModalRef;

  constructor(private modalService: BsModalService,
              private routingService: RoutingService,
              private tipService: TipService) {}

  onUpdateTip() {
    this.updateTip.emit(this.tip);
    this.modalRef.hide();
  }

  unsetResultConfirm() {
    this.tip.result = null;
    this.tip.status = null;
    this.tip.tipState.state = 'ACTIVE';
    this.onUpdateTip();
  }

  toHistoryConfirm() {
    this.tip.tipState.state = 'HISTORY';
    this.onUpdateTip();
  }

  removeConfirm() {
    this.tip.tipState.state = 'EXPIRED';
    this.onUpdateTip();
  }

  editActiveTip() {
    this.tipService.editTip.next(this.tip);
    this.routingService.navigate([NavRoute.EDIT_ACTIVE_TIP, this.tip.id]);
  }

  editNonActiveTip() {
    this.tipService.editTip.next(this.tip);
    this.routingService.navigate([NavRoute.EDIT_NON_ACTIVE_TIP, this.tip.id]);
  }

  setResult() {
    this.tipService.editTip.next(this.tip);
    this.routingService.navigate([NavRoute.SET_AS_FINISHED, this.tip.id]);
  }

  decline(): void {
    this.modalRef.hide();
  }

  onAddToTicket(tip: Tip) {
    this.addToTicket.emit(tip);
  }

  tipNotActive(tip: Tip) {
    return tip.tipState.state !== 'ACTIVE';
  }

  onDownloadImage(tip: Tip) {
    this.downloadImage.emit(tip);
  }

  onFillImageData(tip: Tip) {
    this.fillImageData.emit(tip);
  }

  openModal(template) {
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }

}
