import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ReportService } from '../../services/report.service';
import { MatChipSelectionChange, MatChipsModule } from '@angular/material/chips';
import { CommonModule } from '@angular/common';
import { MatDividerModule } from '@angular/material/divider';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';



@Component({
  selector: 'app-tracker',
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
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.scss'
})
export class ReportsComponent implements OnInit {

  constructor(private route: ActivatedRoute, private reportService: ReportService) { }

  ngOnInit(): void {
    this.getCashFlowYearList();
  }

  cashFlowYearList: number[] = []

  isChipSelected_: boolean = false

  isSelectedCashFlowYear: number | any
  isDataReceived: boolean = false;


  isChipSelected(selectedId: number): boolean {
    return this.isSelectedCashFlowYear == selectedId;

  }


  selectionChange(event: MatChipSelectionChange): void {
    this.isChipSelected_ = event.selected
  }

  getCashFlowYearList() {
    this.reportService.getCashFlowYearList().subscribe({
      next: (data) => {
        this.cashFlowYearList = data.sort((n1, n2) => n1 - n2);
      }
    })
  }

  hideSpinner(bool: boolean) {
    this.isDataReceived = bool
  }

  toggleSelection(year: number) {
    if (this.isChipSelected_) {
      this.isSelectedCashFlowYear = year;
      this.getCashFlowReportByYear(year);
    } else {
      this.isSelectedCashFlowYear = ''

    }
  }

  cashFlowReports = []
  getCashFlowReportByYear(year: number) {
    this.reportService.getCashFlowReportByYear(year).subscribe({
      next: (data) => {
        if (data) {
          this.hideSpinner(true);
          this.cashFlowReports = data;
        }
      }
    })
  }

  displayedColumns: string[] = [
    'Sno',
    'Transaction Date',
    'Account',
    'Descriptions',
    'Currency',
    'Type',
    'Amount',

  ];


}
