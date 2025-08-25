import { Component, OnDestroy, OnInit } from '@angular/core';
import { Practice } from '../services/practice.service';
import { Person } from '../interfaces/practice';
import { catchError, map, tap, throwError, Subscription, BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'app-practice',
  templateUrl: './practice.component.html',
  styleUrls: ['./practice.component.scss']
})
export class PracticeComponent implements OnInit, OnDestroy {

  userList: Person[] = [];
  userSubscription: Subscription | null = null;

  constructor(private userService: Practice) { }

  ngOnInit(): void {
    this.userSubscription = this.userService.getUsers().pipe(
      map((list: Person[]) => {
        return list.filter((person) => person.name === 'Leanne Graham')
      }),
      tap((list: Person[]) =>
        console.log(list)
      ),
      catchError((err: any) =>
        throwError(err)
      )
    )
    .subscribe(
      (data) => this.userList = data
    )

    /* BehaviourSubject */
    this.userService.person$.subscribe((data: Person[]) => {
      console.log(data);
    })
    /* END BehaviourSubject */

  }

  /* BehaviourSubject */
  callForDataClicked() {
    this.userService.callFromOtherComponentForData();
  }
  /* END BehaviourSubject */

  ngOnDestroy() {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }

}
