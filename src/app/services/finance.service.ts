import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, lastValueFrom, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { UserAccount } from '../models/user-account.model';

@Injectable({
  providedIn: 'root'
})
export class FinanceService {
  baseUrl = environment.appUrlHost;

  constructor(private httpClient: HttpClient) { }


  async getUserAccounts(userId: String): Promise<UserAccount[]>{
    const userAccount = "userAccounts/getAccounts"
    const param = new HttpParams().set('userName', userId.toString());
    const res = this.httpClient.get<UserAccount[]>(this.baseUrl + userAccount, {params: param})
    .pipe(catchError(this.handleError));
    return await lastValueFrom(res);
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
