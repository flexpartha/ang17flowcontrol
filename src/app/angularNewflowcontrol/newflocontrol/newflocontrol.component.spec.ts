import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { JSonApiService } from '../../json-api.service';
import { SafeHtml } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NewflocontrolComponent } from './newflocontrol.component';
import { UserDetail } from '../../model/response.interface';
import { of } from 'rxjs';

describe('NewflocontrolComponent', () => {
  let component: NewflocontrolComponent;
  let fixture: ComponentFixture<NewflocontrolComponent>;

  beforeEach(() => {
    const jSonApiServiceStub = () => ({
      getJsonValue: () => ({ subscribe: (f: (arg0: {}) => any) => f({}) }),
      getNextPage: () => ({ subscribe: (f: (arg0: {}) => any) => f({}) }),
      getPreviousPage: () => ({ subscribe: (f: (arg0: {}) => any) => f({}) }),
      setCookie: (string: any, name: any) => ({}),
      getCookie: (string: any) => ({}),
    });
    TestBed.configureTestingModule({
      imports: [FormsModule, NewflocontrolComponent],
      schemas: [NO_ERRORS_SCHEMA],
      //declarations: [],
      providers: [{ provide: JSonApiService, useFactory: jSonApiServiceStub }],
    });
    fixture = TestBed.createComponent(NewflocontrolComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  it(`loadData has default value`, () => {
    expect(component.loadData).toEqual([]);
  });

  it(`showCard has default value`, () => {
    expect(component.showCard).toEqual(false);
  });

  it(`isVisibleNext has default value`, () => {
    expect(component.isVisibleNext).toEqual(false);
  });

  it(`isVisible has default value`, () => {
    expect(component.isVisible).toEqual(false);
  });

  describe('ngOnInit', () => {
    it('makes expected calls', () => {
      const jSonApiServiceStub: JSonApiService =
        fixture.debugElement.injector.get(JSonApiService);
      spyOn(component, 'loadCookieData').and.callThrough();
      spyOn(jSonApiServiceStub, 'getJsonValue').and.callThrough();
      component.ngOnInit();
      expect(component.loadCookieData).toHaveBeenCalled();
      expect(jSonApiServiceStub.getJsonValue).toHaveBeenCalled();
    });
  });

  describe('onNextResult', () => {
    it('makes expected calls', () => {
      const jSonApiServiceStub = TestBed.inject(
        JSonApiService
      ) as jasmine.SpyObj<JSonApiService>;
      spyOn(jSonApiServiceStub, 'getNextPage').and.callThrough();
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

      jSonApiServiceStub.getNextPage.and.returnValue(of(mockResponse));

      component.onNextResult();

      expect(component.loadData).toEqual(mockResponse); // Check if loadData is set correctly
      expect(component.isVisible).toBeFalse(); // Check if isVisible is set to false
      expect(component.isVisibleNext).toBeTrue();
      expect(jSonApiServiceStub.getNextPage).toHaveBeenCalled();
    });
  });

  describe('onPreviousResult', () => {
    it('makes expected calls', () => {
      const jSonApiServiceStub: JSonApiService =
        fixture.debugElement.injector.get(JSonApiService);
      spyOn(jSonApiServiceStub, 'getPreviousPage').and.callThrough();
      component.onPreviousResult();
      expect(jSonApiServiceStub.getPreviousPage).toHaveBeenCalled();
    });
  });

  // describe('getAllData', () => {
  //   it('makes expected calls', () => {
  //     const jSonApiServiceStub = TestBed.inject(
  //       JSonApiService
  //     ) as jasmine.SpyObj<JSonApiService>;
  //     //spyOn(jSonApiServiceStub, 'getJsonValue').and.callThrough();
  //     const mockResponse: UserDetail[] = [
  //       {
  //         userId: 2,
  //         id: 11,
  //         title: 'et ea vero quia laudantium autem',
  //         body: 'delectus reiciendis molestiae occaecati non minima eveniet qui voluptatibus\naccusamus in eum beatae sit\nvel qui neque voluptates ut commodi qui incidunt\nut animi commodi',
  //       },
  //       {
  //         userId: 2,
  //         id: 12,
  //         title: 'in quibusdam tempore odit est dolorem',
  //         body: 'itaque id aut magnam\npraesentium quia et ea odit et ea voluptas et\nsapiente quia nihil amet occaecati quia id voluptatem\nincidunt ea est distinctio odio',
  //       },
  //     ];
  //     const numberValue = 2;

  //     component.getAllData();
  //     jSonApiServiceStub.getNextPage.and.returnValue(of(mockResponse));
  //     component.number.set(numberValue);
  //     expect(component.getEachValue()).toEqual(
  //       mockResponse.slice(0, numberValue)
  //     ); // Check if set() and update() work properly
  //     expect(component.showCard).toBeTrue();
  //     expect(jSonApiServiceStub.getJsonValue).toHaveBeenCalled();
  //   });
  // });

  describe('saveData', () => {
    it('makes expected calls', () => {
      const jSonApiServiceStub: JSonApiService =
        fixture.debugElement.injector.get(JSonApiService);
      spyOn(jSonApiServiceStub, 'setCookie').and.callThrough();
      component.saveData();
      expect(jSonApiServiceStub.setCookie).toHaveBeenCalled();
    });
  });

  describe('loadCookieData', () => {
    it('makes expected calls', () => {
      const jSonApiServiceStub: JSonApiService =
        fixture.debugElement.injector.get(JSonApiService);
      spyOn(jSonApiServiceStub, 'getCookie').and.callThrough();
      component.loadCookieData();
      expect(jSonApiServiceStub.getCookie).toHaveBeenCalled();
    });
  });
});
