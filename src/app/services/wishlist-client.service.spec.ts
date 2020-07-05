import { TestBed } from '@angular/core/testing';

import { WishlistClientService } from './wishlist-client.service';

describe('WishlistClientService', () => {
  let service: WishlistClientService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WishlistClientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
