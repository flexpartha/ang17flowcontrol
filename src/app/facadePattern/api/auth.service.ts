import { Injectable } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { User } from '../../model/user.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userInfo!: User;

  constructor() {}

  login(username: string, pass: string) {
    // username = this.userInfo.username;
    //pass = this.userInfo.password;

    console.log('USERNAME:', username, 'password::--', pass);
  }

  getAllUser() {
    return of<User[]>([
      {
        id: 1,
        username: 'flexpartha',
        password: '1234',
        firstName: 'Partha',
        lastName: 'chakraborty',
      },
      {
        id: 2,
        username: 'jaita',
        password: '12345',
        firstName: 'Jaita',
        lastName: 'chakraborty',
      },
    ]);
  }
}
