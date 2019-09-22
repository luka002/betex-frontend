import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {httpOptions, url} from '../properties/properties';
import {catchError, switchMap, tap} from 'rxjs/operators';
import {Ticket, User} from '../models';

@Injectable({
  providedIn: 'root'
})
export class TicketService {
  tickets = new BehaviorSubject<Ticket[]>(null);

  constructor(private http: HttpClient) {}

  getTickets(): Observable<Ticket[]> {
    return this.http
      .get<Ticket[]>(url.ticketRest, httpOptions.json)
      .pipe(
        tap(tickets => this.tickets.next(tickets)),
        catchError(() => {
          this.tickets.next([]);
          return of([]);
        })
      );
  }

  addTicket(ticket: Ticket): Observable<Ticket> {
    return this.http.post<Ticket>(url.ticketRest, ticket, httpOptions.json);
  }

  deleteTicket(id: string): Observable<any> {
    return this.http
      .delete(url.deleteTicket(id), httpOptions.xWwwFormUrlencoded)
      .pipe(
        switchMap(() => this.getTickets())
      );
  }

  getTicketInfo(ticketId: string): Observable<User[]> {
    return this.http.get<User[]>(url.ticketInfo(ticketId), httpOptions.json);
  }

}
