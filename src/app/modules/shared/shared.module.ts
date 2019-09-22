import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {VirtualScrollerModule} from 'ngx-virtual-scroller';
import {
  MatButtonModule,
  MatButtonToggleModule,
  MatCheckboxModule,
  MatExpansionModule,
  MatIconModule,
  MatMenuModule,
} from '@angular/material';
import {
  UserComponent,
  TipsTableDesktopComponent,
  TipsTableMobileComponent,
  TipsTableRowMenuComponent,
  TipsTableComponent,
  NewTicketFooterComponent,
  NewTicketHeaderComponent,
  NewTicketPreviewComponent,
  NewTicketComponent,
  GoogleLoginButtonComponent,
  FacebookLoginButtonComponent
} from './components';
import {ScaleTicketDirective} from './directives';
import {BsDropdownModule} from 'ngx-bootstrap';


@NgModule({
  declarations: [
    UserComponent,
    TipsTableDesktopComponent,
    TipsTableMobileComponent,
    TipsTableRowMenuComponent,
    TipsTableComponent,
    ScaleTicketDirective,
    NewTicketFooterComponent,
    NewTicketHeaderComponent,
    NewTicketPreviewComponent,
    NewTicketComponent,
    GoogleLoginButtonComponent,
    FacebookLoginButtonComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatIconModule,
    MatExpansionModule,
    MatButtonToggleModule,
    MatMenuModule,
    MatButtonModule,
    MatCheckboxModule,
    VirtualScrollerModule,
    BsDropdownModule.forRoot()
  ],
  exports: [
    // Modules
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    BsDropdownModule,
    // Components
    UserComponent,
    TipsTableDesktopComponent,
    TipsTableMobileComponent,
    TipsTableRowMenuComponent,
    TipsTableComponent,
    ScaleTicketDirective,
    NewTicketFooterComponent,
    NewTicketHeaderComponent,
    NewTicketPreviewComponent,
    NewTicketComponent,
    GoogleLoginButtonComponent,
    FacebookLoginButtonComponent
  ]
})
export class SharedModule { }
