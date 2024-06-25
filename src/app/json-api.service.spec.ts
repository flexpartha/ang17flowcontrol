import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { JSonApiService } from './json-api.service';
import { UserDetail } from './model/response.interface';

fdescribe('JSonApiService', () => {
  const apiUrl = 'https://jsonplaceholder.typicode.com/posts?userId=';
  const apiUrl1 = 'https://jsonplaceholder.typicode.com/posts?userId=2';
  let service: JSonApiService;
  let httpMock: HttpTestingController;
  let sanitizer: DomSanitizer;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [JSonApiService],
    });

    service = TestBed.inject(JSonApiService);
    httpMock = TestBed.inject(HttpTestingController);
    sanitizer = TestBed.inject(DomSanitizer);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch JSON values based on user ID', () => {
    const dummyData: UserDetail[] = [
      { userId: 1, id: 1, title: 'Title 1', body: 'Body 1' },
      { userId: 1, id: 2, title: 'Title 2', body: 'Body 2' },
    ];

    service.getJsonValue(1).subscribe((data) => {
      expect(data.length).toBe(2);
      expect(data).toEqual(dummyData);
    });

    const req = httpMock.expectOne(apiUrl + '1');
    expect(req.request.method).toBe('GET');
    req.flush(dummyData);
  });

  it('should fetch next page JSON values', () => {
    const dummyData: UserDetail[] = [
      { userId: 2, id: 3, title: 'Title 3', body: 'Body 3' },
      { userId: 2, id: 4, title: 'Title 4', body: 'Body 4' },
    ];

    service.pageNum = 1;
    service.getNextPage().subscribe((data) => {
      expect(data.length).toBe(2);
      expect(data).toEqual(dummyData);
      expect(service.pageNum).toBe(2);
    });

    const req = httpMock.expectOne(apiUrl + '2');
    expect(req.request.method).toBe('GET');
    req.flush(dummyData);
  });

  it('should fetch previous page JSON values', () => {
    const dummyData: UserDetail[] = [
      { userId: 1, id: 1, title: 'Title 1', body: 'Body 1' },
      { userId: 1, id: 2, title: 'Title 2', body: 'Body 2' },
    ];

    service.pageNum = 2;
    service.getPreviousPage().subscribe((data) => {
      expect(data.length).toBe(2);
      expect(data).toEqual(dummyData);
      expect(service.pageNum).toBe(1);
    });

    const req = httpMock.expectOne(apiUrl + '1');
    expect(req.request.method).toBe('GET');
    req.flush(dummyData);
  });

  it('should fetch JSON values from apiUrl1', () => {
    const dummyData = [{ userId: 2, id: 5, title: 'Title 5', body: 'Body 5' }];

    service.getJsonValue2().subscribe((data) => {
      expect(data.length).toBe(1);
      expect(data).toEqual(dummyData);
    });

    const req = httpMock.expectOne(apiUrl1);
    expect(req.request.method).toBe('GET');
    req.flush(dummyData);
  });

  it('should return safe HTML', () => {
    const unsafeHtml = '<div>Unsafe HTML</div>';
    const safeHtml: SafeHtml = service.getSafeHtml(unsafeHtml);
    const expectedSafeHtml = sanitizer.bypassSecurityTrustHtml(unsafeHtml);

    expect(safeHtml).toEqual(expectedSafeHtml);
  });
});
