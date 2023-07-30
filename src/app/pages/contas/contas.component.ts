import { Component, OnInit } from '@angular/core';
import { ContasService } from 'src/app/services/Contas/contas.service';
import { Contas } from 'src/app/models/Conta';
import { AuthService } from 'src/app/services/Auth/auth.service';

@Component({
  selector: 'app-contas',
  templateUrl: './contas.component.html',
  styleUrls: ['./contas.component.css']
})
export class ContasComponent {
  contasMorador: Contas[] = [];
  moradorId!: number;
  contasExistem: boolean = false;

  constructor (
    private contasService: ContasService,
    private authService: AuthService
    ) { }

  ngOnInit() {
    this.carregarContas();
    setInterval(() => {
      const hoje = new Date();
      if (hoje.getDate() === 1) {
        this.cadastrarConta();
      }
    }, 1000 * 60 * 60 * 24);
  }

  carregarContas() {
    this.authService.getMoradorLogado().subscribe(morador => {
      console.log(morador.conta.length);
      if (morador.conta.length !== 0) {
        this.contasMorador = morador.conta;
        this.contasExistem = true;
      } else {
        this.contasExistem = false;
      }
    });
  }
  
  obterIdDoMoradorLogado(): void {
    this.authService.getMoradorLogado().subscribe((res) => {
      this.moradorId = res.id;
    });
  }

  pagarConta(conta: Contas) {
    conta.status = "Paga";
    this.contasService.pagarConta(conta).subscribe(() => {
      this.carregarContas();
    });
  }

  deleteConta(contaId: number) {
    this.contasService.deleteConta(contaId).subscribe(() =>{
      this.carregarContas();
    });
  }

  cadastrarConta() {
    // Obter a data atual
    const hoje = new Date();
    // Adicionar 10 dias à data atual
    hoje.setDate(hoje.getDate() + 10);
  
    const novaConta: Contas = {
      dataVencimento: hoje,
      valor: 250,
      status: 'pendente',
      moradorId: this.moradorId
    };
  
    // Chamar o serviço para cadastrar a nova conta
    this.contasService.addConta(novaConta).subscribe(() => {
      this.carregarContas();
    });
  }

}
