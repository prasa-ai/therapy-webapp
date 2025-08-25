import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
/* import { ConfigurationService } from '../services/configuration.service'; */

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  // authService is public so its properties can be used in the template
  constructor(public authService: AuthService, private routerService: Router) { } /* FOR DARK MODE : add private configurationService: ConfigurationService between parenthesis */

  // Add these to your component class
  menuActive: boolean = false;


  /* DARK MODE
  checked: boolean = false;

  onToggle() {
    this.configurationService.setDarkMode(this.checked);
  } */

  ngOnInit(): void {}

  checkLogin() {
    if (this.authService.isAdmin()) {
      this.routerService.navigate(['/admin']);
    } else if (this.authService.isUser()) {
      this.routerService.navigate(['/user-profile']);
    } else {
      this.routerService.navigate(['/login']);
    }
  }

  logout() {
    this.authService.logout();
    this.routerService.navigate(['/home']);
  }

  toggleMenu() {
    this.menuActive = !this.menuActive;
  }

}
