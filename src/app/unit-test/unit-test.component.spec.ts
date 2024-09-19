import {
  ComponentFixture,
  fakeAsync,
  flush,
  TestBed,
  tick,
} from '@angular/core/testing';

import { UnitTestComponent } from './unit-test.component';
import { By } from '@angular/platform-browser';
import { JSonApiService } from '../json-api.service';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { HttpClient, provideHttpClient } from '@angular/common/http';

fdescribe('UnitTestComponent', () => {
  let component: UnitTestComponent;
  let fixture: ComponentFixture<UnitTestComponent>;
  let jsnSrv: any;
  const jsonMockData: any = [
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
    {
      userId: 2,
      id: 13,
      title: 'dolorum ut in voluptas mollitia et saepe quo animi',
      body: 'aut dicta possimus sint mollitia voluptas commodi quo doloremque\niste corrupti reiciendis voluptatem eius rerum\nsit cumque quod eligendi laborum minima\nperferendis recusandae assumenda consectetur porro architecto ipsum ipsam',
    },
    {
      userId: 2,
      id: 14,
      title: 'voluptatem eligendi optio',
      body: 'fuga et accusamus dolorum perferendis illo voluptas\nnon doloremque neque facere\nad qui dolorum molestiae beatae\nsed aut voluptas totam sit illum',
    },
    {
      userId: 2,
      id: 15,
      title: 'eveniet quod temporibus',
      body: 'reprehenderit quos placeat\nvelit minima officia dolores impedit repudiandae molestiae nam\nvoluptas recusandae quis delectus\nofficiis harum fugiat vitae',
    },
    {
      userId: 2,
      id: 16,
      title:
        'sint suscipit perspiciatis velit dolorum rerum ipsa laboriosam odio',
      body: 'suscipit nam nisi quo aperiam aut\nasperiores eos fugit maiores voluptatibus quia\nvoluptatem quis ullam qui in alias quia est\nconsequatur magni mollitia accusamus ea nisi voluptate dicta',
    },
    {
      userId: 2,
      id: 17,
      title: 'fugit voluptas sed molestias voluptatem provident',
      body: 'eos voluptas et aut odit natus earum\naspernatur fuga molestiae ullam\ndeserunt ratione qui eos\nqui nihil ratione nemo velit ut aut id quo',
    },
    {
      userId: 2,
      id: 18,
      title: 'voluptate et itaque vero tempora molestiae',
      body: 'eveniet quo quis\nlaborum totam consequatur non dolor\nut et est repudiandae\nest voluptatem vel debitis et magnam',
    },
    {
      userId: 2,
      id: 19,
      title: 'adipisci placeat illum aut reiciendis qui',
      body: 'illum quis cupiditate provident sit magnam\nea sed aut omnis\nveniam maiores ullam consequatur atque\nadipisci quo iste expedita sit quos voluptas',
    },
    {
      userId: 2,
      id: 20,
      title: 'doloribus ad provident suscipit at',
      body: 'qui consequuntur ducimus possimus quisquam amet similique\nsuscipit porro ipsam amet\neos veritatis officiis exercitationem vel fugit aut necessitatibus totam\nomnis rerum consequatur expedita quidem cumque explicabo',
    },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UnitTestComponent],
      providers: [
        JSonApiService,
        provideHttpClientTesting(),
        provideHttpClient(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(UnitTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    jsnSrv = TestBed.inject(JSonApiService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should click Get Alert button and find the textcontent', fakeAsync(() => {
    const debug = fixture.debugElement.query(By.css('.getAlrt'));
    const text: HTMLElement = debug.nativeElement;
    expect(text.textContent).toEqual('Get Alert');
    flush();
  }));

  it('should call the Getalert function', fakeAsync(() => {
    spyOn(component, 'Getalert');
    const debug = fixture.debugElement.query(By.css('.getAlrt'));
    debug.triggerEventHandler('click', null);
    tick();
    expect(component.Getalert).toHaveBeenCalled();
  }));

  it('should call alert after click the Getalert function', fakeAsync(() => {
    spyOn(window, 'alert');
    component.Getalert();
    expect(window.alert).toHaveBeenCalledWith('Wel come');
    flush();
  }));

  it('should call ngOnInit() function and show console log', fakeAsync(() => {
    spyOn(console, 'log');
    component.ngOnInit();
    expect(console.log).toHaveBeenCalledWith('UNIT TESTING TEST IS GOING ON');
  }));

  it('should call the increment function', fakeAsync(() => {
    spyOn(component, 'increment');
    const debug = fixture.debugElement.query(By.css('.increment'));
    debug.triggerEventHandler('click', null);
    tick();
    expect(component.increment).toHaveBeenCalled();
  }));

  it('should call the decrement function', fakeAsync(() => {
    spyOn(component, 'decrement');
    const debug = fixture.debugElement.query(By.css('.decrement'));
    debug.triggerEventHandler('click', null);
    tick();
    expect(component.decrement).toHaveBeenCalled();
  }));

  it('should initialize count to 0', () => {
    expect(component.count).toBe(0);
  });

  it('should call the increment function with count 1 or 2', fakeAsync(() => {
    component.increment();
    expect(component.count).toBe(1);
  }));

  it('should call the decrement function with count 0', fakeAsync(() => {
    component.increment();
    component.decrement();
    expect(component.count).toBe(0);
  }));

  it('should call the add function', fakeAsync(() => {
    spyOn(component, 'add');
    const debug = fixture.debugElement.query(By.css('.add'));
    debug.triggerEventHandler('click', null);
    tick();
    expect(component.add).toHaveBeenCalled();
  }));

  it('should call the add function with desire result', fakeAsync(() => {
    component.add();
    expect(component.testResult).toEqual(NaN);
  }));
  it('should call getApicall() with subscribe result', fakeAsync(() => {
    spyOn(jsnSrv, 'getJsonValue2').and.callFake(() => {
      return of(jsonMockData);
    });
    component.getApicall();
    expect(component.data).toEqual(jsonMockData);
  }));
});
