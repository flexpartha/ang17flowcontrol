import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import {
  DummyJsonResponse,
  ProductsPaginator,
} from '../../model/product.interface';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CustomService {
  private http = inject(HttpClient);
  constructor() {}

  public getProducts$(
    page: number = 1,
    itemsPerPage: number = 16
  ): Observable<ProductsPaginator> {
    return this.http
      .get<DummyJsonResponse>('https://dummyjson.com/products', {
        params: {
          limit: itemsPerPage,
          skip: itemsPerPage * (page - 1),
        },
      })
      .pipe(
        map(
          (response) =>
            ({
              items: response.products,
              page: page,
              hasMorePages: response.skip + response.limit < response.total,
            } as ProductsPaginator)
        )
      );
  }
}
