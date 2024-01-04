import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InvestmentsRoutingModule } from './investments-routing.module';
import { StocksComponent } from './stocks/stocks.component';
import { CryptoComponent } from './crypto/crypto.component';
import { InvestmentHomeComponent } from './investment-home/investment-home.component';

@NgModule({
  declarations: [StocksComponent, CryptoComponent, InvestmentHomeComponent],
  imports: [CommonModule, InvestmentsRoutingModule],
})
export class InvestmentsModule {}
