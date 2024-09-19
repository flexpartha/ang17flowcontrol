import { TestBed } from '@angular/core/testing';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { DomSanitizer } from '@angular/platform-browser';
import { CookieService } from 'ngx-cookie-service';
import { JSonApiService } from './json-api.service';
import { UserDetail } from './model/response.interface';
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';

describe('JSonApiService', () => {
  let service: JSonApiService;

  beforeEach(() => {
    const domSanitizerStub = () => ({ bypassSecurityTrustHtml: () => ({}) });
    const cookieServiceStub = () => ({
      set: (name: any, value: any) => ({}),
      get: (name: any) => ({}),
    });
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        JSonApiService,
        { provide: DomSanitizer, useFactory: domSanitizerStub },
        { provide: CookieService, useFactory: cookieServiceStub },
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
      ],
    });
    service = TestBed.inject(JSonApiService);
  });

  it('can load instance', () => {
    expect(service).toBeTruthy();
  });

  it(`pageNum has default value`, () => {
    expect(service.pageNum).toEqual(1);
  });

  describe('getNextPage', () => {
    it('makes expected calls', () => {
      const mockResponse: UserDetail[] = [
        {
          userId: 2,
          id: 11,
          title: 'et ea vero quia laudantium autem',
          body: 'delectus reiciendis molestiae occaecati non minima eveniet qui voluptatibus\naccusamus in eum beatae sit\nvel qui neque voluptates ut commodi qui incidunt\nut animi commodi',
        },
        {
          userId: 2,
          id: 12,
          title: 'in quibusdam tempore odit est dolorem',
          body: 'itaque id aut magnam\npraesentium quia et ea odit et ea voluptas et\nsapiente quia nihil amet occaecati quia id voluptatem\nincidunt ea est distinctio odio',
        },
      ];
      const httpTestingController = TestBed.inject(HttpTestingController);
      service.getNextPage().subscribe((res) => {
        expect(res).toEqual(mockResponse);
      });
      const req = httpTestingController.expectOne(
        'https://jsonplaceholder.typicode.com/posts?userId=2'
      );
      expect(req.request.method).toEqual('GET');
      req.flush(mockResponse);
      httpTestingController.verify();
    });
  });

  describe('getPreviousPage', () => {
    it('makes expected calls', () => {
      const mockResponse: UserDetail[] = [
        {
          userId: 2,
          id: 11,
          title: 'et ea vero quia laudantium autem',
          body: 'delectus reiciendis molestiae occaecati non minima eveniet qui voluptatibus\naccusamus in eum beatae sit\nvel qui neque voluptates ut commodi qui incidunt\nut animi commodi',
        },
        {
          userId: 2,
          id: 12,
          title: 'in quibusdam tempore odit est dolorem',
          body: 'itaque id aut magnam\npraesentium quia et ea odit et ea voluptas et\nsapiente quia nihil amet occaecati quia id voluptatem\nincidunt ea est distinctio odio',
        },
      ];
      const httpTestingController = TestBed.inject(HttpTestingController);
      service.getPreviousPage().subscribe((res) => {
        expect(res).toEqual(mockResponse);
      });
      const req = httpTestingController.expectOne(
        'https://jsonplaceholder.typicode.com/posts?userId=0'
      );
      expect(req.request.method).toEqual('GET');
      req.flush(mockResponse);
      httpTestingController.verify();
    });
  });

  describe('getJsonValue2', () => {
    it('makes expected calls', () => {
      const mockResponse: UserDetail[] = [
        {
          userId: 2,
          id: 11,
          title: 'et ea vero quia laudantium autem',
          body: 'delectus reiciendis molestiae occaecati non minima eveniet qui voluptatibus\naccusamus in eum beatae sit\nvel qui neque voluptates ut commodi qui incidunt\nut animi commodi',
        },
        {
          userId: 2,
          id: 12,
          title: 'in quibusdam tempore odit est dolorem',
          body: 'itaque id aut magnam\npraesentium quia et ea odit et ea voluptas et\nsapiente quia nihil amet occaecati quia id voluptatem\nincidunt ea est distinctio odio',
        },
      ];
      const httpTestingController = TestBed.inject(HttpTestingController);
      service.getJsonValue2().subscribe((res) => {
        expect(res).toEqual(mockResponse);
      });
      const req = httpTestingController.expectOne(
        'https://jsonplaceholder.typicode.com/posts?userId=2'
      );
      expect(req.request.method).toEqual('GET');
      req.flush(mockResponse);
      httpTestingController.verify();
    });
  });
});
