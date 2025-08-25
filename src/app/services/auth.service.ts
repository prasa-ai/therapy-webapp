import { Injectable } from '@angular/core';
import { User } from '../interfaces/users';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private routerService: Router,
    private httpClient: HttpClient) { }

  currentUser: {username: string, admin: boolean } | null = null;
  userLogin: boolean = false;
  adminLogin: boolean = false;
  userProfilesFile = "assets/data/users.json";

  getUsersList() {
    return this.httpClient.get<User[]>(this.userProfilesFile);
  }





  login(username: string, password: string): void {

    this.currentUser = null;
    this.userLogin = false;
    this.adminLogin = false;

    this.getUsersList().subscribe((data) => {
      for (let i = 0; i < data.length; i++) {
        if (data[i].username === username && data[i].password === password) {
          this.currentUser = { username: data[i].username, admin: data[i].admin };
          if (data[i].admin) {
            this.adminLogin = true;
            this.routerService.navigate(['/admin']);
          } else {
            this.userLogin = true;
            this.routerService.navigate(['/user-profile']);
          }
        }
      }
    });
  }

  isAdmin(): boolean {
      return this.adminLogin;
  }

  isUser(): boolean {
    return this.userLogin;
  }

  logout() {
    this.currentUser = null;
    this.adminLogin = false;
    this.userLogin = false;
  }
}