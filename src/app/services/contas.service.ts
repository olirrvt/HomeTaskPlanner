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
    const apiUrl = `${this.url}/contas`
    return this.httpClient.get<Conta[]>(apiUrl);
  }

  getContaById(contaId: number): Observable<Conta> {
    const apiUrl = `${this.url}/Conta/${contaId}`;
    return this.httpClient.get<Conta>(apiUrl);
  }

}
