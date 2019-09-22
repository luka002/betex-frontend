import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {TipService} from '../../core/services';
import {Tip} from '../../core/models';

@Injectable()
export class HistoryResolver implements Resolve<Tip[]> {

  constructor(private tipService: TipService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Tip[]> | Promise<Tip[]> | Tip[] {
    const tips = this.tipService.historyTips.value;
    if (tips === null) {
      return this.tipService.getPremiumHistoryTips();
    } else {
      return tips;
    }
  }

}
