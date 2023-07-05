import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Morador } from 'src/app/models/Morador';
import { Produto } from 'src/app/models/Produto';
import { AuthService } from 'src/app/services/Auth/auth.service';
import { MoradorService } from 'src/app/services/Morador/morador.service';
import { ProdutoService } from 'src/app/services/Produtos/produto.service';

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.css']
})
export class ProdutosComponent {
  formularioProduto!: FormGroup;

  // Dados
  idMorador!: number;
  idDoMoradorProduto: any;
  produtosMorador: Produto[] = [];
  produtos: Produto[] = [];
  moradorDonoProduto: Morador[] = [];

  // Mensagem
  showMessage: boolean = false;
  success: boolean = false;
  message: string = "";

  constructor(
    private formBuilder: FormBuilder,
    private produtoService: ProdutoService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.inicializarFormulario();
    this.buscarIdMoradorEProduto();
    this.buscarTodosOsProdutos();
  }

  buscarIdMoradorEProduto(): void {
    this.authService.getMoradorLogado().subscribe((res) => {
      this.idMorador = res.id;
      this.produtosMorador = res.produtos;
    });
  }

  buscarTodosOsProdutos(): void {
    this.produtoService.obterTodosProdutos().subscribe((res) => {
      this.produtos = res;
    });
  }
  inicializarFormulario(): void {
    this.formularioProduto = this.formBuilder.group({
      nomeProduto: ['', Validators.required],
      descricaoProduto: ['', Validators.required],
      preco: [0, Validators.required],
      moradorId: [0, Validators.required]
    });
  }

  CadastrarProdutos() {
    // Pequena validação de teste
    if (this.formularioProduto.invalid) {
      return;
    }

    const produto: Produto = this.formularioProduto.value;
    produto.moradorId = this.idMorador;

    this.produtoService.criarProduto(produto, produto.moradorId).subscribe(
      (response) => {

        this.showMessage = true;
        this.success = true;

        this.message = "Produto cadastrado com sucesso!";
        this.formularioProduto.reset();

        this.produtos.push(response);
        this.produtosMorador.push(response);

        setTimeout(() => {
          this.showMessage = false;
        }, 3000);

      }
    );
  }

  excluirProduto(id: number) {
    console.log(id);
    this.produtoService.deletarProduto(id).subscribe(() => {
      // Remove o produto do array produtosMorador
      this.produtosMorador = this.produtosMorador.filter((p) => p.id !== id);
      // Também remove o produto do array produtos, caso exista
      const index = this.produtos.findIndex((p) => p.id === id);
      if (index !== -1) {
        this.produtos.splice(index, 1);
      }
    });
  }

}
