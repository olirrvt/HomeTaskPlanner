import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Conta } from '../../models/Conta';
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

  addConta(conta: Conta): Observable<Conta> {
    const apiUrl = `${this.url}/ContaApp/${conta.moradorId}`;
    const httpOptionsWithAuth = this.getHttpOptionsWithAuth();

    return this.httpClient.post<Conta>(apiUrl, conta, httpOptionsWithAuth)
  }

  getAllContas(): Observable<Conta[]> {
    const apiUrl = `${this.url}/contas`;
    const httpOptionsWithAuth = this.getHttpOptionsWithAuth();

    return this.httpClient.get<Conta[]>(apiUrl, httpOptionsWithAuth);
  }

  getContaById(contaId: number): Observable<Conta> {
    const apiUrl = `${this.url}/Conta/${contaId}`;
    const httpOptionsWithAuth = this.getHttpOptionsWithAuth();

    return this.httpClient.get<Conta>(apiUrl, httpOptionsWithAuth);
  }

  updateConta(conta: Conta): Observable<Conta> {
    const apiUrl = `${this.url}/ContaApp/${conta.id}/Editar`;
    const httpOptionsWithAuth = this.getHttpOptionsWithAuth();

    return this.httpClient.put<Conta>(apiUrl, conta, httpOptionsWithAuth);
  }

  pagarConta(conta: Conta): Observable<Conta> {
    const apiUrl = `${this.url}/ContaApp/${conta.id}/Pagar`;
    const httpOptionsWithAuth = this.getHttpOptionsWithAuth();

    return this.httpClient.put<Conta>(apiUrl, conta, httpOptionsWithAuth);
  }

  deleteConta(contaId: number): Observable<Conta> {
    const apiUrl = `${this.url}/ContaApp/${contaId}/Apagar`;
    const httpOptionsWithAuth = this.getHttpOptionsWithAuth();

    return this.httpClient.delete<Conta>(apiUrl, httpOptionsWithAuth)
  }

}
