import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CandidateComponent} from "./components/candidate/candidate.component";
import {DashboardComponent} from "./components/dashboard/dashboard.component";
import {MyProfileComponent} from "./components/my-profile/my-profile.component";

const routes: Routes = [
  {path:'', component:CandidateComponent, children: [
      {path:'', redirectTo: 'dashboard', pathMatch: 'full'},
      {path:'dashboard', component:DashboardComponent},
      {path:'my-profile', component:MyProfileComponent},
    ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CandidateRoutingModule { }
