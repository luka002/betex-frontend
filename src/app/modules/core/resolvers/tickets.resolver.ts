import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Ticket} from '../models';
import {TicketService} from '../services';

@Injectable({
  providedIn: 'root'
})
export class TicketsResolver implements Resolve<Ticket[]> {

  constructor(private ticketService: TicketService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Ticket[]> | Promise<Ticket[]> | Ticket[] {
    const tickets = this.ticketService.tickets.value;
    if (tickets === null) {
      return this.ticketService.getTickets();
    } else {
      return tickets;
    }
  }

}
