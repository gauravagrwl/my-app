import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  baseUrl = environment.appUrlHost + "upload/";


  constructor(private httpClient: HttpClient) { }

  uploadData(formData: FormData, id: string, docType: string): Observable<string> {
    const uploadStatementUrl = "uploadDocuments";
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
