import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthenticationComponent } from './components/authentication/authentication.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {ToastModule} from "primeng/toast";
import {RippleModule} from "primeng/ripple";
import {MessageService} from "primeng/api";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { EnterCodeComponent } from './components/enter-code/enter-code.component';
import { NewPasswordComponent } from './components/new-password/new-password.component';
import { CreateCandidateComponent } from './components/create-candidate/create-candidate.component';
import {PasswordModule} from "primeng/password";
import {InputTextModule} from "primeng/inputtext";
import {ButtonDirective} from "primeng/button";

@NgModule({
  declarations: [
    AppComponent,
    AuthenticationComponent,
    NotFoundComponent,
    ForgotPasswordComponent,
    EnterCodeComponent,
    NewPasswordComponent,
    CreateCandidateComponent
  ],
  imports: [
    ToastModule,
    RippleModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
  ],
  providers: [MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
