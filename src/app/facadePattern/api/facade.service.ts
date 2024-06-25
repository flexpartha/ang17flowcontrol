import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class FacadeService {
  constructor(private authService: AuthService) {}

  login(username: string, password: string) {
    return this.authService.login(username, password);
  }
}
