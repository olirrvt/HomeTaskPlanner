import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Produto } from 'src/app/models/Produto';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {
  private url = "https://localhost:7005/Produto/";

  constructor(
    private http: HttpClient, 
    private cookieService: CookieService ) { }

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

  // Criar um produto
  criarProduto(produto: Produto, idMorador: number) {
    const httpOptionsWithAuth = this.getHttpOptionsWithAuth();
    return this.http.post<Produto>(`${this.url}Produto/${idMorador}`, produto, httpOptionsWithAuth);
  }

  // Obter todos os produtos
  obterTodosProdutos() {
    const httpOptionsWithAuth = this.getHttpOptionsWithAuth();
    return this.http.get<Produto[]>(`${this.url}Produtos`, httpOptionsWithAuth);
  }

  // Obter um produto específico por ID
  obterProdutoPorId(idProduto: number) {
    const httpOptionsWithAuth = this.getHttpOptionsWithAuth();
    return this.http.get<Produto>(`${this.url}Produto/${idProduto}`, httpOptionsWithAuth);
  }

  // Atualizar um produto
  atualizarProduto(idProduto: number, produto: Produto) {
    const httpOptionsWithAuth = this.getHttpOptionsWithAuth();
    return this.http.put<Produto>(`${this.url}Produto/${idProduto}/Alterar`, produto, httpOptionsWithAuth);
  }

  // Deletar um produto por ID
  deletarProduto(idProduto: number) {
    const httpOptionsWithAuth = this.getHttpOptionsWithAuth();
    return this.http.delete(`${this.url}Produto/${idProduto}/Apagar`, httpOptionsWithAuth);
  }
}
