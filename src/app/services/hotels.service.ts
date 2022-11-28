import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Icity } from '../interfaces/icity';
import { Ihotel } from '../interfaces/ihotel';

@Injectable({
  providedIn: 'root',
})
export class HotelsService {
  selectedID: String = '';
  selectedHotel: any = {};

  constructor(private HttpClient: HttpClient) {}

  getHotels(): Observable<any> {
    return this.HttpClient.get<Ihotel[]>(`${environment.BasicURL}hotel`)
  }

  // post
  postHotel(newHotel: Ihotel): Observable<Ihotel> {
    return this.HttpClient.post<Ihotel>(
      `${environment.BasicURL}hotel`,
      JSON.stringify(newHotel)
    )
  }

  updateHotel(id: string, newHotel: any): Observable<Ihotel> {
    return this.HttpClient.put<Ihotel>(
      `${environment.BasicURL}hotel/${id}`,
      JSON.stringify(newHotel)
    )
  }

  deleteHotel(id: any) {
    return this.HttpClient.delete(`${environment.BasicURL}hotel/${id}`)
  }

  // get cities
  getCities(): Observable<any> {
    return this.HttpClient.get<Icity[]>(`${environment.BasicURL}city`)
  }

  // post cities
  postCities(newCity: Icity): Observable<Icity> {
    return this.HttpClient.post<Icity>(
      `${environment.BasicURL}city`,
      JSON.stringify(newCity)
    )
  }

  deleteCity(id: any) {
    return this.HttpClient.delete(`${environment.BasicURL}city/${id}`)
  }

  /********************Booked hotels*************************************** */

  getBookedHotels(): Observable<any> {
    return this.HttpClient.get<Ihotel[]>(
      `${environment.BasicURL}bookedHotel`
    )
  }

  updateBookedHotels(id: string, newHotel: any): Observable<Ihotel> {
    return this.HttpClient.put<Ihotel>(
      `${environment.BasicURL}bookedHotel/${id}`,
      JSON.stringify(newHotel)
    )
  }

  deleteBookedHotels(id: any) {
    return this.HttpClient.delete(
      `${environment.BasicURL}bookedHotel/${id}`
    )
  }



// calc total price
getBookedHotelsTotalPrice(id:any): Observable<any>{
  return this.HttpClient.get<Ihotel[]>(`${environment.BasicURL}bookedHotel/agg?id=${id}`)
  
}
}
