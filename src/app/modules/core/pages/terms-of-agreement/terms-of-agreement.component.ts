import {Component} from '@angular/core';
import termsOfAgreement from '../../../../../assets/terms-of-agreement.json';

@Component({
  selector: 'betex-terms-of-agreement',
  template: `
    <div class="toc">
      <h2>{{termsOfAgreement.title}}</h2>
      <p>{{termsOfAgreement.p1}}</p>
      <p>{{termsOfAgreement.p2}}</p>
      <p>{{termsOfAgreement.p3}}</p>
      <p>{{termsOfAgreement.p4}}</p>
      <p>{{termsOfAgreement.p5}}</p>
      <p>{{termsOfAgreement.p6}}</p>
      <p>{{termsOfAgreement.p7}}</p>
      <p>{{termsOfAgreement.p8}}</p>
    </div>

  `,
  styles: [`
    .toc {
      margin: 0 100px;
    }
    h2 {
      margin: 35px 0;
    }
    @media (max-width: 600px) {
      .toc {
        margin: 0 20px;
      }
    }
  `]
})
export class TermsOfAgreementComponent {
  termsOfAgreement: any = termsOfAgreement;
}
