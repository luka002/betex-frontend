import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {httpOptions, url} from '../properties/properties';
import {catchError, tap} from 'rxjs/operators';
import {Statistics, VisitorCounter} from '../models';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {
  statistics = new BehaviorSubject<Statistics>(null);
  visitorCount = new BehaviorSubject<VisitorCounter[]>(null);
  userCount = new BehaviorSubject<number>(null);

  constructor(private http: HttpClient) {}

  getStatistics(): Observable<Statistics> {
    return this.http
      .get<Statistics>(url.getStatistics, httpOptions.json)
      .pipe(
        tap(statistics => this.statistics.next(statistics)),
        catchError(() => {
          const stats = new Statistics();
          this.statistics.next(stats);
          return of(stats);
        })
      );
  }

  increaseVisitCounter() {
    return this.http
      .get<any>(url.increaseVisitCounter, httpOptions.json)
      .pipe(
        catchError(() => of(null))
      );
  }

  getVisitorCounter(): Observable<VisitorCounter[]> {
    return this.http
      .get<VisitorCounter[]>(url.getVisitorCounter, httpOptions.json)
      .pipe(
        tap(visitors => this.visitorCount.next(visitors)),
        catchError(() => {
          this.visitorCount.next([]);
          return of([]);
        })
      );
  }

  getVisitorCounterLastDays(days: number): Observable<VisitorCounter[]> {
    return this.http
      .get<VisitorCounter[]>(url.getVisitorCounterLastDays(days), httpOptions.json)
      .pipe(
        tap(visitors => this.visitorCount.next(visitors)),
        catchError(() => {
          this.visitorCount.next([]);
          return of([]);
        })
      );
  }

  getUserCount() {
    return this.http
      .get<number>(url.getUserCount, httpOptions.json)
      .pipe(
        tap(count => this.userCount.next(count)),
        catchError(() => {
          this.userCount.next(0);
          return of(0);
        })
      );
  }

}
