import { Component, OnInit } from '@angular/core';
import { WalletService } from '../services/wallet/wallet.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  private balance: string;

  constructor(private walletService: WalletService) { }

  ngOnInit() {
    this.balance = this.updateWalletBalance();
  }

  updateWalletBalance(): string {
    return this.balance = this.walletService.getBalance().toString();
  }

}
