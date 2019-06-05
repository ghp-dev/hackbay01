import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WalletService {
  constructor() {
    if (parseInt(localStorage.getItem('wallet'), 10) > 0) {
      localStorage.setItem('wallet', localStorage.getItem('wallet'));
    } else {
      localStorage.setItem('wallet', '0');
    }
  }

  addPoints(points: number) {
    const newBalance = parseInt(localStorage.getItem('wallet'), 10) + points;
    localStorage.setItem('wallet', newBalance.toString());
  }

  getBalance(): number {
    return parseInt(localStorage.getItem('wallet'), 10);
  }
}
