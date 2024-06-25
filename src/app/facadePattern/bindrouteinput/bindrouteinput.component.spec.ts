import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BindrouteinputComponent } from './bindrouteinput.component';

describe('BindrouteinputComponent', () => {
  let component: BindrouteinputComponent;
  let fixture: ComponentFixture<BindrouteinputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BindrouteinputComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BindrouteinputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
