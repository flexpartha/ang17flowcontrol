import { Routes } from '@angular/router';
import { UnitTestComponent } from './unit-test/unit-test.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/flowcontrol',
    pathMatch: 'full',
  },
  {
    path: 'flowcontrol',
    loadChildren: () =>
      import('./angularNewflowcontrol/angularflowcontrol.routes').then(
        (mod) => mod.flowcontrolroutes
      ),
  },
  {
    path: 'signal',
    loadChildren: () =>
      import('./angularSignal/angsignal.routes').then(
        (mod) => mod.signalroutes
      ),
  },
  {
    path: 'product',
    loadChildren: () =>
      import('./products/products.routes').then((mod) => mod.ProductsRoutes),
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./facadePattern/facadepattern.routes').then(
        (mod) => mod.facadeRoutes
      ),
  },
  {
    path: 'unittesting',
    component: UnitTestComponent,
  },
];
