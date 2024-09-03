import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {MessageService} from "primeng/api";
import {Router} from "@angular/router";
import {User} from "../../model/User";

@Component({
  selector: 'app-enter-code',
  templateUrl: './enter-code.component.html',
  styleUrl: './enter-code.component.css'
})
export class EnterCodeComponent implements OnInit{

  constructor(private authService: AuthService, private messageService: MessageService, private router: Router) {
  }

  userCode!: number;
  currentUser! : User;

  ngOnInit() {
    this.currentUser = {... this.authService.getCurrentUser()};
  }
  enterCode() {
    if(this.currentUser.code === this.userCode) {
      this.router.navigate(['/new-password']);
      this.showSuccess('Success');
    }
    else
      this.showError('Code is incorrect');
  }

  showSuccess(content:string) {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: content });
  }

  showError(content:string) {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: content });
  }
}
