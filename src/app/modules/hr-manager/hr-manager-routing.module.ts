import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HrManagerComponent} from "./components/hr-manager/hr-manager.component";
import {DashboardComponent} from "./components/dashboard/dashboard.component";
import {MyProfileComponent} from "./components/my-profile/my-profile.component";

const routes: Routes = [
  {path:'', component: HrManagerComponent, children: [
      {path:'', redirectTo:'dashboard', pathMatch:'full'},
      {path:'dashboard', component:DashboardComponent},
      {path:'my-profile', component:MyProfileComponent},
    ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HrManagerRoutingModule { }
