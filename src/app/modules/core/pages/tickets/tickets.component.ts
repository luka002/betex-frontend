import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {NavRoute, Ticket, User} from '../../models';
import {
  TicketService,
  UserService,
  PayPalService,
  ProgressBarService,
  RoutingService
} from '../../services';

@Component({
  selector: 'betex-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.scss']
})
export class TicketsComponent implements OnInit, OnDestroy {
  tickets: Ticket[];
  user: User;
  ticketOwners: User[];
  buyTicketClicked = false;
  fetchingTicketOwners = false;
  ticketSub: Subscription;
  userSub: Subscription;

  constructor(private ticketService: TicketService,
              private userService: UserService,
              private payPalService: PayPalService,
              private progressBarService: ProgressBarService,
              private routingService: RoutingService) {}

  ngOnInit() {
    this.ticketSub = this.ticketService.tickets.subscribe(tickets => this.tickets = tickets);
    this.userSub = this.userService.user.subscribe(user => this.user = user);
  }

  ngOnDestroy() {
    if (this.ticketSub) this.ticketSub.unsubscribe();
    if (this.userSub) this.userSub.unsubscribe();
  }

  buyTicket(id: string) {
    this.progressBarService.requestStart();
    this.buyTicketClicked = true;

    this.payPalService.buyTicket('paypal', id).subscribe(
      response => {
        if (response && response['redirect_url']) {
          window.location.href = response['redirect_url'];
        } else {
          this.buyTicketClicked = false;
        }
      },
      () => {
        this.buyTicketClicked = false;
        this.progressBarService.requestDone();
      }
    );
  }

  fetchTicketOwners(ticket: Ticket) {
    this.fetchingTicketOwners = true;
    this.ticketService.getTicketInfo(ticket.id).subscribe(
      (users) => {
        this.ticketOwners = users;
        this.fetchingTicketOwners = false;
      },
      () => {
        this.fetchingTicketOwners = false;
      }
    );
  }

  archiveTicket(id: string) {
    this.progressBarService.requestStart();
    this.ticketService.deleteTicket(id).subscribe(
      () => this.progressBarService.requestDone(),
      () => this.progressBarService.requestDone()
    );
  }

  goToRegisterPage() {
    this.routingService.navigate([NavRoute.REGISTER]);
  }

}
