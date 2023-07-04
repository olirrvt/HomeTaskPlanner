import { Injectable } from '@angular/core';
import { MoradorService } from '../Morador/morador.service';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Login } from 'src/app/models/Login';
import { BehaviorSubject, Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private api = 'https://localhost:7005/Auth/';

  estaLogadoSubject = new BehaviorSubject<boolean>(false);
  estaLogado$ = this.estaLogadoSubject.asObservable();

  constructor(
    private httpClient: HttpClient,
    private cookieService: CookieService
    ) { }

    login(login: Login): Observable<any> {
      return this.httpClient.post<any>(this.api + 'Login', login, httpOptions);
    }

    verificarTokenValido(): Observable<boolean> {
      const token = this.cookieService.get('token');
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      });
      return this.httpClient.get<boolean>(this.api + 'VerificarToken', { headers });
    }

    estaLogado(): boolean {
      const token = this.cookieService.get('token');
      return token == null ? false : true;
    }

    logout(): void {
      this.cookieService.delete('token');
      this.estaLogadoSubject.next(false);
    }
}
