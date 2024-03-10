import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatChipSelectionChange, MatChipsModule } from '@angular/material/chips';
import { AccountService } from '../../services/account.service';
import { AccountModel, AccountStatementModel } from '../../model/accounts.model';
import { CommonModule } from '@angular/common';
import { MatDividerModule } from '@angular/material/divider';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';



@Component({
  selector: 'app-ledgers',
  standalone: true,
  imports: [
    MatChipsModule,
    CommonModule,
    MatDividerModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatProgressSpinnerModule

  ],
  templateUrl: './ledgers.component.html',
  styleUrl: './ledgers.component.scss'
})
export class LedgersComponent implements OnInit {

  displayedColumns: string[] = [
    'Sno',
    'Transaction Date',
    'Descriptions',
    'Type',
    'Amount',
    'Balance',
    'Options'
  ];


  accountNumber: any;


  accounts: AccountModel[] = []
  accountStatements: AccountStatementModel[] = []
  selectedAccount!: AccountModel

  selectedAccountId: string | any;

  selectedChips: string | any;
  dataReceived: boolean = false;
  constructor(private route: ActivatedRoute, private accountService: AccountService) { }

  ngOnInit() {
    // Retrieve data from the URL parameters
    this.getAccounts();
    this.selectedAccountId = this.route.snapshot.queryParamMap.get('id');
    if (null != this.selectedAccountId) {
      this.selectedChips = this.selectedAccountId
      this.getAccountStatement(this.selectedAccountId)
      this.getSelectedAccounts(this.selectedAccountId)
    }


  }

  isChipSelected(selectedId: string): boolean {

    return this.selectedChips == selectedId;
  }

  isChipSelected_: boolean = false
  toggleSelection(id: string) {
    if (this.isChipSelected_) {
      this.selectedAccountId = id;
      this.getAccountStatement(id)
      this.getSelectedAccounts(id)
      this.hideSpinner(false)
    } else {
      this.selectedAccountId = ''
      this.accountStatements = []
    }
  }

  getAccounts() {
    this.accountService.getAllAccounts().subscribe({
      next: (data) => this.accounts = data
    })
  }

  selectionChange(event: MatChipSelectionChange): void {
    this.isChipSelected_ = event.selected


  }

  getSelectedAccounts(id: string) {
    this.accountService.getSelectedAccount(id).subscribe({
      next: (data) => this.selectedAccount = data
    })
  }

  getAccountStatement(id: string) {
    this.accountService.getAccountStatement(id).subscribe({
      next: ((data) => {
        if (data) {
          this.hideSpinner(true);
          console.log(data);
          this.accountStatements = data
        }
      })
    })
  }
  hideSpinner(bool: boolean) {
    this.dataReceived = bool
  }

  deleteAccountTransaction(transactionId: string) {
    this.accountService.deleteAccountTransaction(this.selectedAccount.id, transactionId).subscribe({
      next: () => this.getAccountStatement(this.selectedAccount.id)
    });
    throw new Error('Method not implemented.');
  }

}
