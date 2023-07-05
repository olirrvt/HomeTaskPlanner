import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, forkJoin, of, switchMap, toArray } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { Morador } from '../../models/Morador';
import { Login } from '../../models/Login';

@Injectable({
  providedIn: 'root'
})
export class MoradorService {

  private url = 'https://localhost:7005/api/Morador';

  constructor(
    private http: HttpClient, 
    private cookieServices: CookieService ) { }

   private getHttpOptionsWithAuth(): { headers: HttpHeaders } {
      const token = this.cookieServices.get('token');
      const httpOptionsWithAuth = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        })
      };
      return httpOptionsWithAuth;
  }

  getAllMoradores(): Observable<Morador[]> {
    const apiUrl = `${this.url}/Moradores`
    const httpOptionsWithAuth = this.getHttpOptionsWithAuth();

    return this.http.get<Morador[]>(apiUrl, httpOptionsWithAuth);
  }

  getById(moradorId: number): Observable<Morador> {
    const apiUrl = `${this.url}/${moradorId}`;
    const httpOptionsWithAuth = this.getHttpOptionsWithAuth();

    return this.http.get<Morador>(apiUrl, httpOptionsWithAuth);
  }

  postMorador(morador: Morador): Observable<any> {
    const apiUrl = `${this.url}/Morador/Create`;
    return this.http.post(apiUrl, morador);
  }

  UpdateMorador(morador: Morador): Observable<any> {
    const apiUrl = `${this.url}/${morador.id}`;
    const httpOptionsWithAuth = this.getHttpOptionsWithAuth();

    return this.http.put(apiUrl, morador, httpOptionsWithAuth);
  }

  DeleteMorador(moradorId: number): Observable<any> {
    const apiUrl = `${this.url}/${moradorId}`;
    const httpOptionsWithAuth = this.getHttpOptionsWithAuth();

    return this.http.delete(apiUrl, httpOptionsWithAuth);
  }

  deleteMoradorAndRelatedItems(id: number): Observable<any> {
    const apiUrl = `${this.url}/${id}`;
    const httpOptionsWithAuth = this.getHttpOptionsWithAuth();
  
    return this.getById(id).pipe(
      switchMap((morador: Morador) => {
        if (!morador) {
          return of(null);
        }
  
        const idContas = morador.conta.map((m) => m.id);
        const idOcorrencias = morador.ocorrencia.map((oc) => oc.id);
        const idVisitantes = morador.visitantes.map((v) => v.id);
        const idReserva = morador.reservas.map((r) => r.id);
        const idProdutos = morador.produtos.map((p) => p.id);
        const idServicos = morador.servicos.map((s) => s.id);
  
        return forkJoin([
          ...idContas.map((i) => this.http.delete(`https://localhost:7005/Contas/ContaApp/${i}/Apagar`, httpOptionsWithAuth)),
          ...idOcorrencias.map((i) => this.http.delete(`https://localhost:7005/Ocorrencia/Ocorrencia/${i}/Apagar`, httpOptionsWithAuth)),
          ...idProdutos.map((i) => this.http.delete(`https://localhost:7005/Produto/Produto/${i}/Apagar`, httpOptionsWithAuth)),
          ...idReserva.map(i => this.http.delete(`https://localhost:7005/Reservas/Reserva/${i}/Apagar`, httpOptionsWithAuth)),
          ...idVisitantes.map((i) => this.http.delete(`https://localhost:7005/api/Visitantes/Visitante/${i}/Apagar`, httpOptionsWithAuth)),
          ...idServicos.map((i) => this.http.delete(`https://localhost:7005/api/Servicos/Servico/${i}/Apagar`, httpOptionsWithAuth)),
          this.http.delete(`${apiUrl}`, httpOptionsWithAuth)
        ]).pipe(
          // Utilize o operador toArray para combinar os resultados em um único array
          toArray()
        );
      })
    );
  }

}