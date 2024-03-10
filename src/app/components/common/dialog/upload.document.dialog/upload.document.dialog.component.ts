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
    CommonModule
  ],
  templateUrl: './upload.document.dialog.component.html',
  styleUrl: './upload.document.dialog.component.scss'
})
export class UploadDocumentDialogComponent {
  selectedFile!: File;
  onFileSelected(event: any) {
    console.log(event)
    this.selectedFile = event.target.files[0] as File;
  }

  fileUris: Array<string> = [];
  constructor(
    public dialogRef: MatDialogRef<UploadDocumentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public account: AccountModel,
    private accountService: AccountService
  ) { }

  onNoClick(): void {
    alert('no thanks clicked!');
    this.dialogRef.close();
  }


  uploadFile() {
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('file', this.selectedFile);
      this.accountService.uploadAccountStatement(formData, this.account.id).
        subscribe({
          next: (data) => { this.dialogRef.close(data) }
        })

      // this.http.post('your-upload-api-endpoint', formData).subscribe(
      //   (response) => {
      //     console.log('File uploaded successfully', response);
      //   },
      //   (error) => {
      //     console.error('Error uploading file', error);
      //   }
      // );
    } else {
      console.warn('No file selected');
    }
    // this.dialogRef.close();
  }
}

