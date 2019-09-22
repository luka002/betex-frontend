import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {SandboxService, TipService, UserService} from '../../../core/services';
import {Tip, TipState, TipType} from '../../../core/models';
import mockTipData from '../../../../../assets/sandbox-mock-tip-data.json';

@Component({
  selector: 'betex-tip',
  templateUrl: './tip.component.html',
  styleUrls: ['./tip.component.scss']
})
export class TipComponent implements OnInit, OnChanges {
  @Input() tip: Tip;
  @Input() editMode: boolean;
  @Input() useResultFields: boolean;
  @Input() saveSuccess: boolean;
  @Input() loading: boolean;
  @Output() saveTip = new EventEmitter<Tip>();

  tipForm: FormGroup;
  submitted = false;

  constructor(private userService: UserService,
              private tipService: TipService,
              private formBuilder: FormBuilder,
              public sandboxService: SandboxService) {}

  ngOnInit() {
    this.fillForm();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['saveSuccess'] && changes['saveSuccess'].currentValue) {
      this.tipForm.reset();
    }
  }

  fillForm() {
    const type = this.tip.tipType ? this.tip.tipType.type : '';
    let status = '';
    if (this.tip.tipState && this.tip.tipState.state !== 'ACTIVE') {
      status = this.tip.status ? 'WIN' : 'LOSS';
    }

    this.tipForm = this.formBuilder.group({
      teamHome: [this.tip.teamHome, Validators.required],
      teamAway: [this.tip.teamAway, Validators.required],
      time: [this.tip.time, Validators.required],
      odds: [this.tip.odds, Validators.required],
      bet: [this.tip.bet, Validators.required],
      type: [type, Validators.required],
      league: [this.tip.league, Validators.required],
      result: [
        this.tip.result,
        this.useResultFields ? Validators.required : ''
      ],
      status: [
        status,
        this.useResultFields ? Validators.required : ''
      ]
    });
  }

  fieldChange() {
    this.submitted = false;
  }

  onFormSubmit() {
    this.submitted = true;

    this.tip.teamHome = this.tipForm.value.teamHome;
    this.tip.teamAway = this.tipForm.value.teamAway;
    this.tip.time = this.tipForm.value.time;
    this.tip.odds = this.tipForm.value.odds;
    this.tip.bet = this.tipForm.value.bet;
    this.tip.tipType = new TipType(this.tipForm.value.type);
    this.tip.league = this.tipForm.value.league;

    if (!this.editMode) {
      this.tip.tipState = new TipState(this.tip.tipState ? 'FINISHED' : 'ACTIVE');
    }
    if (this.useResultFields) {
      this.tip.result = this.tipForm.value.result;
      this.tip.status = this.tipForm.value.status === 'WIN';
    }
    this.saveTip.emit(this.tip);
  }

  setBet(bet: string) {
    this.tipForm.get('bet').setValue(bet);
  }

  fillFormWithMockData() {
    this.tipForm.get('teamHome').setValue(this.randomArrayItem(mockTipData.countries));
    this.tipForm.get('teamAway').setValue(this.randomArrayItem(mockTipData.countries));
    this.tipForm.get('league').setValue('CUP');
    this.tipForm.get('time').setValue(new Date().toISOString().substring(0, 16));
    this.tipForm.get('odds').setValue(this.randomArrayItem(mockTipData.odds));
    this.tipForm.get('bet').setValue(this.randomArrayItem(mockTipData.bet));
    this.tipForm.get('type').setValue(this.randomArrayItem(mockTipData.type));
    this.fieldChange();
  }

  private randomArrayItem(array: any[]) {
    return array[Math.floor(Math.random() * array.length)];
  }

}
