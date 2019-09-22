import {Component} from '@angular/core';
import {RoutingService} from '../../services';
import {NavRoute} from '../../models';

@Component({
  selector: 'betex-sandbox-badge',
  templateUrl: './sandbox-badge.component.html',
  styleUrls: ['./sandbox-badge.component.scss']
})
export class SandboxBadgeComponent {

  constructor(private routingService: RoutingService) {}

  navigateToSandbox() {
    this.routingService.navigate([NavRoute.SANDBOX_GUIDE]);
  }

}
