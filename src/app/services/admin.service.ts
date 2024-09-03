import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "../model/User";
import {Observable} from "rxjs";
import {CreateUser} from "../model/CreateUser";
import {RoleName} from "../enum/RoleName";
import {PasswordRequest} from "../model/PasswordRequest";

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }

  getUsers(){
    return this.http.get<User[]>("http://localhost:8080/admin/retrieveAllUsers");
  }

  deleteUser(id: number):Observable<string> {
    return this.http.delete<string>(`http://localhost:8080/admin/removeUserById/${id}`);
  }

  createAdmin(user: CreateUser): Observable<User> {
    return this.http.post<User>("http://localhost:8080/admin/createAdmin", user);
  }

  createHrManager(user: CreateUser): Observable<User> {
    return this.http.post<User>("http://localhost:8080/admin/createHRManager", user);
  }

  editUser(idUser: number, role: RoleName){
    return this.http.put<User>(`http://localhost:8080/admin/updateRole/${idUser}/${role}`,{});
  }

  editAdmin(user: User): Observable<User> {
    return this.http.put<User>("http://localhost:8080/admin/updateAdmin", user);
  }

  resetPassword(passwordRequest: PasswordRequest){
    return this.http.put<User>("http://localhost:8080/admin/updatePassword", passwordRequest);
  }

  editHRManager(user: User): Observable<User> {
    return this.http.put<User>("http://localhost:8080/admin/updateHRManager", user);
  }
}
