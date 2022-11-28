import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { ICredentials } from '../interfaces/icredentials';
import { IUser } from '../interfaces/iuser';
@Injectable({
  providedIn: 'root',
})
export class AuthAPIServiceService {
  constructor(private http: HttpClient) {}

  loggin(credentials: ICredentials): Observable<IUser> {
    return this.http.post<IUser>(
      `${environment.BasicURL}auth/signin`,
      JSON.stringify(credentials)
    );
  }
  register(userData: any): Observable<IUser> {
    return this.http.post<IUser>(
      `${environment.BasicURL}auth/signup`,
      JSON.stringify(userData)
    );
  }
  logout(): Observable<any> {
    return this.http.post<IUser>(`${environment.BasicURL}auth/signout`, {});
  }
}
