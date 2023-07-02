import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Ocorrencia } from '../models/Ocorrencia';
import { Observable } from 'rxjs';
import { Morador } from '../models/Morador';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class OcorrenciaService {
  private url = 'https://localhost:7005/Ocorrencia/';

  constructor(private http: HttpClient) { }

  getAllOcorrencias(): Observable<Ocorrencia[]> {
    return this.http.get<Ocorrencia[]>(`${this.url}Ocorrencia/Ocorrencias`);
  }

  getOcorrenciaById(id: number): Observable<Ocorrencia> {
    return this.http.get<Ocorrencia>(`${this.url}Ocorrencia/${id}`);
  }

  createOcorrencia(ocorrencia: Ocorrencia, moradorId: number): Observable<Ocorrencia> {
    return this.http.post<Ocorrencia>(`${this.url}Ocorrencia/${moradorId}`, ocorrencia, httpOptions);
  }

  updateOcorrencia(ocorrencia: Ocorrencia, id: number): Observable<Ocorrencia> {
    return this.http.put<Ocorrencia>(`${this.url}Ocorrencia/${id}/Editar`, ocorrencia, httpOptions);
  }

  deleteOcorrencia(id: number): Observable<any> {
    return this.http.delete(`${this.url}Ocorrencia/${id}/Apagar`);
  }

}
