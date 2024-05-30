import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountModel } from '../../../../model/accounts.model';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
  MatDialogModule,
} from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AccountService } from '../../../../services/account.service';
import { MatSelectModule } from '@angular/material/select';
import { UploadService } from '../../../../services/upload.service';



@Component({
  selector: 'app-upload.document.dialog',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatSelectModule,
    CommonModule
  ],
  templateUrl: './upload.document.dialog.component.html',
  styleUrl: './upload.document.dialog.component.scss'
})
export class UploadDocumentDialogComponent {
  selectedFile!: File;
  selected: any;
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0] as File;
  }

  fileUris: Array<string> = [];
  constructor(
    public dialogRef: MatDialogRef<UploadDocumentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public account: AccountModel,
    private uploadService: UploadService
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }


  uploadFile() {
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('file', this.selectedFile);
      this.uploadService.uploadData(formData, this.account.id, this.selected).
        subscribe({
          next: (data) => { this.dialogRef.close(data) }
        })
    } else {
      console.warn('No file selected');
    }
    // this.dialogRef.close();
  }
}

