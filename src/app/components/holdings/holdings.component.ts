import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatChipSelectionChange, MatChipsModule } from '@angular/material/chips';
import { CommonModule } from '@angular/common';
import { MatDividerModule } from '@angular/material/divider';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { HoldingService } from '../../services/holding.service';
import { AccountService } from '../../services/account.service';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-holdings',
  standalone: true,
  animations: [
    trigger('detailExpand', [
      state('collapsed,void', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ])],
  imports: [
    MatChipsModule,
    CommonModule,
    MatDividerModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './holdings.component.html',
  styleUrl: './holdings.component.scss'
})
export class HoldingsComponent implements OnInit {

  columnsToDisplay: any = []; // outer table
  columnDataDisplay: any = []; // outer coloum data table
  innerColumnsToDisplay: any = []; // outer table
  innerColumnDataDisplay: any = []; // outer coloum data table
  stockColumnDisplay = ['Symbol', 'Qty', 'AvgBuy@Rate', 'TotalP/L', 'C@Rate', 'P/L'];
  stockColumnDataDisplay = ['instrument', 'totalQuantity', 'averageRate', 'profitLoss', 'currentValue'];
  stockTransactionColumnDisplay = ['Date', 'Trans', 'Rate', 'Qty', 'Amount'];
  stockTransactionColumnDataDisplay = ['s_activity_Date', 's_trans_Code', 's_price', 's_quantity', 's_amount'];
  cryptoDisplay = [];
  accountNumber: any;
  accounts: any = []
  holdings: any = []
  selectedAccount!: any
  expandedElement: any;
  selectedAccountId: string | any;

  selectedChips: string | any;
  isDataReceived: boolean = false;
  institutionCategory = 'INVESTMENT';
  columnsToDisplayWithExpand: any = [];

  constructor(
    private route: ActivatedRoute,
    private accountService: AccountService,
    private holdingService: HoldingService
  ) { }

  ngOnInit() {
    this.getAccounts();
  }

  updateData() {
    this.holdings.forEach((element: { currentValue: number; }) => {
      element.currentValue = 1.00
    });
    console.log(this.holdings)
  }

  isChipSelected(selectedId: string): boolean {
    return this.selectedChips == selectedId;
  }



  getAccounts() {
    this.accountService.getAllInvestmentAccounts(this.institutionCategory).subscribe({
      next: (data) => {
        this.accounts = data.filter(d =>
          d.institutionCategory === "INVESTMENT");
      }
    })
  }

  selectionChange(event: MatChipSelectionChange, id: string): void {
    if (event.selected) {
      this.selectedAccountId = id;
      this.getSelectedAccounts(id);
      this.hideSpinner(false)
    } else {
      this.selectedAccountId = ''
      this.holdings = []
      this.columnsToDisplay = [];
      this.columnDataDisplay = [];
      this.columnsToDisplayWithExpand = [];
    }
    console.log(event);
  }

  getSelectedAccounts(id: string) {
    this.accountService.getSelectedAccount(id).subscribe({
      next: (data) => {
        this.selectedAccount = data
        this.getAccountHoldings(this.selectedAccount.id, this.selectedAccount.accountType);
      }

    })
  }

  getAccountHoldings(id: string, accountType: string) {
    if (accountType === 'STOCK') {
      this.columnsToDisplay = this.stockColumnDisplay;
      this.columnDataDisplay = this.stockColumnDataDisplay;
      this.innerColumnsToDisplay = this.stockTransactionColumnDisplay;
      this.innerColumnDataDisplay = this.stockTransactionColumnDataDisplay;
      this.columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];


    }
    this.holdingService.getHoldings(id).subscribe({
      next: ((data) => {
        if (data) {
          this.hideSpinner(true);
          this.holdings = data;
          this.expandedElement = data;
          this.updateData();
        }
      })
    })
  }
  hideSpinner(bool: boolean) {
    this.isDataReceived = bool
  }

}
