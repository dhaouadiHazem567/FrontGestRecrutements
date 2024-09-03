import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CandidateRoutingModule } from './candidate-routing.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MyProfileComponent } from './components/my-profile/my-profile.component';
import { CandidateComponent } from './components/candidate/candidate.component';
import { HeaderComponent } from './components/header/header.component';
import {FormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    DashboardComponent,
    MyProfileComponent,
    CandidateComponent,
    HeaderComponent
  ],
    imports: [
        CommonModule,
        CandidateRoutingModule,
        FormsModule
    ]
})
export class CandidateModule { }
