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
export class LedgersComponent {

}