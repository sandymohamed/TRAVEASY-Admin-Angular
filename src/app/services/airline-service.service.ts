import { Injectable } from '@angular/core';
import {  HttpClient,  HttpErrorResponse,  HttpHeaders} from '@angular/common/http';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IAirline } from '../interfaces/iairline';

@Injectable({
  providedIn: 'root'
})
export class AirlineServiceService {

  constructor(private HttpClient: HttpClient) { }

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

  // Function For Get All Airline
  getAirline(): Observable<any> {
    return this.HttpClient.get<IAirline[]>(
      `${environment.BasicURL}airline`
    ).pipe(retry(2), catchError(this.handleError));
  }

  // Creaete Airline add in database
  postAirline(newAirline: IAirline): Observable<IAirline> {
    return this.HttpClient.post<IAirline>(
      `${environment.BasicURL}airline`,
      JSON.stringify(newAirline)
    ).pipe(retry(2), catchError(this.handleError));
  }
// Fun For Update Airline
  updateAirline(id: string, newAirline: any): Observable<IAirline> {
    return this.HttpClient.put<IAirline>(
      `${environment.BasicURL}airline/${id}`,
      JSON.stringify(newAirline)
    ).pipe(retry(2), catchError(this.handleError));
  }

  deleteAirline(id: any) {
    return this.HttpClient.delete(`${environment.BasicURL}airline/${id}`).pipe(
      retry(2),
      catchError(this.handleError)
    );
  }

}
