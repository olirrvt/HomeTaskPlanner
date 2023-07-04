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

  constructor (
    private contasService: ContasService,
    private authService: AuthService
    ) { }

  ngOnInit() {
    this.carregarContasPendentes();
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
  

  pagarConta(conta: Contas) {
    conta.status = "Paga";
    console.log(conta.id);
    this.contasService.pagarConta(conta).subscribe(() => {
      this.carregarContasPendentes();
    });
  }

  deleteConta(contaId: number) {
    this.contasService.deleteConta(contaId).subscribe(() =>{
      this.carregarContasPendentes();
    });
  }

}
