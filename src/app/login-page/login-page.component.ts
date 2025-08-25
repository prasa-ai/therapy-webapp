import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  usernameUser = '';
  passwordUser = '';

  loginForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  })

  constructor(private authService: AuthService, private routerService: Router) { }

  login() {
    this.authService.login(this.loginForm.controls['username'].value || '', this.loginForm.controls['password'].value || '');
  }

  createAccount() {
    this.routerService.navigate(['/create-account']);
  }

  ngOnInit(): void {
  }

}
