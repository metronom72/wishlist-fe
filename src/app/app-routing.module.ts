import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'products',
  },
  {
    path: 'products/pages/:id',
  },
  {
    path: 'products/:id',
  },
  {
    path: 'card',
  },
  {
    path: 'wishlist',
  },
  {
    path: 'orders',
  },
  {
    path: 'orders/:id',
  },
  {
    path: 'me',
  },
  {
    path: 'auth',
  },
  { path: '', redirectTo: 'products', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
