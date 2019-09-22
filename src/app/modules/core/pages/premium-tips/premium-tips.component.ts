import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {switchMap} from 'rxjs/operators';
import {Ticket, User, Tip, WeekendPackageSettings, NavRoute} from '../../models';
import {
  PayPalService,
  WeekendPackageSettingsService,
  ProgressBarService,
  TicketService,
  TipService,
  UserService,
  RoutingService
} from '../../services';

@Component({
  selector: 'betex-premium-tips',
  templateUrl: './premium-tips.component.html',
  styleUrls: ['./premium-tips.component.scss']
})
export class PremiumTipsComponent implements OnInit, OnDestroy {
  tips: Tip[];
  user: User;
  settings: WeekendPackageSettings = new WeekendPackageSettings();
  loading = false;
  showSuccessAlert = false;
  showErrorAlert = false;
  becomePremiumClicked = false;
  tipsSub: Subscription;
  userSub: Subscription;
  settingsSub: Subscription;

  constructor(private routingService: RoutingService,
              private userService: UserService,
              private tipService: TipService,
              private payPalService: PayPalService,
              private ticketService: TicketService,
              private settingsService: WeekendPackageSettingsService,
              private progressBarService: ProgressBarService) {}

  ngOnInit() {
    this.tipsSub = this.tipService.premiumTips.subscribe(tips => this.tips = tips);
    this.userSub = this.userService.user.subscribe(user => this.user = user);
    this.settingsSub = this.settingsService.settings.subscribe(settings => this.settings = settings);
  }

  ngOnDestroy() {
    if (this.tipsSub) this.tipsSub.unsubscribe();
    if (this.userSub) this.userSub.unsubscribe();
    if (this.settingsSub) this.settingsSub.unsubscribe();
  }

  updateTip(tip: Tip) {
    this.progressBarService.requestStart();
    this.tipService
      .saveTip(tip)
      .pipe(
        switchMap(() => this.tipService.getPremiumActiveTips())
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

  becomePremium() {
    this.progressBarService.requestStart();
    this.becomePremiumClicked = true;

    this.payPalService.becomePremium('paypal').subscribe(
      response => {
        if (response && response['redirect_url']) {
          window.location.href = response['redirect_url'];
        } else {
          this.progressBarService.requestDone();
          this.becomePremiumClicked = false;
        }
      },
      () => {
        this.progressBarService.requestDone();
        this.becomePremiumClicked = false;
      }
    );
  }

  goToRegisterPage() {
    this.routingService.navigate([NavRoute.REGISTER]);
  }

}
