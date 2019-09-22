import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {Location} from '@angular/common';
import {ActivatedRoute} from '@angular/router';
import {switchMap} from 'rxjs/operators';
import {TipService, UserService} from '../../../core/services';
import {Tip} from '../../../core/models';

@Component({
  selector: 'betex-edit-tip',
  templateUrl: './edit-tip.component.html',
  styleUrls: ['./edit-tip.component.scss']
})
export class EditTipComponent implements OnInit, OnDestroy {
  tip: Tip;
  editMode: boolean;
  useResultFields: boolean;
  saveSuccess = false;
  loading = false;
  fetchUpdatedTips: Observable<Tip[]>;
  tipSub: Subscription;

  constructor(private userService: UserService,
              private tipService: TipService,
              private location: Location,
              private route: ActivatedRoute) {}

  ngOnInit() {
    this.tipSub = this.tipService.editTip.subscribe(editTip => this.tip = editTip);
    this.editMode = this.route.snapshot.data['editMode'];
    this.useResultFields = this.route.snapshot.data['useResultFields'];

    if (this.tip.tipState.state === 'HISTORY') {
      this.fetchUpdatedTips = this.tipService.getPremiumHistoryTips();
    } else if (this.tip.tipType.type === 'PREMIUM') {
      this.fetchUpdatedTips = this.tipService.getPremiumActiveTips();
    } else {
      this.fetchUpdatedTips = this.tipService.getFreeActiveTips();
    }
  }

  ngOnDestroy() {
    if (this.tipSub) this.tipSub.unsubscribe();
  }

  saveTip(tip: Tip) {
    this.saveSuccess = false;
    this.loading = true;

    this.tipService
      .saveTip(tip)
      .pipe(
        switchMap(() => this.fetchUpdatedTips)
      )
      .subscribe(
        (_tip) => {
          this.saveSuccess = _tip != null;
          this.loading = false;
          setTimeout(
            () => this.location.back(),
            200
          );
        },
        () => {
          this.saveSuccess = false;
          this.loading = false;
        }
      );
  }
}
