import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {httpOptions, url} from '../properties/properties';
import {catchError, tap} from 'rxjs/operators';
import {UserService} from './user.service';
import {Tip} from '../models';

@Injectable({
  providedIn: 'root'
})
export class TipService {
  freeTips = new BehaviorSubject<Tip[]>(null);
  premiumTips = new BehaviorSubject<Tip[]>(null);
  historyTips = new BehaviorSubject<Tip[]>(null);
  editTip = new BehaviorSubject<Tip>(null);

  constructor(private http: HttpClient,
              private userService: UserService) {}

  // region CRUD operations ========================================================================
  getTip(id: number): Observable<Tip> {
    return this.http
      .get<Tip>(url.getTip(id), httpOptions.json)
      .pipe(
        tap(tip => this.editTip.next(tip)),
        catchError(() => {
          const _tip = new Tip();
          this.editTip.next(_tip);
          return of(_tip);
        })
      );
  }

  addTip(tip: Tip): Observable<Tip> {
    return this.http.post<Tip>(url.tipRest, tip, httpOptions.json);
  }

  saveTip(tip: Tip): Observable<any> {
    return this.http.put(url.tipRest, tip, httpOptions.json);
  }

  deleteTip(id: number): Observable<any> {
    return this.http.delete(url.deleteTip(id), httpOptions.json);
  }

  // endregion =====================================================================================

  // region Fetching free and premium tips =========================================================
  getFreeActiveTips(): Observable<Tip[]> {
    return this.http
      .get<Tip[]>(url.activeFreeTips, httpOptions.json)
      .pipe(
        tap(tips => this.freeTips.next(tips)),
        catchError(() => {
          this.freeTips.next([]);
          return of([]);
        })
      );
  }

  getPremiumActiveTips(): Observable<Tip[]> {
    if (!this.userService.user.value || !this.userService.user.value.isPremiumOrAdmin) {
      this.premiumTips.next([]);
      return of([]);
    }
    return this.http
      .get<Tip[]>(url.activePremiumTips, httpOptions.json)
      .pipe(
        tap(tips => this.premiumTips.next(tips)),
        catchError(() => {
          this.premiumTips.next([]);
          return of([]);
        })
      );
  }

  getFreeHistoryTips(): Observable<Tip[]> {
    return this.http.get<Tip[]>(url.historyFreeTips, httpOptions.json);
  }

  getPremiumHistoryTips(): Observable<Tip[]> {
    if (!this.userService.user.value || !this.userService.user.value.isAdmin) {
      return of([]);
    }
    return this.http
      .get<Tip[]>(url.historyPremiumTips, httpOptions.json)
      .pipe(
        tap(tips => this.historyTips.next(tips)),
        catchError(() => {
          this.historyTips.next([]);
          return of([]);
        })
      );
  }
  // endregion =====================================================================================

}
