import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';
import {
  ProgressBarService,
  StatisticsService,
  WeekendPackageSettingsService
} from '../../../core/services';
import {
  Statistics,
  VisitorCounter,
  WeekendPackageSettings
} from '../../../core/models';

@Component({
  selector: 'betex-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit, OnDestroy {
  weeklySettings: WeekendPackageSettings;
  statistics: Statistics;
  visitorCounter: VisitorCounter[];
  form: FormGroup;
  settingsUpdated = false;
  submitted = false;
  loading = false;
  showAllDays = false;
  weekSub: Subscription;
  statSub: Subscription;
  visitSub: Subscription;

  constructor(private weeklySettingsService: WeekendPackageSettingsService,
              private statisticsService: StatisticsService,
              private formBuilder: FormBuilder,
              private progressBarService: ProgressBarService) {}

  ngOnInit() {
    this.weekSub = this.weeklySettingsService.settings.subscribe(set => {
      this.weeklySettings = set;
      this.fillForm();
      this.showAllDays = false;
    });
    this.statSub = this.statisticsService.statistics.subscribe(stats => this.statistics = stats);
    this.visitSub = this.statisticsService.visitorCount.subscribe(visits => this.visitorCounter = visits);
    this.fillForm();
  }

  ngOnDestroy() {
    if (this.weekSub) this.weekSub.unsubscribe();
    if (this.statSub) this.statSub.unsubscribe();
    if (this.visitSub) this.visitSub.unsubscribe();
  }

  fillForm() {
    this.form = this.formBuilder.group({
      buyingEnabled: [this.weeklySettings.buyingEnabled, Validators.required],
      buyingEnabledMessage: [this.weeklySettings.buyingEnabledMessage, Validators.required],
      buyingDisabledMessage: [this.weeklySettings.buyingDisabledMessage, Validators.required],
      weekendPrice: [this.weeklySettings.weekendPrice, Validators.required]
    });
  }

  fieldChange() {
    this.submitted = false;
  }

  onFormSubmit() {
    this.loading = true;
    this.progressBarService.requestStart();

    this.weeklySettings.buyingEnabled = this.form.value.buyingEnabled;
    this.weeklySettings.buyingEnabledMessage = this.form.value.buyingEnabledMessage;
    this.weeklySettings.buyingDisabledMessage = this.form.value.buyingDisabledMessage;
    this.weeklySettings.weekendPrice = this.form.value.weekendPrice;

    this.weeklySettingsService.updateSettings(this.weeklySettings).subscribe(
      () => {
        this.settingsUpdated = true;
        this.submitted = true;
        this.loading = false;
        this.progressBarService.requestDone();
      },
      () => {
        this.settingsUpdated = false;
        this.submitted = true;
        this.loading = false;
        this.progressBarService.requestDone();
      }
    );
  }

  getAllDays() {
    this.progressBarService.requestStart();

    this.statisticsService.getVisitorCounter().subscribe(
      () => {
        this.showAllDays = true;
        this.progressBarService.requestDone();
      },
      () => {
        this.showAllDays = true;
        this.progressBarService.requestDone();
      }
    );
  }
}
