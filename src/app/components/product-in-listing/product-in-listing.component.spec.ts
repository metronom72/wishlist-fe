import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductInListingComponent } from './product-in-listing.component';

describe('ProductInListingComponent', () => {
  let component: ProductInListingComponent;
  let fixture: ComponentFixture<ProductInListingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProductInListingComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductInListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
