import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FinanceRoutingModule } from './finance-routing.module';
import { FinanceHomeComponent } from './finance-home/finance-home.component';
import { StatementsComponent } from './statements/statements.component';
import { ReportsComponent } from './reports/reports.component';


@NgModule({
  declarations: [
    FinanceHomeComponent,
    StatementsComponent,
    ReportsComponent
  ],
  imports: [
    CommonModule,
    FinanceRoutingModule
  ]
})
export class FinanceModule { }
