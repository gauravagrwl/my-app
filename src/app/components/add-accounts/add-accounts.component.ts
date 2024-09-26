import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators, ReactiveFormsModule, FormControl } from '@angular/forms';
import { AccountService } from '../../services/account.service';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';

//TODO: Based on account category and type change the selections. 
@Component({
  selector: 'app-add-accounts',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MatTooltipModule,
    MatButtonModule
  ],
  templateUrl: './add-accounts.component.html',
  styleUrl: './add-accounts.component.scss'
})
export class AddAccountsComponent implements OnInit {

  public _parentForm!: FormGroup;
  @Output() formClose = new EventEmitter();

  // Account number and institution code ( account number, routing number iifc code, account type)
  public _accountDetailForm!: FormGroup

  // Institution name, currency, category (name, tye, currency)
  public _institutionForm!: FormGroup;

  // Add more accounts
  // public _AddAccounts!: FormArray;

  accountTypeList!: any;
  accountCatList!: any;

  constructor(private _fb: FormBuilder, private accountService: AccountService) { }
  ngOnInit() {
    this.buildAccountDetailForm()
    this.buildInstitutionForm()
    this.buildParentForm()
    this.accountService.getAccountTypeList().subscribe({
      next: (data) => this.accountTypeList = data
    })

    this.accountService.getAccountCatList().subscribe({
      next: (data) => this.accountCatList = data
    })
    console.log(this.accountTypeList)
  }


  addAccount(form: FormGroup<any>) {
    const userAccount = buildAccountModel(this._parentForm.value);
    console.log('Form Submitted')
    console.log(this._parentForm.value)
  }

  onSubmit(form: FormGroup) {
    let data = Object.assign({}, form.value.accountDetails, form.value.institutionDetails);
    this.accountService.addAccount(data).subscribe({
      next: () => this.formClose.emit()
    })
  }

  buildParentForm() {
    this._parentForm = this._fb.group({
      accountDetails: this._accountDetailForm,
      institutionDetails: this._institutionForm
    })
  }

  buildAccountDetailForm() {
    this._accountDetailForm = this._fb.group({
      accountNumber: ['', Validators.required],
      accountCode: [''],
      accountCodeType: [''], // Radio option IFC code or routing number
      holdingType: ['', Validators.required],
      accountType: ['', Validators.required], // Based on Institution category

      // "accountNumber": "3004171363",
      // "accountHoldingType": "Self",
      // "routingNumber": "071000013", is account code

    })
  }
  buildInstitutionForm() {
    this._institutionForm = this._fb.group({
      institutionName: ['', Validators.required],
      institutionCurrency: ['', Validators.required],
      institutionCategory: ['', Validators.required],
      // "accountType": "SAVING",
      // "institutionName": "Chase",
      // "institutionCurrency": "USD",
      // "accountCategory": "BANKING",

    })
  }
}




function buildAccountModel(value: any) {
  throw new Error('Function not implemented.');
}

function next(value: string[]): void {
  throw new Error('Function not implemented.');
}
// ngOnInit() {
//   this._name = this._fb.group({
//     fname: ['', [Validators.required]],
//     lname: ['', [Validators.required]]
//   });
//   this._addr = this._fb.group({
//     addr1: ['', [Validators.required]],
//     addr2: [''],
//     city: ['', [Validators.required]],
//     state: ['', [Validators.required]],
//     zip: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(5)]],
//   });
//   this._items = this._fb.array(
//     [this.createItemFormGroup()]
//   );
//   this._parentForm = this._fb.group({
//     name: this._name,
//     addr: this._addr,
//     items: this._items
//   });
// }
// createItemFormGroup() {
//   return this._fb.group({
//     name: ['', Validators.required],
//     qty: ['1', Validators.required],
//     price: ['', Validators.required]
//   });
// }
// addItem() {
//   this._items.push(this.createItemFormGroup());
// }
// deleteItem(index) {
//   delete this._items[index];
// }
// onSubmit(form: FormGroup) {
//   alert('Submitted');
// }
