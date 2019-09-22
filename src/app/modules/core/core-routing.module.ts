import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {
  IsUserAdminGuard,
  NotLoggedInGuard,
  LoggedInGuard
} from './guards';
import {
  SettingsResolver,
  PremiumTipsResolver,
  FreeTipsResolver,
  TicketsResolver
} from './resolvers';
import {
  ProfileComponent,
  LoginComponent,
  ResetPasswordComponent,
  TermsOfAgreementComponent,
  FreeTipsComponent,
  ForgottenPasswordComponent,
  PaymentExecutionComponent,
  AboutComponent,
  PremiumTipsComponent,
  TicketsComponent,
  RegisterComponent,
  ActivateAccountComponent,
  SandboxGuideComponent
} from './pages';

const routes: Routes = [
  {
    path: 'admin',
    canActivate: [IsUserAdminGuard],
    loadChildren: () => import('../admin/admin.module').then(m => m.AdminModule)
  },
  {
    path: '',
    redirectTo: '/freeTips',
    pathMatch: 'full'
  },
  {
    path: 'freeTips',
    component: FreeTipsComponent,
    resolve: [FreeTipsResolver]
  },
  {
    path: 'premiumTips',
    component: PremiumTipsComponent,
    resolve: [PremiumTipsResolver, SettingsResolver]
  },
  {
    path: 'about',
    component: AboutComponent
  },
  {
    path: 'userLogin',
    component: LoginComponent,
    canActivate: [NotLoggedInGuard]
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [LoggedInGuard]
  },
  {
    path: 'forgottenPassword',
    component: ForgottenPasswordComponent,
    canActivate: [NotLoggedInGuard]
  },
  {
    path: 'activateAccount',
    component: ActivateAccountComponent,
    canActivate: [NotLoggedInGuard]
  },
  {
    path: 'resetPassword',
    component: ResetPasswordComponent,
    canActivate: [NotLoggedInGuard]
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [NotLoggedInGuard]
  },
  {
    path: 'paymentSuccess',
    component: PaymentExecutionComponent,
    canActivate: [LoggedInGuard]
  },
  {
    path: 'tickets',
    component: TicketsComponent,
    resolve: [TicketsResolver]
  },
  {
    path: 'termsOfAgreement',
    component: TermsOfAgreementComponent
  },
];

const sandboxRoutes: Routes = [
  {
    path: 'sandbox/admin',
    canActivate: [IsUserAdminGuard],
    loadChildren: () => import('../admin/admin.module').then(m => m.AdminModule)
  },
  {
    path: 'sandbox',
    redirectTo: '/sandbox/freeTips',
    pathMatch: 'full'
  },
  {
    path: 'sandbox/freeTips',
    component: FreeTipsComponent,
    resolve: [FreeTipsResolver]
  },
  {
    path: 'sandbox/premiumTips',
    component: PremiumTipsComponent,
    resolve: [PremiumTipsResolver, SettingsResolver]
  },
  {
    path: 'sandbox/about',
    component: AboutComponent
  },
  {
    path: 'sandbox/userLogin',
    component: LoginComponent,
    canActivate: [NotLoggedInGuard]
  },
  {
    path: 'sandbox/profile',
    component: ProfileComponent,
    canActivate: [LoggedInGuard]
  },
  {
    path: 'sandbox/forgottenPassword',
    component: ForgottenPasswordComponent,
    canActivate: [NotLoggedInGuard]
  },
  {
    path: 'sandbox/activateAccount',
    component: ActivateAccountComponent,
    canActivate: [NotLoggedInGuard]
  },
  {
    path: 'sandbox/resetPassword',
    component: ResetPasswordComponent,
    canActivate: [NotLoggedInGuard]
  },
  {
    path: 'sandbox/register',
    component: RegisterComponent,
    canActivate: [NotLoggedInGuard]
  },
  {
    path: 'sandbox/paymentSuccess',
    component: PaymentExecutionComponent,
    canActivate: [LoggedInGuard]
  },
  {
    path: 'sandbox/tickets',
    component: TicketsComponent,
    resolve: [TicketsResolver]
  },
  {
    path: 'sandbox/termsOfAgreement',
    component: TermsOfAgreementComponent
  },
  {
    path: 'sandbox/guide',
    component: SandboxGuideComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot([...routes, ...sandboxRoutes])],
  exports: [RouterModule]
})
export class CoreRoutingModule {}
