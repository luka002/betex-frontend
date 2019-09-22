import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Tip} from '../models';
import {TipService} from '../services';

@Injectable({
  providedIn: 'root'
})
export class FreeTipsResolver implements Resolve<Tip[]> {

  constructor(private tipService: TipService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Tip[]> | Promise<Tip[]> | Tip[] {
    const tips = this.tipService.freeTips.value;
    if (tips === null) {
      return this.tipService.getFreeActiveTips();
    } else {
      return tips;
    }
  }

}
