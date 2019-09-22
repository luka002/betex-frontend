import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {switchMap} from 'rxjs/operators';
import {Ticket, Tip, User} from '../../models';
import {
  TipService,
  UserService,
  ProgressBarService,
  TicketService
} from '../../services';

@Component({
  selector: 'betex-free-tips',
  templateUrl: './free-tips.component.html',
  styleUrls: ['./free-tips.component.scss']
})
export class FreeTipsComponent implements OnInit, OnDestroy {
  tips: Tip[];
  user: User;
  loading = false;
  showSuccessAlert = false;
  showErrorAlert = false;
  tipsSub: Subscription;
  userSub: Subscription;

  constructor(private tipService: TipService,
              private userService: UserService,
              private ticketService: TicketService,
              private progressBarService: ProgressBarService) {}

  ngOnInit() {
    this.userSub = this.userService.user.subscribe(user => this.user = user);
    this.tipsSub = this.tipService.freeTips.subscribe(tips => this.tips = tips);
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
        switchMap(() => this.tipService.getFreeActiveTips())
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
