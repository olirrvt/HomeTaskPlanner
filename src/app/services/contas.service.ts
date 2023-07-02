import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Conta } from '../models/Conta';
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
export class ContasService {

  private url = 'https://localhost:7005/Contas';

  constructor(private httpClient: HttpClient) { }

  addConta(conta: Conta): Observable<Conta> {
    const apiUrl = `${this.url}/ContaApp/${conta.moradorId}`;

    return this.httpClient.post<Conta>(apiUrl, conta, httpOptions)
  }

  getAllContas(): Observable<Conta[]> {
    const apiUrl = `${this.url}/contas`;

    return this.httpClient.get<Conta[]>(apiUrl);
  }

  getContaById(contaId: number): Observable<Conta> {
    const apiUrl = `${this.url}/Conta/${contaId}`;

    return this.httpClient.get<Conta>(apiUrl);
  }

  updateConta(conta: Conta): Observable<Conta> {
    const apiUrl = `${this.url}/ContaApp/${conta.id}/Editar`;

    return this.httpClient.put<Conta>(apiUrl, conta, httpOptions);
  }

  pagarConta(conta: Conta): Observable<Conta> {
    const apiUrl = `${this.url}/ContaApp/${conta.id}/Pagar`;

    return this.httpClient.put<Conta>(apiUrl, conta, httpOptions);
  }

  deleteConta(contaId: number): Observable<Conta> {
    const apiUrl = `${this.url}/ContaApp/${contaId}/Apagar`;

    return this.httpClient.delete<Conta>(apiUrl)
  }

}
