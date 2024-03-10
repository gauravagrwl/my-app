import { Component } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';


@Component({
  selector: 'app-trading',
  standalone: true,
  imports: [
    MatTabsModule,
  ],
  templateUrl: './statements.component.html',
  styleUrl: './statements.component.scss'
})
export class StatementsComponent {
}


//TODO: Upload Account Statments - Gsheet
//TODO: Upload Accunt statement - downloaded from bank
//TODO: Display Statements.
//TODO: Docker Java applications and push to docker.
//TODO: Docker Angular application and push to docker.
//TODO: Integrate TODO work lists.
