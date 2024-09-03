import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {UserAuthentication} from "../model/UserAuthentication";
import {User} from "../model/User";
import {Observable} from "rxjs";
import {RoleName} from "../enum/RoleName";
import {NewPassword} from "../model/NewPassword";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userKey = 'currentUser';
  private currentUser!:User;

  constructor(private http: HttpClient) { }

  onLogin(userAuthentication: UserAuthentication): Observable<User> {
    return this.http.post<User>("http://localhost:8080/auth", userAuthentication);
  }

  setCurrentUser(user: User) {
    this.currentUser = user;
    // Convertir l'objet User en JSON et stocker dans sessionStorage
    sessionStorage.setItem(this.userKey, JSON.stringify(user));
  }

  getCurrentUser(): User{
    // Récupérer l'utilisateur depuis sessionStorage et convertir depuis JSON
    const userJson = sessionStorage.getItem(this.userKey);
    if (userJson) {
      this.currentUser = JSON.parse(userJson) as User;
    }
    return this.currentUser;
  }

  onForgotPassword(email: string){
    return this.http.put<User>("http://localhost:8080/admin/createCode",email);
  }

  updatePassword(newPassword: NewPassword){
    return this.http.put<User>("http://localhost:8080/admin/newPassword", newPassword);
  }
}
