import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { LayoutModule } from '@angular/cdk/layout';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { ProductComponent } from '../app/components/product/product.component';
import { ProductListComponent } from './pages/product-list/product-list.component';
import { SliderComponent } from '../app/components/slider/slider.component';
import { CartComponent } from './pages/cart/cart.component';
import { ProductInCartComponent } from './components/product-in-cart/product-in-cart.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductComponent,
    ProductListComponent,
    SliderComponent,
    HeaderComponent,
    CartComponent,
    ProductInCartComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, LayoutModule, FlexLayoutModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
