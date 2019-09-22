import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {WeekendPackageSettings} from '../models';
import {WeekendPackageSettingsService} from '../services';

@Injectable({
  providedIn: 'root'
})
export class SettingsResolver implements Resolve<WeekendPackageSettings> {

  constructor(private settingsService: WeekendPackageSettingsService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<WeekendPackageSettings> | Promise<WeekendPackageSettings> | WeekendPackageSettings {
    const settings = this.settingsService.settings.value;
    if (settings === null) {
      return this.settingsService.getSettings();
    } else {
      return settings;
    }
  }

}
