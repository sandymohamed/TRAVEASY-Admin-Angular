import { Injectable } from '@angular/core';
import {  HttpClient,  HttpErrorResponse,  HttpHeaders} from '@angular/common/http';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IFlight } from '../interfaces/iflight';
import { Iflightpost } from '../interfaces/iflightpost';

@Injectable({
  providedIn: 'root'
})
export class FlightServiceService {

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

  // Function For Get All Flight
  getFlight(page : number): Observable<any> {
    return this.HttpClient.get<IFlight[]>(
      `${environment.BasicURL}flight?page=${page}`
    ).pipe(retry(2), catchError(this.handleError));
  }

  // Creaete Flight add in database
  postFlight(newFlight: Iflightpost): Observable<Iflightpost> {
    return this.HttpClient.post<Iflightpost>(
      `${environment.BasicURL}flight`,
      JSON.stringify(newFlight)
    ).pipe(retry(2), catchError(this.handleError));
  }
// Fun For Update Flight
  updateFlight(id: string, newFlight: any): Observable<IFlight> {
    return this.HttpClient.put<IFlight>(
      `${environment.BasicURL}flight/${id}`,
      JSON.stringify(newFlight)
    ).pipe(retry(2), catchError(this.handleError));
  }

  deleteFlight(id: any) {
    return this.HttpClient.delete(`${environment.BasicURL}flight/${id}`).pipe(
      retry(2),
      catchError(this.handleError)
    );
  }


}
