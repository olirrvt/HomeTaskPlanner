import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { Morador } from '../../models/Morador';
import { Login } from '../../models/Login';

@Injectable({
  providedIn: 'root'
})
export class MoradorService {

  private url = 'https://localhost:7005/api/Morador';

  constructor(
    private http: HttpClient, 
    private cookieServices: CookieService ) { }

   private getHttpOptionsWithAuth(): { headers: HttpHeaders } {
      const token = this.cookieServices.get('token');
      const httpOptionsWithAuth = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        })
      };
      return httpOptionsWithAuth;
  }

  getAllMoradores(): Observable<Morador[]> {
    const apiUrl = `${this.url}/Moradores`
    const httpOptionsWithAuth = this.getHttpOptionsWithAuth();

    return this.http.get<Morador[]>(apiUrl, httpOptionsWithAuth);
  }

  getById(moradorId: number): Observable<Morador> {
    const apiUrl = `${this.url}/${moradorId}`;
    const httpOptionsWithAuth = this.getHttpOptionsWithAuth();

    return this.http.get<Morador>(apiUrl, httpOptionsWithAuth);
  }

  postMorador(morador: Morador): Observable<any> {
    const apiUrl = `${this.url}/Morador/Create`;

    return this.http.post(apiUrl, morador);
  }

  UpdateMorador(morador: Morador): Observable<any> {
    const apiUrl = `${this.url}/${morador.moradorId}`;
    const httpOptionsWithAuth = this.getHttpOptionsWithAuth();

    return this.http.put(apiUrl, morador, httpOptionsWithAuth);
  }

  DeleteMorador(moradorId: number): Observable<any> {
    const apiUrl = `${this.url}/${moradorId}`;
    const httpOptionsWithAuth = this.getHttpOptionsWithAuth();

    return this.http.delete(apiUrl, httpOptionsWithAuth);
  }

}