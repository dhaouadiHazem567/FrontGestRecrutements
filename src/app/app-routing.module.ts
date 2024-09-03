import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AuthenticationComponent} from "./components/authentication/authentication.component";
import {NotFoundComponent} from "./components/not-found/not-found.component";
import {ForgotPasswordComponent} from "./components/forgot-password/forgot-password.component";
import {EnterCodeComponent} from "./components/enter-code/enter-code.component";
import {NewPasswordComponent} from "./components/new-password/new-password.component";
import {CreateCandidateComponent} from "./components/create-candidate/create-candidate.component";

const routes: Routes = [
  {path:'authentication', component: AuthenticationComponent},
  {path: 'forgot-password', component: ForgotPasswordComponent},
  {path:'enter-code', component: EnterCodeComponent},
  {path: 'new-password', component: NewPasswordComponent},
  {path:'create-candidate', component: CreateCandidateComponent},
  {path:'admin',loadChildren: () => import('./modules/admin/admin.module').then(
    m => m.AdminModule
    )},
  {path:'hrManager', loadChildren: () => import('./modules/hr-manager/hr-manager.module').then(
    m => m.HrManagerModule
    )},
  {
    path: 'candidate', loadChildren: () => import('./modules/candidate/candidate.module').then(
      m => m.CandidateModule
    )
  },
  {path:'', redirectTo: 'authentication', pathMatch: 'full'},
  {path:'**', component: NotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
