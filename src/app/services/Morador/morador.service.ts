import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Morador } from '../../models/Morador';
import { Login } from '../../models/Login';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class MoradorService {

  private url = 'https://localhost:7005/api/Morador';

  constructor(private http: HttpClient) { }

  getAllMoradores(): Observable<Morador[]> {
    const apiUrl = `${this.url}/Moradores`
    return this.http.get<Morador[]>(apiUrl);
  }

  getById(moradorId: number): Observable<Morador> {
    const apiUrl = `${this.url}/${moradorId}`;
    return this.http.get<Morador>(apiUrl);
  }

  postMorador(morador: Morador): Observable<any> {
    const apiUrl = `${this.url}/Morador/Create`;
    return this.http.post(apiUrl, morador, httpOptions);
  }

  UpdateMorador(morador: Morador): Observable<any> {
    const apiUrl = `${this.url}/${morador.moradorId}`;
    return this.http.put(apiUrl, morador, httpOptions);
  }

  DeleteMorador(moradorId: number): Observable<any> {
    const apiUrl = `${this.url}/${moradorId}`;
    return this.http.delete(apiUrl, httpOptions);
  }

}