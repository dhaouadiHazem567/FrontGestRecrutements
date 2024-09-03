import {Component, OnInit, ViewChild} from '@angular/core';
import {User} from "../../../../model/User";
import {NgForm} from "@angular/forms";
import {CreateUser} from "../../../../model/CreateUser";
import {Gender} from "../../../../enum/Gender";
import {RoleName} from "../../../../enum/RoleName";
import {AdminService} from "../../../../services/admin.service";
import {finalize} from "rxjs";
import {MessageService} from "primeng/api";
import {Table} from "primeng/table";
import {AuthService} from "../../../../services/auth.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit{

  @ViewChild('table') table?: Table;

  listUsers: User[] = [];
  user: CreateUser = {
    firstname: "",
    lastname: "",
    phone: "",
    gender: Gender.MALE,
    birthdate: new Date(),
    username: "",
    email: "",
    password: ""
  };
  roleName!: RoleName;
  selectedUser!: User;
  selectedUserRole!: RoleName ;
  currentUser!: User;

  filteredUsers: User[] = [];  // Liste filtrée des utilisateurs
  searchTerm: string = '';
  searchOptions = [
    { label: 'Firstname', value: 'firstname' },
    { label: 'Lastname', value: 'lastname' },
    { label: 'Email', value: 'email' },
    { label: 'Username', value: 'username' }
  ];
  selectedSearchField: string = this.searchOptions[0].value;

  constructor(private adminService: AdminService, private messageService: MessageService,
              private authService: AuthService,) {
  }

  ngOnInit() {
    this.getUsers();
    this.selectedUser = new User();
    this.selectedUserRole = RoleName.ROLE_ADMIN;
    this.currentUser = this.authService.getCurrentUser();
  }

  getUsers(){
    this.adminService.getUsers().subscribe(
      (data: User[]) => {this.listUsers = data;
        this.filteredUsers = data;},
    )
  }

  editUser(u: User) {
    this.selectedUser = u;
    this.selectedUserRole = u.roles[0].roleName;
    console.log(this.selectedUser);
  }

  deleteUser(id: number) {
    this.adminService.deleteUser(id).pipe(
      finalize(() => {this.getUsers();
        this.showSuccess('User deleted successfully.');
        })
    ).subscribe(
      () => {console.log('User deleted successfully');
      }
      ,
      error => console.error('Error deleting user', error)
    );
  }

  addUser(userForm: any) {
    if (userForm.valid) {
      if(this.roleName === RoleName.ROLE_ADMIN) {
        this.adminService.createAdmin(this.user).subscribe(
          response => {
            console.log('Admin created successfully', response);
            this.showSuccess('Admin created successfully');
            userForm.reset();
            this.user = {
              firstname: '',
              lastname: '',
              phone: '',
              gender: Gender.MALE,
              birthdate: new Date('2000-01-01'),
              username: '',
              email: '',
              password: ''
            };
            this.roleName = RoleName.ROLE_ADMIN;
            this.getUsers();
          },
          error => {
            this.showError('Username or email provided are in use');
          }
        );
      }
      else if(this.roleName === RoleName.ROLE_HR_MANGER) {
        this.adminService.createHrManager(this.user).subscribe(
          response => {
            console.log('Hr Manager created successfully', response);
            this.showSuccess('Hr Manager created successfully');
            userForm.reset();
            this.user = {
              firstname: '',
              lastname: '',
              phone: '',
              gender: Gender.MALE,
              birthdate: new Date(),
              username: '',
              email: '',
              password: ''
            };
            this.getUsers();
          },
          error => {
            this.showError('username or email provided are in use');
          }
        );
      }
    } else {
      userForm.form.markAllAsTouched();
    }
  }

  isValidEmail(email: string): boolean {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  }

  isValidPassword(password: string): boolean {
    const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{10,}$/;
    return passwordRegex.test(password);
  }

  onReset(userForm: NgForm) {
    userForm.reset();
  }

  showSuccess(content:string) {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: content });
  }

  showError(content:string) {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: content });
  }

  editUserRole(){
    this.adminService.editUser(this.selectedUser.id, this.selectedUserRole).subscribe(
      data => {
        console.log(data);
        this.getUsers();
        this.showSuccess('User role successfully updated');
      },
      error =>
        this.showError('Error')
    );
  }

  filterUsers() {
    this.filteredUsers = this.listUsers.filter(user => {
      const term = this.searchTerm.toLowerCase();
      switch (this.selectedSearchField) {
        case 'firstname':
          return user.firstname.toLowerCase().includes(term);
        case 'lastname':
          return user.lastname.toLowerCase().includes(term);
        case 'email':
          return user.email.toLowerCase().includes(term);
        case 'username':
          return user.username.toLowerCase().includes(term);
        default:
          return false;
      }
    });
  }
}
