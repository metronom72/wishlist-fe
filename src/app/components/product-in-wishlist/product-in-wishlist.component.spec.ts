import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductInWishlistComponent } from './product-in-wishlist.component';

describe('ProductInWishlistComponent', () => {
  let component: ProductInWishlistComponent;
  let fixture: ComponentFixture<ProductInWishlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProductInWishlistComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductInWishlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
