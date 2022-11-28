import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IBHoliday } from '../interfaces/ibholiday';
import { Iholiday } from '../interfaces/iholiday';

@Injectable({
  providedIn: 'root',
})
export class HolidayService {
  constructor(private HttpClient: HttpClient) {}

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('an error ocuured: ', error.error);
    } else {
      console.error(
        `Backend returned code ${error.status}, body was: `,
        error.error
      );
    }
    return throwError(() => new Error('error occured, please try again. '));
  }

  getHolodays(): Observable<any> {
    return this.HttpClient.get<Iholiday[]>(
      `${environment.BasicURL}holiday`
    ).pipe(retry(2), catchError(this.handleError));
  }

  // post
  postHoliday(newHoliday: Iholiday): Observable<Iholiday> {
    return this.HttpClient.post<Iholiday>(
      `${environment.BasicURL}holiday`,
      JSON.stringify(newHoliday)
    ).pipe(retry(2), catchError(this.handleError));
  }

  updateHoliday(id: string, newHoliday: any): Observable<Iholiday> {
    return this.HttpClient.put<Iholiday>(
      `${environment.BasicURL}holiday/${id}`,
      JSON.stringify(newHoliday)
    ).pipe(retry(2), catchError(this.handleError));
  }

  deleteHoliday(id: any) {
    return this.HttpClient.delete(`${environment.BasicURL}holiday/${id}`).pipe(
      retry(2),
      catchError(this.handleError)
    );
  }

  // ***********************BookedHolidays***********************************************************

  getBookedHolodays(): Observable<any> {
    return this.HttpClient.get<IBHoliday[]>(
      `${environment.BasicURL}bookedHoliday`
    ).pipe(retry(2), catchError(this.handleError));
  }

  updateBookedHolodays(id: string, newHoliday: any): Observable<IBHoliday> {
    return this.HttpClient.put<IBHoliday>(
      `${environment.BasicURL}bookedHoliday/${id}`,
      JSON.stringify(newHoliday)
    ).pipe(retry(2), catchError(this.handleError));
  }

  deleteBookedHolodays(id: any) {
    return this.HttpClient.delete(
      `${environment.BasicURL}bookedHoliday/${id}`
    ).pipe(retry(2), catchError(this.handleError));
  }
}
