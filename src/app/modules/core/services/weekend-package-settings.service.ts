import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {httpOptions, url} from '../properties/properties';
import {catchError, switchMap, tap} from 'rxjs/operators';
import {WeekendPackageSettings} from '../models';

@Injectable({
  providedIn: 'root'
})
export class WeekendPackageSettingsService {
  settings = new BehaviorSubject<WeekendPackageSettings>(null);

  constructor(private http: HttpClient) {}

  getSettings(): Observable<WeekendPackageSettings> {
    return this.http
      .get<WeekendPackageSettings>(url.getSettings, httpOptions.json)
      .pipe(
        tap(settings => this.settings.next(settings)),
        catchError(() => {
          const _settings = new WeekendPackageSettings();
          this.settings.next(_settings);
          return of(_settings);
        })
      );
  }

  updateSettings(settings: WeekendPackageSettings) {
    return this.http
      .put(url.updateSettings, settings, httpOptions.json)
      .pipe(
        switchMap(() => this.getSettings())
      );
  }

}
