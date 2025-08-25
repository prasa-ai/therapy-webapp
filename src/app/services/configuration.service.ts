import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap, delay } from 'rxjs';
import { HttpClient } from '@angular/common/http';
 
@Injectable({
  providedIn: 'root'
})

export class ConfigurationService {

  //To change when I want an user to log in before using the website
  isLoggedIn: boolean = false;

  // Create an observable so it can notify the component that isLoggedIn changed
  loggedInBehavior: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  loggedIn$: Observable<boolean> = this.loggedInBehavior.asObservable();


  userIsVerified: boolean = true; //To change when I want an user to log in before using the website


  constructor(private myHttpService: HttpClient) { }

  // API call
  /* getdata(): Observable<any> {
    // Call an API to get data from the internet
      return this.myHttpService.get(this.url).pipe(
        delay(2000), // Wait 2 seconds before sending the response
        tap((data) => console.log("from tap " + data))); // Log the data
  } */

  OnLogin() {
    this.userIsVerified = true;
    this.loggedInBehavior.next(this.userIsVerified);
  }

  OnLogout() {
    this.userIsVerified = false;
    this.loggedInBehavior.next(this.userIsVerified);
  }

  /* If I want the user to login before seeing the website
  OnLogin() {
    this.isLoggedIn = true;
    this.loggedInBehavior.next(this.isLoggedIn);
  }

  OnLogout() {
    this.isLoggedIn = false;
  }
  END If I want the user to login before seeing the website*/

}
