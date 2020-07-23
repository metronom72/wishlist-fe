import { TestBed } from '@angular/core/testing';

import { BuyerWishlistCalcService } from './buyer-wishlist-calc.service';

describe('BuyerWishlistCalcService', () => {
  let service: BuyerWishlistCalcService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BuyerWishlistCalcService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
