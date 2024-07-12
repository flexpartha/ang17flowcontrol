import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { UserDetail } from './model/response.interface';
import { CookieService } from 'ngx-cookie-service';

const apiUrl = 'https://jsonplaceholder.typicode.com/posts?userId=';
const apiUrl1 = 'https://jsonplaceholder.typicode.com/posts?userId=2';

@Injectable({
  providedIn: 'root',
})
export class JSonApiService {
  pageNum: number = 1;

  private cookieService = inject(CookieService);
  constructor(
    private httpSrv: HttpClient,
    private sanitizer: DomSanitizer
  ) //private cookieService: CookieService
  {}

  getJsonValue(value: number): Observable<UserDetail[]> {
    return this.httpSrv.get<UserDetail[]>(apiUrl + value);
  }

  getNextPage() {
    this.pageNum += 1;
    //let finalApi = apiUrl + this.pageNum;
    return this.httpSrv.get<UserDetail[]>(apiUrl + this.pageNum);
  }

  getPreviousPage() {
    this.pageNum -= 1;
    let finalApi = apiUrl + this.pageNum;
    return this.httpSrv.get<UserDetail[]>(finalApi).pipe();
  }

  getJsonValue2(): Observable<any> {
    return this.httpSrv.get(apiUrl1);
  }

  getSafeHtml(html: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

  setCookie(name: string, value: string) {
    this.cookieService.set(name, value);
  }

  getCookie(name: string) {
    return this.cookieService.get(name);
  }
}
