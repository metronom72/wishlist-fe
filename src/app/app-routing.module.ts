import { SliderComponent } from './../components/slider/slider.component';
import { ProductListComponent } from './pages/product-list/product-list.component';
import { ProductComponent } from '../components/product/product.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'products',
    component: ProductListComponent,
  },
  // {
  //   path: 'products/pages/:id',
  // },
  {
    path: 'products/:id',
    component: ProductComponent,
  },
  // {
  //   path: 'card',
  // },
  // {
  //   path: 'wishlist',
  // },
  // {
  //   path: 'orders',
  // },
  // {
  //   path: 'orders/:id',
  // },
  // {
  //   path: 'me',
  // },
  // {
  //   path: 'auth',
  // },
  { path: '', redirectTo: 'products', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
