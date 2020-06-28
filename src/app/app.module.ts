import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { LayoutModule } from '@angular/cdk/layout';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { ProductComponent } from '../components/product/product.component';
import { ProductListComponent } from './pages/product-list/product-list.component';
import { SliderComponent } from '../components/slider/slider.component';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [
    AppComponent,
    ProductComponent,
    ProductListComponent,
    SliderComponent,
    HeaderComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, LayoutModule, FlexLayoutModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
