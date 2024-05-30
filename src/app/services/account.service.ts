import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, catchError, lastValueFrom, tap, throwError } from 'rxjs';
import { AccountModel, AccountStatementModel } from '../model/accounts.model';
import { Statement } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class AccountService {




  baseUrl = environment.appUrlHost + "profileAccount/";
  statementUrl = environment.appUrlHost + "accountStatement/";




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
    const allAccountUrl = "getAccounts"
    return this.httpClient.get<AccountModel[]>(this.baseUrl + allAccountUrl)
      .pipe(catchError(this.handleError))
  }

  getAllInvestmentAccounts(institutionCategory: string): Observable<any[]> {
    const allAccountUrl = "getAccounts"
    const param = new HttpParams().set('institutionCategory', institutionCategory);
    return this.httpClient.get<any[]>(this.baseUrl + allAccountUrl, { params: param })
      .pipe(catchError(this.handleError))
  }

  getSelectedAccount(id: string): Observable<AccountModel> {
    const allAccountUrl = "getAccount"
    const param = new HttpParams().set('accountId', id);
    return this.httpClient.get<AccountModel>(this.baseUrl + allAccountUrl, { params: param })
      .pipe(catchError(this.handleError))
  }


  getAccountStatement(id: string): Observable<AccountStatementModel[]> {

    const accountStatement = "getAccountStatement"
    const param = new HttpParams().set('accountId', id);
    return this.httpClient.get<AccountStatementModel[]>(this.statementUrl + accountStatement, { params: param })
      .pipe(catchError(this.handleError))
  }


  deleteAccountTransaction(accountId: string, transactionId: string): Observable<any> {
    const deleteTransactionUrl = "deleteTransaction";
    const param = new HttpParams().set('accountId', accountId).set('transactionId', transactionId);
    return this.httpClient.delete(this.statementUrl + deleteTransactionUrl, { params: param, responseType: 'text' })
      .pipe(catchError(this.handleError))

  }

  deleteAccount(id: string): Observable<any> {
    const deleteAccountUrl = "deleteAccount";
    const param = new HttpParams().set('accountId', id);
    return this.httpClient.delete(this.baseUrl + deleteAccountUrl, { params: param, responseType: 'text' })
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
