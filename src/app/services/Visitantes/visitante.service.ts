import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { Visitante } from '../../models/Visitante';

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

  constructor (
    private httpClient: HttpClient,
    private cookiesService: CookieService ) {}

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

  getAllVisitantes(): Observable<Visitante[]> {
    const httpOptionsWithAuth = this.getHttpOptionsWithAuth();

    return this.httpClient.get<Visitante[]>(this.url + 'Visitantes', httpOptionsWithAuth);
  }

  getVisitanteById(id: number): Observable<Visitante> {
    const httpOptionsWithAuth = this.getHttpOptionsWithAuth();

    return this.httpClient.get<Visitante>(this.url + `Visitante/${id}`, httpOptionsWithAuth);
  }

  public obterVisitantesPorMorador(idMorador: number): Observable<Visitante[]> {
    const httpOptionsWithAuth = this.getHttpOptionsWithAuth();

    return this.httpClient.get<Visitante[]>(this.url + 'Morador/' + idMorador + '/Visitantes', httpOptionsWithAuth);
  }

  registerVisitante(visitante: Visitante, moradorId: number): Observable<Visitante> {
    const httpOptionsWithAuth = this.getHttpOptionsWithAuth();

    return this.httpClient.post<Visitante>(
      this.url + `Visitantes/${moradorId}/Cadastrar`,
      visitante,
      httpOptionsWithAuth
    );
  }

  updateVisitante(visitante: Visitante, id: number): Observable<Visitante> {
    const httpOptionsWithAuth = this.getHttpOptionsWithAuth();

    return this.httpClient.put<Visitante>(
      this.url + `Visitantes/${id}/Editar`,
      visitante,
      httpOptionsWithAuth
    );
  }

  deleteVisitante(id: number): Observable<void> {
    const httpOptionsWithAuth = this.getHttpOptionsWithAuth();

    return this.httpClient.delete<void>(this.url + `Visitante/${id}/Apagar`, httpOptionsWithAuth);
  }
}