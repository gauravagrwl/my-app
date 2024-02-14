import { NgModule } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {MatCardModule} from '@angular/material/card';

const AppMaterialModules = [
  MatButtonModule,
  MatToolbarModule,
  MatIconModule,
  MatTooltipModule,
  MatMenuModule,
  MatTableModule,
  MatInputModule,
  MatFormFieldModule,
  MatRadioModule,
  MatCheckboxModule,
  FormsModule,
  MatSlideToggleModule,
  MatNativeDateModule,
  MatDatepickerModule,
  MatCardModule
];

@NgModule({
  exports: [AppMaterialModules],
})
export class AppMaterialModule {}
