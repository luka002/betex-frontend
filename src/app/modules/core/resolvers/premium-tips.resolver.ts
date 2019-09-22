import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Tip} from '../models';
import {TipService} from '../services';

@Injectable({
  providedIn: 'root'
})
export class PremiumTipsResolver implements Resolve<Tip[]> {

  constructor(private tipService: TipService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Tip[]> | Promise<Tip[]> | Tip[] {
    const tips = this.tipService.premiumTips.value;
    if (tips === null) {
      return this.tipService.getPremiumActiveTips();
    } else {
      return tips;
    }
  }

}
