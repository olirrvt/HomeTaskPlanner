import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Ocorrencia } from '../../models/Ocorrencia';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { Morador } from '../../models/Morador';

@Injectable({
  providedIn: 'root'
})
export class OcorrenciaService {
  private url = 'https://localhost:7005/Ocorrencia/';

  constructor(
    private http: HttpClient,
    private cookiesService: CookieService) { }

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

  getAllOcorrencias(): Observable<Ocorrencia[]> {
    const httpOptionsWithAuth = this.getHttpOptionsWithAuth();

    return this.http.get<Ocorrencia[]>(`${this.url}Ocorrencias`, httpOptionsWithAuth);
  }

  getOcorrenciaById(id: number): Observable<Ocorrencia> {
    const httpOptionsWithAuth = this.getHttpOptionsWithAuth();

    return this.http.get<Ocorrencia>(`${this.url}Ocorrencia/${id}`, httpOptionsWithAuth);
  }

  createOcorrencia(ocorrencia: Ocorrencia, moradorId: number): Observable<Ocorrencia> {
    const httpOptionsWithAuth = this.getHttpOptionsWithAuth();

    return this.http.post<Ocorrencia>(`${this.url}Ocorrencia/${moradorId}`, ocorrencia, httpOptionsWithAuth);
  }

  updateOcorrencia(ocorrencia: Ocorrencia, id: number): Observable<Ocorrencia> {
    const httpOptionsWithAuth = this.getHttpOptionsWithAuth();

    return this.http.put<Ocorrencia>(`${this.url}Ocorrencia/${id}/Editar`, ocorrencia, httpOptionsWithAuth);
  }

  deleteOcorrencia(id: number): Observable<any> {
    const httpOptionsWithAuth = this.getHttpOptionsWithAuth();

    return this.http.delete(`${this.url}Ocorrencia/${id}/Apagar`, httpOptionsWithAuth);
  }

}
