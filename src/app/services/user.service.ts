import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private URL = `${environment.API_URL}envice/user`;

  constructor(
    private http: HttpClient,
  ) { }

  list(params = {}): Observable<any> {
    return this.http.get<any>(this.URL, { params });
  }

  add(data: any): Observable<any> {
    return this.http.post<any>(this.URL, data);
  }

  edit(data: any): Observable<any> {
    return this.http.put<any>(this.URL, data);
  }

  delete(params: any): Observable<any> {
    return this.http.delete<any>(this.URL, { params });
  }
}
