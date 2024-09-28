import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { ProductsService } from '../../products/api/products.service';
import { BehaviorSubject, forkJoin } from 'rxjs';
import { User } from '../../model/user.interface';
import { Products } from '../../model/products.interface';

@Injectable({
  providedIn: 'root',
})
export class FacadeService {
  private usersBS$ = new BehaviorSubject<User[]>([]);
  private productsBS$ = new BehaviorSubject<Products[]>([]);

  users$ = this.usersBS$.asObservable();
  products$ = this.productsBS$.asObservable();

  constructor(
    private authService: AuthService,
    private productService: ProductsService
  ) {}

  login(username: string, password: string) {
    return this.authService.login(username, password);
  }

  getAuthuserAndProducts() {
    return forkJoin([
      this.authService.getAllUser(),
      this.productService.getAllProducts(),
    ]).subscribe(([users, products]) => {
      this.usersBS$.next(users);
      this.productsBS$.next(products);
      console.log('USERS::--', users);
      console.log('PRODUCTS::--', products);
    });
  }
}
