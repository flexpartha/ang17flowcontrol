import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormField } from '../../model/formfield.interface';

const jsonData = [
  {
    type: 'text',
    name: 'firstname',
    inputType: 'text',
    label: 'First Name',
    value: 'Partha',
    isDisable: true,
  },
  {
    type: 'text',
    name: 'lastname',
    inputType: 'text',
    label: 'Last Name',
    value: 'Chakraborty',
    isDisable: true,
  },
  {
    type: 'textarea',
    name: 'description',
    label: 'Put Your Sample Description',
    value: '',
  },
  {
    type: 'select',
    name: 'category',
    label: 'Describe the Category',
    Default: 'Please Select from Option...',
    value: '',
    options: [
      { label: 'Option 1', value: 'option1' },
      { label: 'Option 2', value: 'option2' },
      { label: 'Option 3', value: 'option3' },
    ],
  },
  {
    type: 'checkbox',
    name: 'Gender',
    checked: 'true',
    inputType: 'checkbox',
    label: 'Remember the Position',
    value: '',
  },
  {
    type: 'text',
    name: 'firstname1',
    inputType: 'text',
    label: 'First Name',
    value: 'Monik',
    isDisable: true,
  },
  {
    type: 'text',
    name: 'lastname1',
    inputType: 'text',
    label: 'Last Name',
    value: 'Chavvakula',
    isDisable: true,
  },
  {
    type: 'textarea',
    name: 'description1',
    label: 'Put Your Sample Description',
    value: '',
  },
  {
    type: 'select',
    name: 'category1',
    label: 'Describe the Category',
    Default: 'Please Select from Option...',
    value: '',
    options: [
      { label: 'Option 1', value: 'option1' },
      { label: 'Option 2', value: 'option2' },
    ],
  },
  {
    type: 'checkbox',
    name: 'Gender1',
    checked: 'false',
    inputType: 'checkbox',
    label: 'Remember the Position',
    value: '',
  },
];

@Component({
  selector: 'app-ang-signal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './ang-signal.component.html',
  styleUrl: './ang-signal.component.scss',
})
export class AngSignalComponent implements OnInit {
  dynamicForm!: FormGroup;

  jsonFormdata: FormField[] = jsonData;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.dynamicForm = this.formBuilder.group({});
    this.jsonFormdata.forEach((field) => {
      const control = this.formBuilder.control(field.value || '');
      this.dynamicForm.addControl(field.name, control);
    });
  }

  trackByIndex(index: number): number {
    return index;
  }

  onSubmit(): void {
    //const updatedJson = this.dynamicForm.value;
    const updatedJsonData = this.jsonFormdata.map((field) => {
      return {
        ...field,
        value: this.dynamicForm.get(field.name)?.value,
      };
    });
    console.log(updatedJsonData);
  }
}
