import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {MessageService} from "primeng/api";
import {Router} from "@angular/router";
import {NewPassword} from "../../model/NewPassword";
import {User} from "../../model/User";

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrl: './new-password.component.css'
})
export class NewPasswordComponent implements OnInit{

  constructor(private authService: AuthService, private messageService: MessageService, private router: Router) {
  }
  newPassword!: string;
  confirmNewPassword!: string;
  currentUser!: User;

  ngOnInit() {
    this.currentUser = {... this.authService.getCurrentUser()};
  }

  updatePassword() {
    this.authService.updatePassword(new NewPassword(this.authService.getCurrentUser().id,
      this.newPassword)).subscribe(
        data => {this.authService.setCurrentUser(data);
          this.showSuccess('Password reset successfully');
          this.router.navigate(['/authentication']);
        },
      error => this.showError('Error occurred while creating new password')
    )
  }

  isValidPassword(password: string): boolean {
    const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{10,}$/;
    return passwordRegex.test(password);
  }

  showSuccess(content:string) {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: content });
  }

  showError(content:string) {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: content });
  }
}
