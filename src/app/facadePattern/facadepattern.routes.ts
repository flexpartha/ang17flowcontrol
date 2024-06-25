import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { BindrouteinputComponent } from './bindrouteinput/bindrouteinput.component';

export const facadeRoutes: Routes = [
  {
    path: '',
    component: LoginComponent,
    children: [
      {
        path: ':id',
        component: BindrouteinputComponent,
        data: { title: 'Hello world!' },
      },
    ],
  },
];
