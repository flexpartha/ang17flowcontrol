import { Component, OnInit, ViewEncapsulation, inject } from '@angular/core';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { CustomService } from '../api/custom.service';
import { ProductsPaginator } from '../../model/product.interface';
import { BehaviorSubject, Observable, scan, switchMap, tap } from 'rxjs';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [InfiniteScrollModule, NgFor, NgIf, AsyncPipe],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class ProductComponent implements OnInit {
  private api = inject(CustomService);

  public paginator$: Observable<ProductsPaginator>;

  public loading$ = new BehaviorSubject(true);
  private page$ = new BehaviorSubject(1);

  constructor() {
    this.paginator$ = this.loadProducts$();
  }

  ngOnInit(): void {}

  private loadProducts$(): Observable<ProductsPaginator> {
    return this.page$.pipe(
      tap(() => this.loading$.next(true)),
      switchMap((page) => this.api.getProducts$(page)),
      scan(this.updatePaginator, {
        items: [],
        page: 0,
        hasMorePages: true,
      } as ProductsPaginator),
      tap(() => this.loading$.next(false))
    );
  }

  private updatePaginator(
    accumulator: ProductsPaginator,
    value: ProductsPaginator
  ): ProductsPaginator {
    if (value.page === 1) {
      return value;
    }

    accumulator.items.push(...value.items);
    accumulator.page = value.page;
    accumulator.hasMorePages = value.hasMorePages;

    return accumulator;
  }

  public loadMoreProducts(paginator: ProductsPaginator) {
    if (!paginator.hasMorePages) {
      return;
    }
    this.page$.next(paginator.page + 1);
  }
}
