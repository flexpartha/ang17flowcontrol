import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { AngSignalComponent } from './ang-signal.component';
import { CommonModule } from '@angular/common';

describe('AngSignalComponent', () => {
  let component: AngSignalComponent;
  let fixture: ComponentFixture<AngSignalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AngSignalComponent, CommonModule, ReactiveFormsModule],
      //declarations: [],
      providers: [FormBuilder],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AngSignalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with default values', () => {
    component.ngOnInit();
    const formData = component.jsonFormdata;
    formData.forEach((field) => {
      expect(component.dynamicForm.controls[field.name].value).toBe(
        field.value
      );
    });
  });

  it('should track by index', () => {
    const index = 5;
    expect(component.trackByIndex(index)).toBe(index);
  });

  it('should update jsonData on form submission', () => {
    component.ngOnInit();
    component.dynamicForm.controls['firstname'].setValue('Partha');
    component.onSubmit();
    const updatedJsonData = component.jsonFormdata.find(
      (field) => field.name === 'firstname'
    );
    expect(updatedJsonData?.value).toBe('Partha');
  });

  it('should console log updatedJsonData on submit', () => {
    spyOn(console, 'log');
    component.ngOnInit();
    component.onSubmit();
    const updatedJsonData = component.jsonFormdata.map((field) => ({
      ...field,
      value: component.dynamicForm.get(field.name)?.value,
    }));
    expect(console.log).toHaveBeenCalledWith(updatedJsonData);
  });
});
