import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
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
}
