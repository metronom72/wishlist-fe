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
import { HttpClientModule } from '@angular/common/http';
import { AuthregComponent } from './pages/authreg/authreg.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StageIndicatorComponent } from './components/stage-indicator/stage-indicator.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductComponent,
    ProductListComponent,
    SliderComponent,
    HeaderComponent,
    CartComponent,
    ProductInCartComponent,
    AuthregComponent,
    StageIndicatorComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LayoutModule,
    FlexLayoutModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
