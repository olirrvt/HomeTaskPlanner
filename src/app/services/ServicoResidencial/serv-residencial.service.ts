import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { Servico } from 'src/app/models/Servico';

@Injectable({
  providedIn: 'root'
})
export class ServResidencialService {
  private url = "https://localhost:7005/api/Servicos/";

  constructor(
    private cookiesService: CookieService,
    private http: HttpClient
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

  obterTodosServicos(): Observable<Servico[]> {
    return this.http.get<Servico[]>(this.url + 'Servicos', this.getHttpOptionsWithAuth());
  }

  obterServicoPorId(id: number): Observable<Servico> {
    return this.http.get<Servico>(this.url + `Servico/${id}`, this.getHttpOptionsWithAuth());
  }

  criarServico(servico: Servico, moradorId: number): Observable<Servico> {
    return this.http.post<Servico>(this.url + `Servico/${moradorId}`, servico, this.getHttpOptionsWithAuth());
  }

  atualizarServico(id: number, servico: Servico): Observable<Servico> {
    return this.http.put<Servico>(this.url + `Servico/${id}/Editar`, servico, this.getHttpOptionsWithAuth());
  }

  atualizarStatusDoServico(id: number): Observable<Servico> {
    return this.http.put<Servico>(this.url + `Servico/${id}/StatusDoServico`, {}, this.getHttpOptionsWithAuth());
  }

  excluirServico(id: number): Observable<any> {
    return this.http.delete<any>(this.url + `Servico/${id}/Apagar`, this.getHttpOptionsWithAuth());
  }
}






