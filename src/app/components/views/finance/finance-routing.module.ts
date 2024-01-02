import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FinanceHomeComponent } from './finance-home/finance-home.component';
import { StatementsComponent } from './statements/statements.component';
import { ReportsComponent } from './reports/reports.component';

const routes: Routes = [
  { path: '', redirectTo: '/finance/home', pathMatch: 'full' },
  { path: 'home', component: FinanceHomeComponent },
  { path: 'statements', component: StatementsComponent },
  { path: 'reports', component: ReportsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FinanceRoutingModule {}
