import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {catchError, map, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import {RoutingService, PayPalService, ProgressBarService, UserService} from '../../services';
import {NavRoute} from '../../models';

@Component({
  selector: 'betex-payment-execution',
  templateUrl: './payment-execution.component.html',
  styleUrls: ['./payment-execution.component.scss']
})
export class PaymentExecutionComponent implements OnInit {
  isTicketPayment = false;
  paymentSuccess = false;
  error = false;
  NavRoute = NavRoute;

  constructor(private route: ActivatedRoute,
              private userService: UserService,
              private payPalService: PayPalService,
              private progressBarService: ProgressBarService,
              private routingService: RoutingService) {}

  ngOnInit() {
    this.progressBarService.requestStart();
    const paymentId = this.route.snapshot.queryParamMap.get('paymentId');
    const payerId = this.route.snapshot.queryParamMap.get('PayerID');
    const ticketId = this.route.snapshot.queryParamMap.get('ticketId');
    this.isTicketPayment = ticketId !== null;

    this.payPalService
      .executePayment(paymentId, payerId, ticketId)
      .pipe(
        map(response => {
          if (response && response['status'] === 'success') {
            this.paymentSuccess = true;
          } else {
            this.error = true;
          }
          this.progressBarService.requestDone();
        }),
        catchError(() => {
          this.progressBarService.requestDone();
          this.error = true;
          return of(null);
        }),
        switchMap(() => this.userService.getUserRoleAndUsername())
      )
      .subscribe();
  }

  navigate(event: Event, route: NavRoute) {
    event.preventDefault();
    this.routingService.navigate([route]);
  }

}
