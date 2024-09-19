import { Component, inject, OnInit } from '@angular/core';
import { JSonApiService } from '../json-api.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-unit-test',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './unit-test.component.html',
  styleUrl: './unit-test.component.scss',
})
export class UnitTestComponent implements OnInit {
  private jService = inject(JSonApiService);
  count = 0;
  input1: any;
  input2: any;
  testResult: any;
  data = [];

  ngOnInit(): void {
    console.log('UNIT TESTING TEST IS GOING ON');
  }

  Getalert() {
    alert('Wel come');
  }
  increment() {
    this.count++;
  }

  decrement() {
    this.count--;
  }

  getApicall() {
    this.jService.getJsonValue2().subscribe((res) => {
      this.data = res;
      console.log(this.data);
    });
  }

  add() {
    this.testResult = parseInt(this.input1) + parseInt(this.input2);
    let a: number = 12;
    let b: number = 5;
    const res: any = a + b;
    console.log(res);
  }
}
