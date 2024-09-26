import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class HoldingService {


  statementUrl = environment.appUrlHost + "report/";


  constructor(private httpClient: HttpClient) { }


  getHoldings(id: string): Observable<any[]> {

    const accountStatement = "getUserHoldings"
    const param = new HttpParams().set('accountId', id);
    return this.httpClient.get<any[]>(this.statementUrl + accountStatement, { params: param })
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
