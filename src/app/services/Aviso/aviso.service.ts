import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Aviso } from 'src/app/models/Aviso';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class AvisoService {
  private url = 'https://localhost:7005/Avisos/';

  constructor(private http: HttpClient) { }

  createAviso(aviso: Aviso): Observable<Aviso> {
    return this.http.post<Aviso>(this.url + 'Aviso', aviso, httpOptions);
  }

  getAvisos(): Observable<Aviso[]> {
    return this.http.get<Aviso[]>(this.url + 'Avisos');
  }

  getAvisoById(id: number): Observable<Aviso> {
    return this.http.get<Aviso>(this.url + `Aviso/${id}`);
  }

  updateAviso(aviso: Aviso, id: number): Observable<Aviso> {
    return this.http.put<Aviso>(this.url + `Aviso/${id}`, aviso, httpOptions);
  }

  deleteAviso(id: number): Observable<any> {
    return this.http.delete(this.url + `Aviso/${id}`);
  }

}
