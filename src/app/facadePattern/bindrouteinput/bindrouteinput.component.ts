import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-bindrouteinput',
  standalone: true,
  imports: [],
  templateUrl: './bindrouteinput.component.html',
  styleUrl: './bindrouteinput.component.scss',
})
export class BindrouteinputComponent implements OnInit {
  @Input() query?: string; // this will come from the query params
  @Input() id?: string; // this will come from the path params
  @Input() title?: string; // this will come from the data

  data: any;

  ngOnInit(): void {
    this.data = {
      query: this.query,
      id: this.id,
      title: this.title,
    };
  }
}
