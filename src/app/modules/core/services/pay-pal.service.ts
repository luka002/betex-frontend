import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {httpOptions, url} from '../properties/properties';

@Injectable({
  providedIn: 'root'
})
export class PayPalService {

  constructor(private http: HttpClient) {}

  becomePremium(method: string) {
    const data = `method=${method}`;
    return this.http.post(url.becomePremium, data, httpOptions.xWwwFormUrlencoded);
  }

  buyTicket(method: string, ticketId: string) {
    const data = `method=${method}&ticketId=${ticketId}`;
    return this.http.post(url.buyTicket, data, httpOptions.xWwwFormUrlencoded);
  }

  executePayment(paymentId: string, payerId: string, ticketId: string) {
    const data = `paymentId=${paymentId}&payerId=${payerId}${ticketId ? `&ticketId=${ticketId}` : ''}`;
    const _url = ticketId ? url.executeTicketPayment : url.executePremiumPayment;
    return this.http.post(_url, data, httpOptions.xWwwFormUrlencoded);
  }

}
