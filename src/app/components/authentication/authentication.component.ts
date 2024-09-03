import {Component, OnInit} from '@angular/core';
import {UserAuthentication} from "../../model/UserAuthentication";
import {AuthService} from "../../services/auth.service";
import {MessageService} from "primeng/api";
import {RoleName} from "../../enum/RoleName";
import {Router} from "@angular/router";
import {User} from "../../model/User";

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrl: './authentication.component.css'
})
export class AuthenticationComponent implements OnInit{

  userAuthentication: UserAuthentication = new UserAuthentication();
  authenticatedUser!: User;
  constructor(private authService: AuthService, private messageService: MessageService,
              private router: Router) {}

  ngOnInit() {
  }

  onLogin() {
    this.authService.onLogin(this.userAuthentication).subscribe(
      data => {
        this.authenticatedUser = data;
        this.authService.setCurrentUser(this.authenticatedUser);
        this.showSuccess('Authentication successfully logged in');
        this.userAuthentication = {
          username :'',
          password: ''
        }
        if(data.roles[0].roleName === RoleName.ROLE_ADMIN)
          this.router.navigate(['/admin']);
        else if(data.roles[0].roleName === RoleName.ROLE_HR_MANGER)
          this.router.navigate(['/hrManager']);
        else if(data.roles[0].roleName === RoleName.ROLE_CANDIDATE)
          this.router.navigate(['/candidate']);

        console.log(this.authService.getCurrentUser());
      },
      error => {console.log(error);
        this.showError("Username or password is incorrect.");
      }
    );
  }

  showSuccess(content:string) {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: content });
  }

  showError(content:string) {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: content });
  }
}
