import { TestBed } from '@angular/core/testing';

import { WalletService } from './wallet.service';

xdescribe('WalletService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WalletService = TestBed.get(WalletService);
    expect(service).toBeTruthy();
  });
});
