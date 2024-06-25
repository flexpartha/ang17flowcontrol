import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DescriptionviewComponent } from './descriptionview.component';

describe('DescriptionviewComponent', () => {
  let component: DescriptionviewComponent;
  let fixture: ComponentFixture<DescriptionviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DescriptionviewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DescriptionviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
