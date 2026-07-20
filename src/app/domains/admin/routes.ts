import { Routes } from '@angular/router';
import { AdminLayout } from './layout/layout';

const routes: Routes = [
  {
    path: '',
    component: AdminLayout,
    children: [
      { path: '', pathMatch: 'full', redirectTo: '/auth/sign-in' },

      {
        path: 'maestros',
        loadChildren: () => import('./modules/maestros/routes'),
      },

      

      { path: '**', redirectTo: '404' },
    ],
  },
];

export default routes;