import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WishlistClientComponent } from './wishlist-client.component';

describe('WishlistClientComponent', () => {
  let component: WishlistClientComponent;
  let fixture: ComponentFixture<WishlistClientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [WishlistClientComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WishlistClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
