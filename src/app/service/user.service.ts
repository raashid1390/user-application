import { Injectable } from '@angular/core';
import { User } from '../model/user-model';
import { Subject, Observable } from 'rxjs';
import { userJson } from './user-data';

@Injectable({
    providedIn: 'root'
})

export class UserService {
    userDetails: Subject<Array<User>> = new Subject<Array<User>>();

    setUser(user: User) {
        userJson.push(user);
        this.userDetails.next(userJson);
    }

    getUser(): Observable<User[]> {
        return this.userDetails.asObservable();
    }
}