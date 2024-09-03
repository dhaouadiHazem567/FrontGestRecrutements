import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {MessageService} from "primeng/api";
import {Router} from "@angular/router";
import {User} from "../../model/User";

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css'
})
export class ForgotPasswordComponent implements OnInit{

  constructor(private authService: AuthService, private messageService: MessageService, private router: Router) {}

  userEmail!: string;
  currentUser!: User;
  ngOnInit() {

    this.currentUser = {... this.authService.getCurrentUser()};
  }

  isValidEmail(email: string): boolean {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  }

  onForgotPassword() {
    this.authService.onForgotPassword(this.userEmail).subscribe(
      data => {
        this.authService.setCurrentUser(data);
        this.router.navigate(['/enter-code']);
        this.showSuccess('  A reset password code has been sent to your email. Please check your inbox and enter the code to proceed.');
        },
      error => this.showError('Email is incorrect')
    )
  }

  showSuccess(content:string) {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: content });
  }

  showError(content:string) {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: content });
  }
}
