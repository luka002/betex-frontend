import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {BsModalService} from 'ngx-bootstrap';
import {switchMap} from 'rxjs/operators';
import {
  Html2ImageService,
  ProgressBarService,
  TicketService,
  TipService,
  UserService
} from '../../../core/services';
import {Ticket, Tip, User} from '../../../core/models';

@Component({
  selector: 'betex-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit, OnDestroy {
  tips: Tip[];
  user: User;
  loading = false;
  showSuccessAlert = false;
  showErrorAlert = false;
  tipsSub: Subscription;
  userSub: Subscription;

  constructor(private tipService: TipService,
              private userService: UserService,
              private modalService: BsModalService,
              private ticketService: TicketService,
              private html2ImageService: Html2ImageService,
              private progressBarService: ProgressBarService) {}

  ngOnInit() {
    this.userSub = this.userService.user.subscribe(user => this.user = user);
    this.tipsSub = this.tipService.historyTips.subscribe(tips => this.tips = tips);
  }

  ngOnDestroy() {
    if (this.tipsSub) this.tipsSub.unsubscribe();
    if (this.userSub) this.userSub.unsubscribe();
  }

  updateTip(tip: Tip) {
    this.progressBarService.requestStart();
    this.tipService
      .saveTip(tip)
      .pipe(
        switchMap(() => this.tipService.getPremiumHistoryTips())
      )
      .subscribe(
        () => this.progressBarService.requestDone(),
        () => this.progressBarService.requestDone()
      );
  }

  createTicket(ticket: Ticket, clearTicket: () => void) {
    this.loading = true;
    this.progressBarService.requestStart();

    this.ticketService.addTicket(ticket).subscribe(
      () => {
        clearTicket();
        this.showSuccessAlert = true;
        setTimeout(() => this.showSuccessAlert = false, 6000);
        this.loading = false;
        this.progressBarService.requestDone();
      }, () => {
        this.showErrorAlert = true;
        setTimeout(() => this.showErrorAlert = false, 6000);
        this.loading = false;
        this.progressBarService.requestDone();
      }
    );
  }
}
