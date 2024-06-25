import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewflocontrolComponent } from './newflocontrol.component';

describe('NewflocontrolComponent', () => {
  let component: NewflocontrolComponent;
  let fixture: ComponentFixture<NewflocontrolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewflocontrolComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NewflocontrolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
