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

  constructor (
    private contasService: ContasService,
    private authService: AuthService
    ) { }

  ngOnInit() {
    this.carregarContasPendentes();
    setInterval(() => {
      const hoje = new Date();
      if (hoje.getDate() === 1) {
        this.cadastrarConta();
      }
    }, 1000 * 60 * 60 * 24);
  }

  carregarContasPendentes() {
    this.authService.getMoradorLogado().subscribe(morador => {
      if (morador && morador.conta) {
        this.contasMorador = morador.conta;
      } else {
        console.log('O morador não possui conta associadas a ele!');
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
      this.carregarContasPendentes();
    });
  }

  deleteConta(contaId: number) {
    this.contasService.deleteConta(contaId).subscribe(() =>{
      this.carregarContasPendentes();
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
      this.carregarContasPendentes();
    });
  }

}
