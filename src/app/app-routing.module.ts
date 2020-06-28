import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'products', component: () => ''
  },
  {
    path: 'products/pages/:id', component: () => ''
  },
  {
    path: 'products/:id', component: () => ''
  },
  {
    path: 'card', component: () => ''
  },
  {
    path: 'wishlist', component: () => ''
  },
  {
    path: 'orders', component: () => ''
  },
  {
    path: 'orders/:id', component: () => ''
  },
  {
    path: 'me', component: () => ''
  },
  {
    path: 'auth', component: () => ''
  },
  { path: '', redirectTo: 'products', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
