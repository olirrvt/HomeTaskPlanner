import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { Reserva } from '../../models/Reserva';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class ReservaService {

  private url = 'https://localhost:7005/Reservas';

  constructor ( 
    private httpClient: HttpClient,
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

  getAllReservas(): Observable<Reserva[]> {
    const httpOptionsWithAuth = this.getHttpOptionsWithAuth();

    const apiUrl = `${this.url}/Reservas`;
    return this.httpClient.get<Reserva[]>(apiUrl, httpOptionsWithAuth);
  }

  getReservaById(id: number): Observable<Reserva> {
    const httpOptionsWithAuth = this.getHttpOptionsWithAuth();

    const apiUrl = `${this.url}/Reserva/${id}`;
    return this.httpClient.get<Reserva>(apiUrl, httpOptionsWithAuth);
  }

  createReserva(id: number, reserva: Reserva): Observable<Reserva> {
    const httpOptionsWithAuth = this.getHttpOptionsWithAuth();

    const apiUrl = `${this.url}/Reserva/${id}`;
    return this.httpClient.post<Reserva>(apiUrl, reserva, httpOptionsWithAuth);
  }

  updateReserva(id: number, reserva: Reserva): Observable<Reserva> {
    const httpOptionsWithAuth = this.getHttpOptionsWithAuth();

    const apiUrl = `${this.url}/Reserva/${id}/Editar`;
    return this.httpClient.put<Reserva>(apiUrl, reserva, httpOptionsWithAuth);
  }
  
  deleteReserva(id: number): Observable<any> {
    const httpOptionsWithAuth = this.getHttpOptionsWithAuth();

    const apiUrl = `${this.url}/Reserva/${id}/Apagar`;
    return this.httpClient.delete<any>(apiUrl, httpOptionsWithAuth);
  }

}
