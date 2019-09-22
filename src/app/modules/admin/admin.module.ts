import {NgModule} from '@angular/core';
import {SharedModule} from '../shared/shared.module';
import {AdminRoutingModule} from './admin-routing.module';
import {
  TipComponent,
  ManageUsersTableComponent,
  ManageUsersPaginationComponent
} from './components';
import {
  AddUserComponent,
  EditTipComponent,
  EditUserComponent,
  HistoryComponent,
  ManageUsersComponent,
  NewTipComponent,
  SettingsComponent
} from './pages';
import {
  EditTipResolver,
  EditUserResolver,
  HistoryResolver,
  ManageUsersResolver,
  StatisticsResolver
} from './resolvers';

@NgModule({
  declarations: [
    TipComponent,
    AddUserComponent,
    EditTipComponent,
    EditUserComponent,
    HistoryComponent,
    ManageUsersComponent,
    NewTipComponent,
    SettingsComponent,
    ManageUsersTableComponent,
    ManageUsersPaginationComponent
  ],
  imports: [
    SharedModule,
    AdminRoutingModule
  ],
  providers: [
    EditTipResolver,
    EditUserResolver,
    HistoryResolver,
    ManageUsersResolver,
    StatisticsResolver
  ]
})
export class AdminModule { }
