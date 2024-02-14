import { Component, OnInit } from '@angular/core';
import { FinanceService } from '../../../../services/finance.service';
import { UserAccount } from '../../../../models/user-account.model';

@Component({
  selector: 'app-finance-home',
  templateUrl: './finance-home.component.html',
  styleUrl: './finance-home.component.scss'
})
export class FinanceHomeComponent implements OnInit{

  accounts: UserAccount[] = [];

  constructor(private financeService: FinanceService){}

  ngOnInit(): void {
    this.getUserAccounts();
  }
  
  async getUserAccounts() {
    let results = await this.financeService.getUserAccounts("agrwl");
    this.accounts = results;
    console.log(this.accounts[0]);
  }

}
