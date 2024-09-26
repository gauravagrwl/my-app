import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, catchError, lastValueFrom, tap, throwError } from 'rxjs';
import { CashFlowReportModel } from '../model/accounts.model';

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  baseUrl = environment.appUrlHost + "report/";

  constructor(private httpClient: HttpClient) { }

  getCashFlowYearList(): Observable<number[]> {
    const yearListUrl = "getCashFlowYearList"
    return this.httpClient.get<number[]>(this.baseUrl + yearListUrl)
      .pipe(catchError(this.handleError));
  }

  getCashFlowReportByYear(year: number): Observable<any> {
    const cashFlowReport = "getCashFlowReportByYear"
    const param = new HttpParams().set('year', year);

    return this.httpClient.get<any>(this.baseUrl + cashFlowReport, { params: param })
      .pipe(catchError(this.handleError));
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
