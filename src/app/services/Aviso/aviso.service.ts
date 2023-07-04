import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Aviso } from 'src/app/models/Aviso';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AvisoService {
  private url = 'https://localhost:7005/Avisos/';

  constructor(
    private http: HttpClient,
    private cookiesService: CookieService
  ) { }

  private getHttpOptionsWithAuth(): { headers: HttpHeaders } {
    const token = this.cookiesService.get('token');
    const httpOptionsWithAuth = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    };
    return httpOptionsWithAuth;
  }

  createAviso(aviso: Aviso): Observable<Aviso> {
    const httpOptionsWithAuth = this.getHttpOptionsWithAuth();
    return this.http.post<Aviso>(this.url + 'Aviso', aviso, httpOptionsWithAuth);
  }

  getAvisos(): Observable<Aviso[]> {
    const httpOptionsWithAuth = this.getHttpOptionsWithAuth();
    return this.http.get<Aviso[]>(this.url + 'Avisos', httpOptionsWithAuth);
  }

  getAvisoById(id: number): Observable<Aviso> {
    const httpOptionsWithAuth = this.getHttpOptionsWithAuth();
    return this.http.get<Aviso>(this.url + `Aviso/${id}`, httpOptionsWithAuth);
  }

  updateAviso(aviso: Aviso, id: number): Observable<Aviso> {
    const httpOptionsWithAuth = this.getHttpOptionsWithAuth();
    return this.http.put<Aviso>(this.url + `Aviso/${id}`, aviso, httpOptionsWithAuth);
  }

  deleteAviso(id: number): Observable<any> {
    const httpOptionsWithAuth = this.getHttpOptionsWithAuth();
    return this.http.delete(this.url + `Aviso/${id}`, httpOptionsWithAuth);
  }

}