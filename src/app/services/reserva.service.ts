import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Reserva } from '../models/Reserva';


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

  constructor( private httpClient: HttpClient ) { }

  getAllReservas(): Observable<Reserva[]> {
    const apiUrl = `${this.url}/Reservas`;
    return this.httpClient.get<Reserva[]>(apiUrl);
  }

  getReservaById(id: number): Observable<Reserva> {
    const apiUrl = `${this.url}/Reserva/${id}`;
    return this.httpClient.get<Reserva>(apiUrl);
  }

  createReserva(id: number, reserva: Reserva): Observable<Reserva> {
    const apiUrl = `${this.url}/Reserva/${id}`;
    return this.httpClient.post<Reserva>(apiUrl, reserva, httpOptions);
  }

  updateReserva(id: number, reserva: Reserva): Observable<Reserva> {
    const apiUrl = `${this.url}/Reserva/${id}/Editar`;
    return this.httpClient.put<Reserva>(apiUrl, reserva, httpOptions);
  }
  
  deleteReserva(id: number): Observable<any> {
    const apiUrl = `${this.url}/Reserva/${id}/Apagar`;
    return this.httpClient.delete<any>(apiUrl);
  }

}
