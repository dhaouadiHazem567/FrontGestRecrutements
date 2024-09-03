import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DashboardComponent} from "./components/dashboard/dashboard.component";
import {MyProfileComponent} from "./components/my-profile/my-profile.component";
import {AdminComponent} from "./components/admin/admin.component";

const routes: Routes = [
  {path:'', component:AdminComponent, children:[
      {path:'', redirectTo:'dashboard', pathMatch:'full'},
    {path:'dashboard', component:DashboardComponent},
      {path:'my-profile', component:MyProfileComponent},
    ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
