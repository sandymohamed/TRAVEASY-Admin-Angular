import { Injectable } from '@angular/core';
import {  HttpClient,  HttpErrorResponse,  HttpHeaders} from '@angular/common/http';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IflightBooking } from '../interfaces/iflight-booking';

@Injectable({
  providedIn: 'root'
})
export class FlightBookingBookingServiceService {

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

  // Function For Get All FlightBooking
  getFlightBooking(): Observable<any> {
    return this.HttpClient.get<IflightBooking[]>(
      `${environment.BasicURL}flightBookingBooking`
    ).pipe(retry(2), catchError(this.handleError));
  }

  // Creaete FlightBooking add in database
  postFlightBooking(newFlightBooking: IflightBooking): Observable<IflightBooking> {
    return this.HttpClient.post<IflightBooking>(
      `${environment.BasicURL}flightBookingBooking`,
      JSON.stringify(newFlightBooking)
    ).pipe(retry(2), catchError(this.handleError));
  }
// Fun For Update FlightBooking
  updateFlightBooking(id: string, newFlightBooking: any): Observable<IflightBooking> {
    return this.HttpClient.put<IflightBooking>(
      `${environment.BasicURL}flightBookingBooking/${id}`,
      JSON.stringify(newFlightBooking)
    ).pipe(retry(2), catchError(this.handleError));
  }

  deleteFlightBooking(id: any) {
    return this.HttpClient.delete(`${environment.BasicURL}flightBookingBooking/${id}`).pipe(
      retry(2),
      catchError(this.handleError)
    );
  }

}
