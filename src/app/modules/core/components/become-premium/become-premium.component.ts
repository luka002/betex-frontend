import {Component, EventEmitter, Input, Output} from '@angular/core';
import {WeekendPackageSettings, User} from '../../models';

@Component({
  selector: 'betex-become-premium',
  templateUrl: './become-premium.component.html',
  styleUrls: ['./become-premium.component.scss']
})
export class BecomePremiumComponent {
  @Input() user: User;
  @Input() settings: WeekendPackageSettings;
  @Output() becomePremium = new EventEmitter<any>();
  @Output() register = new EventEmitter<any>();

  onButtonClick() {
    if (this.user.isLoggedIn) {
      this.becomePremium.emit();
    } else {
      this.register.emit();
    }
  }
}
