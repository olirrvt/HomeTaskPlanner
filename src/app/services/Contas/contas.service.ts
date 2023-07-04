import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Contas } from '../../models/Conta';
import { Observable } from 'rxjs';
import { Morador } from '../../models/Morador';

@Injectable({
  providedIn: 'root'
})
export class ContasService {
  private url = 'https://localhost:7005/Contas';

  constructor (
    private httpClient: HttpClient,
    private cookieService: CookieService 
    ) { }

  private getHttpOptionsWithAuth(): { headers: HttpHeaders } {
      const token = this.cookieService.get('token');
      const httpOptionsWithAuth = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        })
      };
      return httpOptionsWithAuth;
  }

  addConta(conta: Contas): Observable<Contas> {
    const apiUrl = `${this.url}/ContaApp/${conta.moradorId}`;
    const httpOptionsWithAuth = this.getHttpOptionsWithAuth();

    return this.httpClient.post<Contas>(apiUrl, conta, httpOptionsWithAuth)
  }

  getAllContas(): Observable<Contas[]> {
    const apiUrl = `${this.url}/contas`;
    const httpOptionsWithAuth = this.getHttpOptionsWithAuth();

    return this.httpClient.get<Contas[]>(apiUrl, httpOptionsWithAuth);
  }

  getContaById(contaId: number): Observable<Contas> {
    const apiUrl = `${this.url}/Conta/${contaId}`;
    const httpOptionsWithAuth = this.getHttpOptionsWithAuth();

    return this.httpClient.get<Contas>(apiUrl, httpOptionsWithAuth);
  }

  updateConta(conta: Contas): Observable<Contas> {
    const apiUrl = `${this.url}/ContaApp/${conta.id}/Editar`;
    const httpOptionsWithAuth = this.getHttpOptionsWithAuth();

    return this.httpClient.put<Contas>(apiUrl, conta, httpOptionsWithAuth);
  }

  pagarConta(conta: Contas): Observable<Contas> {
    const apiUrl = `${this.url}/ContaApp/${conta.id}/Pagar`;
    const httpOptionsWithAuth = this.getHttpOptionsWithAuth();

    return this.httpClient.put<Contas>(apiUrl, conta, httpOptionsWithAuth);
  }

  deleteConta(contaId: number): Observable<Contas> {
    const apiUrl = `${this.url}/ContaApp/${contaId}/Apagar`;
    const httpOptionsWithAuth = this.getHttpOptionsWithAuth();

    return this.httpClient.delete<Contas>(apiUrl, httpOptionsWithAuth)
  }

}
