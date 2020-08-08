import { OrdersComponent } from './pages/orders/orders.component';
import { BillingComponent } from './pages/billing/billing.component';
import { ShippingComponent } from './pages/shipping/shipping.component';
import { WishlistClientComponent } from './pages/wishlist-client/wishlist-client.component';
import { AuthregComponent } from './pages/authreg/authreg.component';
import { CartComponent } from './pages/cart/cart.component';
import { SliderComponent } from '../app/components/slider/slider.component';
import { ProductListComponent } from './pages/product-list/product-list.component';
import { ProductComponent } from '../app/components/product/product.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WishlistComponent } from './pages/wishlist/wishlist.component';

const routes: Routes = [
  {
    path: 'catalog/:page',
    component: ProductListComponent,
  },
  // {
  //   path: 'products/pages/:id',
  // },
  {
    path: 'products/:id',
    component: ProductComponent,
  },
  {
    path: 'cart',
    component: CartComponent,
  },
  {
    path: 'wishlist',
    component: WishlistClientComponent,
  },
  {
    path: 'wishlist/:id',
    component: WishlistClientComponent,
  },
  {
    path: 'shipping',
    component: ShippingComponent,
  },
  {
    path: 'billing',
    component: BillingComponent,
  },
  {
    path: 'orders',
    component: OrdersComponent,
  },

  // {
  //   path: 'orders/:id',
  // },
  // {
  //   path: 'me',
  // },
  {
    path: 'auth',
    component: AuthregComponent,
  },
  { path: '', redirectTo: 'products', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
