import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { Task } from '../models/task.model';
import { tasks } from './../../assets/mock-task';
import { Injectable } from '@angular/core';
import { Observable, catchError, lastValueFrom, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root',
})
export class TaskService {
  baseUrl = environment.taskUrl;

  private tasks: Task[] = tasks;

  constructor(private httpClient: HttpClient) {}

  getSuggestions(title: string): Task[] {
    throw new Error('Method not implemented.');
  }

  createNewTask(task: Task): Observable<any> {
    return this.httpClient
      .post(this.baseUrl + 'add', task)
      .pipe(catchError(this.handleError));
  }

  async getTasks(): Promise<Task[]> {
    const res = this.httpClient
      .get<Task[]>(this.baseUrl + 'getAll')
      .pipe(catchError(this.handleError));
    return await lastValueFrom(res);
  }

  markCompleteTask(id: String): Observable<any> {
    const param = new HttpParams().set('id', id.toString());
    console.log(id);

    return this.httpClient
      .patch(this.baseUrl + 'markComplete', {}, { params: param })
      .pipe(catchError(this.handleError));
  }

  deleteTask(id: String): Observable<any> {
    const param = new HttpParams().set('id', id.toString());
    return this.httpClient
      .delete(this.baseUrl + 'delete', {
        params: param,
      })
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
