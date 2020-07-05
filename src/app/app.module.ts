import { WishlistClientComponent } from './pages/wishlist-client/wishlist-client.component';
import { OrdersComponent } from './pages/orders/orders.component';
import { BillingComponent } from './pages/billing/billing.component';
import { ShippingComponent } from './pages/shipping/shipping.component';
import { ProductInWishlistComponent } from './components/product-in-wishlist/product-in-wishlist.component';
import { UserCardComponent } from './components/user-card/user-card.component';
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
import { FooterComponent } from './components/footer/footer.component';
import { PageTitleComponent } from './components/page-title/page-title.component';
import { TextfieldComponent } from './components/textfield/textfield.component';
import { SubscribeComponent } from './components/subscribe/subscribe.component';
import { WishlistComponent } from './pages/wishlist/wishlist.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductComponent,
    ProductListComponent,
    SliderComponent,
    HeaderComponent,
    FooterComponent,
    CartComponent,
    ProductInCartComponent,
    AuthregComponent,
    StageIndicatorComponent,
    PageTitleComponent,
    TextfieldComponent,
    SubscribeComponent,
    WishlistComponent,
    UserCardComponent,
    ProductInWishlistComponent,
    ShippingComponent,
    BillingComponent,
    OrdersComponent,
    WishlistClientComponent,
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
