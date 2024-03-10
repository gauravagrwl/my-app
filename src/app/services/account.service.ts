import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, catchError, lastValueFrom, tap, throwError } from 'rxjs';
import { AccountModel, AccountStatementModel } from '../model/accounts.model';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  deleteAccountTransaction(accountId: string, transactionId: string): Observable<any> {
    const deleteTransactionUrl = "deleteTransaction";
    const param = new HttpParams().set('accountId', accountId).set('transactionId', transactionId);
    return this.httpClient.delete(this.baseUrl + deleteTransactionUrl, { params: param, responseType: 'text' })
      .pipe(catchError(this.handleError))

  }
  baseUrl = environment.appUrlHost + "profileAccount/";

  constructor(private httpClient: HttpClient) { }

  toggleIsAccountActive(id: string): Observable<string> {
    const toggleAccountActiveUrl = "toggleAccountActive";
    const param = new HttpParams().set('accountId', id);
    return this.httpClient.patch(this.baseUrl + toggleAccountActiveUrl, null, { params: param, responseType: 'text' })
      .pipe(catchError(this.handleError))
  }

  getAccountTypeList(): Observable<string[]> {
    const getAccountTypeUrl = "accountsType"

    return this.httpClient.get<string[]>(this.baseUrl + getAccountTypeUrl)
      .pipe(catchError(this.handleError));
  }

  getAccountCatList(): Observable<string[]> {
    const getAccountCatListUrl = "accountsCategory"

    return this.httpClient.get<string[]>(this.baseUrl + getAccountCatListUrl)
      .pipe(catchError(this.handleError));
  }

  addAccount(data: DataTransferItem): Observable<any> {
    const addAccount = "addAccount"
    return this.httpClient
      .post(this.baseUrl + addAccount, data)
      .pipe(catchError(this.handleError));
  }

  getAllAccounts(): Observable<AccountModel[]> {
    const allAccountUrl = "getUserAccounts"
    return this.httpClient.get<AccountModel[]>(this.baseUrl + allAccountUrl)
      .pipe(catchError(this.handleError))
  }

  getSelectedAccount(id: string): Observable<AccountModel> {
    const allAccountUrl = "getUserAccount"
    const param = new HttpParams().set('accountId', id);
    return this.httpClient.get<AccountModel>(this.baseUrl + allAccountUrl, { params: param })
      .pipe(catchError(this.handleError))
  }


  getAccountStatement(id: string): Observable<AccountStatementModel[]> {
    const accountStatement = "accountStatements"
    const param = new HttpParams().set('accountId', id);
    return this.httpClient.get<AccountStatementModel[]>(this.baseUrl + accountStatement, { params: param })
      .pipe(catchError(this.handleError))
  }

  uploadAccountStatement(formData: FormData, id: string): Observable<string> {
    const uploadStatementUrl = "uploadStatements";
    const param = new HttpParams().set('accountId', id);
    return this.httpClient.post(this.baseUrl + uploadStatementUrl, formData, { params: param, responseType: 'text' })
      .pipe(catchError(this.handleError))
  }

  private handleError(error: HttpErrorResponse) {
    console.log(error);
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `,
        error.error
      );
    }
    // Return an observable with a user-facing error message.
    return throwError(
      () => new Error('Something bad happened; please try again later.')
    );
  }
}
