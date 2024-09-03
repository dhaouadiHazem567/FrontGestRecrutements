import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../../services/auth.service";
import {User} from "../../../../model/User";
import {AdminService} from "../../../../services/admin.service";
import {MessageService} from "primeng/api";
import {PasswordRequest} from "../../../../model/PasswordRequest";

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrl: './my-profile.component.css'
})
export class MyProfileComponent implements OnInit{

  user!: User;
  updateUser!: User;
  oldPassword!: string;
  newPassword!: string;
  passwordRequest!: PasswordRequest;

  constructor(private authService: AuthService, private adminService: AdminService,
              private messageService: MessageService,) {
  }

  ngOnInit() {
    this.user = this.authService.getCurrentUser();
    this.updateUser = { ...this.user };
    console.log(this.user);
  }

  editProfile() {
    this.adminService.editAdmin(this.updateUser).subscribe(
      (data: User) => {
        this.user = data;
        this.authService.setCurrentUser(this.user);
        this.showSuccess('Admin profile successfully updated');
      },
      error =>
        this.showError('Username or email provided are in use')
    );
  }

  isValidEmail(email: string): boolean {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  }

  showSuccess(content:string) {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: content });
  }

  showError(content:string) {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: content });
  }

  resetForm() {
    console.log(this.updateUser);
    console.log(this.user);
    this.updateUser = { ...this.user };
    console.log(this.updateUser);
  }

  isValidPassword(password: string): boolean {
    const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{10,}$/;
    return passwordRegex.test(password);
  }

  resetPassword(){
    this.passwordRequest = {
      idUser: this.user.id,
      oldPassword: this.oldPassword,
      newPassword: this.newPassword
    }
    this.adminService.resetPassword(this.passwordRequest).subscribe(
      (data: User) => {
        this.user = data;
        this.showSuccess('Password reset successfully');
      },
      error => {
        this.showError('Old password is incorrect');
      }
    );
  }
}
