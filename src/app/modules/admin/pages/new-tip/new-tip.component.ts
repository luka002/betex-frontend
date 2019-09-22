import {Component} from '@angular/core';
import {ProgressBarService, TipService, UserService} from '../../../core/services';
import {Tip} from '../../../core/models';

@Component({
  selector: 'betex-new-tip',
  templateUrl: './new-tip.component.html',
  styleUrls: ['./new-tip.component.scss']
})
export class NewTipComponent {
  tip = new Tip();
  saveSuccess = false;
  loading = false;

  constructor(private userService: UserService,
              private tipService: TipService,
              private progressBarService: ProgressBarService) {}

  saveTip(tip: Tip) {
    this.saveSuccess = false;
    this.loading = true;
    this.progressBarService.requestStart();

    this.tipService.saveTip(tip).subscribe(
      (_tip) => {
        this.saveSuccess = _tip != null;
        this.loading = false;
        this.tip = new Tip();
        this.progressBarService.requestDone();
      },
      () => {
        this.saveSuccess = false;
        this.loading = false;
        this.progressBarService.requestDone();
      }
    );
  }
}
