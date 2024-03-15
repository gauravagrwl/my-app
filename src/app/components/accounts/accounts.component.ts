import { Component, OnInit } from '@angular/core';
import { AddAccountsComponent } from "../add-accounts/add-accounts.component";
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { AccountModel } from '../../model/accounts.model';
import { AccountService } from '../../services/account.service';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatTabChangeEvent, MatTabsModule } from '@angular/material/tabs';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';



import {
  MatDialog,
  MatDialogModule,
} from '@angular/material/dialog';
import { Router, RouterModule } from '@angular/router';
import { UploadDocumentDialogComponent } from '../common/dialog/upload.document.dialog/upload.document.dialog.component';


@Component({
  selector: 'app-accounts',
  standalone: true,
  templateUrl: './accounts.component.html',
  styleUrl: './accounts.component.scss',
  imports: [
    CommonModule,
    AddAccountsComponent,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    FlexLayoutModule,
    MatDialogModule,
    RouterModule,
    MatTabsModule,
    MatSlideToggleModule,
    MatCheckboxModule,
  ]
})
export class AccountsComponent implements OnInit {
  selectedCurr(curr: string) {
    console.log(curr);
    this.selectedAccounts = this.accounts.filter(a => this.category.toUpperCase() === a.institutionCategory.toUpperCase()).filter(a => curr.toUpperCase() === a.institutionCurrency.toUpperCase());
    this.selectedAccounts.forEach(a => {
      // this.inst_currency.add(a.institutionCurrency)
      this.act_type.add(a.accountType)
    })
  }

  selectedType(type: string) {
    console.log(type);
    this.selectedAccounts = this.accounts.filter(a => this.category.toUpperCase() === a.institutionCategory.toUpperCase()).filter(a => type.toUpperCase() === a.accountType.toUpperCase());

  }
  toggleIsAccountActive(id: string) {
    this.accountService.toggleIsAccountActive(id).subscribe({
      next: () => {
        this.accounts.forEach(acc => {
          if (acc.id == id) {
            acc.isActive = !acc.isActive
          }
        })
      }
    });
  }
  catChanged($event: MatTabChangeEvent) {
    this.category = $event.tab.textLabel
    console.log(this.category.toUpperCase());
    this.selectedAccounts = this.accounts.filter(a =>
      this.category.toUpperCase() === a.institutionCategory.toUpperCase()
    )
    this.inst_currency.clear();
    this.act_type.clear();
    this.selectedAccounts.forEach(a => {
      this.inst_currency.add(a.institutionCurrency)
      this.act_type.add(a.accountType)
    })
    console.log("this.accounts")
    console.log(this.accounts)
    console.log("this.selectedAccounts")
    console.log(this.selectedAccounts)
    console.log($event.tab.textLabel)
  }
  category!: string;
  inst_category = new Set<string>();
  inst_currency = new Set<string>();
  act_type = new Set<string>();

  accounts: AccountModel[] = []
  selectedAccounts: AccountModel[] = []
  addNewAccount = false;
  account!: AccountModel
  animal: any;
  constructor(
    private accountService: AccountService,
    public dialog: MatDialog,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getAccounts()

  }
  getAccounts() {
    this.accountService.getAllAccounts().subscribe({
      next: (data) => {
        console.log(data)
        this.accounts = data
        for (this.account of this.accounts) {
          this.inst_category.add(this.account.institutionCategory)
          this.inst_currency.add(this.account.institutionCurrency)
          this.act_type.add(this.account.accountType)
        }
      }
    })
  }

  RegisterAccount() {
    this.addNewAccount = true
  }

  onCloseReport() {
    this.addNewAccount = false;
    this.getAccounts();
  }

  openDialog(account: AccountModel): void {
    const uploadDatadialogRef = this.dialog.open(UploadDocumentDialogComponent, {
      data: account,
    });

    uploadDatadialogRef.afterClosed().subscribe(
      result => {
        console.log('The dialog was closed');
        console.log(result);
        this.getAccounts();
      });
  }

  navigateWithParam(account: AccountModel): void {
    this.router.navigate(['/statements'], { queryParams: { id: account.id } });
  }
}

