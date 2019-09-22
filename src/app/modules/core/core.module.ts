import {APP_INITIALIZER, NgModule} from '@angular/core';
import {CoreComponent} from './core.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {NgProgressModule} from '@ngx-progressbar/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ModalModule} from 'ngx-bootstrap';
import {SidebarModule} from 'ng-sidebar';
import {AuthServiceConfig, SocialLoginModule} from 'angularx-social-login';
import {HAMMER_GESTURE_CONFIG, HammerGestureConfig} from '@angular/platform-browser';
import {AppInitializerService} from './services';
import {socialAuthConfig} from './properties/social-login-config';
import {CoreRoutingModule} from './core-routing.module';
import {SharedModule} from '../shared/shared.module';
import {
  ExpiredSessionInterceptorService,
  SandboxInterceptorService
} from './interceptors';
import {
  BecomePremiumComponent,
  ChangePasswordComponent,
  NavbarComponent,
  SidebarComponent,
  TicketListComponent,
  SandboxBadgeComponent,
} from './components';
import {
  AboutComponent,
  ActivateAccountComponent,
  ForgottenPasswordComponent,
  FreeTipsComponent,
  LoginComponent,
  PaymentExecutionComponent,
  PremiumTipsComponent,
  ProfileComponent,
  RegisterComponent,
  ResetPasswordComponent,
  SandboxGuideComponent,
  TermsOfAgreementComponent,
  TicketsComponent
} from './pages';

export class MyHammerConfig extends HammerGestureConfig {
  overrides = <any> {
    // override hammerjs default configuration
    'pinch': {enable: false},
    'rotate': {enable: false},
    'press': {time: 200}
  };
}

export function appInit(appInitializerService: AppInitializerService) {
  return () => appInitializerService.load();
}

@NgModule({
  declarations: [
    CoreComponent,
    ActivateAccountComponent,
    BecomePremiumComponent,
    ChangePasswordComponent,
    NavbarComponent,
    SidebarComponent,
    TicketListComponent,
    AboutComponent,
    ForgottenPasswordComponent,
    FreeTipsComponent,
    LoginComponent,
    PaymentExecutionComponent,
    PremiumTipsComponent,
    ProfileComponent,
    RegisterComponent,
    ResetPasswordComponent,
    TermsOfAgreementComponent,
    TicketsComponent,
    SandboxBadgeComponent,
    SandboxGuideComponent
  ],
  imports: [
    SharedModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ModalModule.forRoot(),
    SidebarModule.forRoot(),
    NgProgressModule,
    SocialLoginModule,
    CoreRoutingModule
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: appInit,
      deps: [AppInitializerService],
      multi: true
    },
    {
      provide: HAMMER_GESTURE_CONFIG,
      useClass: MyHammerConfig,
    },
    {
      provide: AuthServiceConfig,
      useFactory: socialAuthConfig,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: SandboxInterceptorService,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ExpiredSessionInterceptorService,
      multi: true
    },
  ],
  exports: [CoreComponent]
})
export class CoreModule {}
