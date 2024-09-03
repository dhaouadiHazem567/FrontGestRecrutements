import { Component } from '@angular/core';
import {User} from "../../../../model/User";
import {AuthService} from "../../../../services/auth.service";
import {MessageService} from "primeng/api";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  constructor(private authService: AuthService, private messageService: MessageService,
              private router: Router) {}

  onLogOut() {
    this.authService.setCurrentUser(new User());
    this.showSuccess('Logged out');
    this.router.navigate(['/authentication']);
  }

  showSuccess(content:string) {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: content });
  }

  showError(content:string) {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: content });
  }
}
