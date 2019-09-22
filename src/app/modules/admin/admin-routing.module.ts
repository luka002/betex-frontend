import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SettingsResolver} from '../core/resolvers';
import {
  ManageUsersResolver,
  EditTipResolver,
  EditUserResolver,
  StatisticsResolver,
  HistoryResolver
} from './resolvers';
import {
  HistoryComponent,
  SettingsComponent,
  EditTipComponent,
  NewTipComponent,
  EditUserComponent,
  ManageUsersComponent,
  AddUserComponent
} from './pages';

const routes: Routes = [
  {
    path: 'history',
    component: HistoryComponent,
    resolve: [HistoryResolver],
  },
  {
    path: 'addTip',
    component: NewTipComponent,
  },
  {
    path: 'editActiveTip/:id',
    component: EditTipComponent,
    resolve: [EditTipResolver],
    data: {
      editMode: true,
      useResultFields: false
    }
  },
  {
    path: 'editNonActiveTip/:id',
    component: EditTipComponent,
    resolve: [EditTipResolver],
    data: {
      editMode: true,
      useResultFields: true
    }
  },
  {
    path: 'setAsFinished/:id',
    component: EditTipComponent,
    resolve: [EditTipResolver],
    data: {
      editMode: false,
      useResultFields: true
    }
  },
  {
    path: 'settings',
    component: SettingsComponent,
    resolve: [StatisticsResolver, SettingsResolver],
  },
  {
    path: 'addUser',
    component: AddUserComponent,
  },
  {
    path: 'editUser/:id',
    component: EditUserComponent,
    resolve: [EditUserResolver],
  },
  {
    path: 'manageUsers',
    component: ManageUsersComponent,
    resolve: [ManageUsersResolver],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}
