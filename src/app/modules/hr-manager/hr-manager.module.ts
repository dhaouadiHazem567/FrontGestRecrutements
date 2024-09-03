import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HrManagerRoutingModule } from './hr-manager-routing.module';
import { HrManagerComponent } from './components/hr-manager/hr-manager.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MyProfileComponent } from './components/my-profile/my-profile.component';
import { HeaderComponent } from './components/header/header.component';

import {FormsModule, ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    HrManagerComponent,
    DashboardComponent,
    MyProfileComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule,
    HrManagerRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class HrManagerModule { }
