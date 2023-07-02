import { Component, OnInit } from '@angular/core';
import { ContasService } from 'src/app/services/contas.service';
import { Conta } from 'src/app/models/Conta';

@Component({
  selector: 'app-contas',
  templateUrl: './contas.component.html',
  styleUrls: ['./contas.component.css']
})
export class ContasComponent {

  contas: Conta[] = [];

  constructor (private contasService: ContasService) {}

  ngOnInit() {
    this.carregarContasPendentes();
  }

  carregarContasPendentes() {
    this.contasService.getAllContas().subscribe((contas) => {
      console.log(contas.map((c) => c.status));
      this.contas = contas;
    });
  }

  pagarConta(conta: Conta) {
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
