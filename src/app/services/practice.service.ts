import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, map, Observable } from "rxjs";
import { Person } from "../interfaces/practice";

@Injectable({
    providedIn: 'root'
})

export class Practice {

    /* BehaviourSubject */
    personData: Person[] = [];
    // step 1: Create a new subject
    personSubject: BehaviorSubject<Person[]> = new BehaviorSubject<Person[]>(this.personData)
    // step 2: create a new observable from the above subject
    person$: Observable<Person[]> = this.personSubject.asObservable();
    /* END BehaviourSubject */

    usersLink = 'https://jsonplaceholder.typicode.com/users';

    constructor(private http: HttpClient) {}

    /* Observable and BehaviourSubject */
    getUsers(): Observable<Person[]> {
        return this.http.get<Person[]>(this.usersLink).pipe(
            map((data: Person[]) => {
                // you are assigning the data coming in to a local variable for future use
                this.personData = data;
                console.log('saving to subject' + this.personData);
                // then i am just returning the data from inside the map bacl to the about us page
                return this.personData;
            })
        );
    }
    /* END Observable and BehaviourSubject */

    /* BehaviourSubject */
    callFromOtherComponentForData() {
        console.log('calling callFromBlogForData.....' + JSON.stringify(this.personData))
        this.personSubject.next(this.personData);
    }
    /* END BehaviourSubject */

}