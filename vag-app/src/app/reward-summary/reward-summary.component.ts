import { Component, OnInit } from '@angular/core';
import { WalletService } from "../services/wallet/wallet.service";

@Component({
  selector: 'app-reward-summary',
  templateUrl: './reward-summary.component.html',
  styleUrls: ['./reward-summary.component.scss']
})
export class RewardSummaryComponent implements OnInit {

  public beeBalance: number;

  constructor(
      private walletService: WalletService
  ) { }

  ngOnInit() {
    this.beeBalance = this.walletService.getBalance();
  }

}
