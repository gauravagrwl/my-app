import { InvestmentHomeComponent } from './investment-home/investment-home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StocksComponent } from './stocks/stocks.component';
import { CryptoComponent } from './crypto/crypto.component';

const routes: Routes = [
  { path: '', redirectTo: '/investments/home', pathMatch: 'full' },
  { path: 'home', component: InvestmentHomeComponent },
  { path: 'stocks', component: StocksComponent },
  { path: 'crypto', component: CryptoComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InvestmentsRoutingModule {}
