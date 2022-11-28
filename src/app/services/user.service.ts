import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { IUser } from '../interfaces/iuser';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  // users: IUser[] = [];

  constructor(private http: HttpClient) {}
  getUserBoard(): Observable<any> {
    return this.http.get(`${environment.BasicURL}test/user`, {
      responseType: 'text',
    });
  }

  getAllUsers(): Observable<IUser[]> {
    return this.http.get<IUser[]>(`${environment.BasicURL}admin/users`);
  }
  removeUser(userId: string | number): Observable<any> {
    return this.http.delete<any>(
      `${environment.BasicURL}admin/users/remove/${userId}`
    );
  }
  getStatistics(): Observable<any> {
    return this.http.get<any>(`${environment.BasicURL}admin/statistics/`);
  }
}
