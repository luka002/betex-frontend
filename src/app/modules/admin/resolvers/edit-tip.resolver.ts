import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {TipService} from '../../core/services';
import {Tip} from '../../core/models';

@Injectable()
export class EditTipResolver implements Resolve<Tip> {

  constructor(private tipService: TipService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Tip> | Promise<Tip> | Tip {
    const editTip = this.tipService.editTip.value;
    if (editTip === null) {
      return this.tipService.getTip(+route.paramMap.get('id'));
    } else {
      return editTip;
    }
  }

}
