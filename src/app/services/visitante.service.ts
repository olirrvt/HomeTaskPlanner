import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Visitante } from '../models/Visitante';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class VisitanteService {
  private url = 'https://localhost:7005/api/Visitantes/';

  constructor(private httpClient: HttpClient) {}

  getAllVisitantes(): Observable<Visitante[]> {
    return this.httpClient.get<Visitante[]>(this.url + 'Visitantes');
  }

  getVisitanteById(id: number): Observable<Visitante> {
    return this.httpClient.get<Visitante>(this.url + `Visitante/${id}`);
  }

  public obterVisitantesPorMorador(idMorador: number): Observable<Visitante[]> {
    return this.httpClient.get<Visitante[]>(this.url + 'Morador/' + idMorador + '/Visitantes');
  }

  registerVisitante(visitante: Visitante, moradorId: number): Observable<Visitante> {
    return this.httpClient.post<Visitante>(
      this.url + `Visitantes/${moradorId}/Cadastrar`,
      visitante,
      httpOptions
    );
  }

  updateVisitante(visitante: Visitante, id: number): Observable<Visitante> {
    return this.httpClient.put<Visitante>(
      this.url + `Visitantes/${id}/Editar`,
      visitante,
      httpOptions
    );
  }

  deleteVisitante(id: number): Observable<void> {
    return this.httpClient.delete<void>(this.url + `Visitante/${id}/Apagar`);
  }
}