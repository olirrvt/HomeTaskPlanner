import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Servico } from 'src/app/models/Servico';
import { AuthService } from 'src/app/services/Auth/auth.service';
import { ServResidencialService } from 'src/app/services/ServicoResidencial/serv-residencial.service';

@Component({
  selector: 'app-servicos',
  templateUrl: './servicos.component.html',
  styleUrls: ['./servicos.component.css']
})
export class ServicosComponent implements OnInit {
  // FormGroup
  formularioServico!: FormGroup;
  // Dados
  idMoradorLogado: number = 0;
  servicosMorador: Servico[] = [];
  servicosGeral: Servico[] = [];
  dataAgora: Date = new Date();
  isAdm: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private servResidencial: ServResidencialService,
    private authService: AuthService
    ) { }

  ngOnInit(): void {
    this.inicializarFormulario();
    this.buscarIdDoMoradorLogado();
    this.buscarServicosGeral();
  }

  inicializarFormulario(): void {
    const dataFormatada = formatDate(this.dataAgora, 'yyyy-MM-ddTHH:mm:ss', 'en-US');

    this.formularioServico = this.formBuilder.group({
      tipoServico: ['', Validators.required],
      descricao: ['', Validators.required],
      dataHoraSolicitacao: dataFormatada
    });
  }

  buscarServicosGeral(): void {
    this.servResidencial.obterTodosServicos().subscribe((res) => {
      this.servicosGeral = res;
    });
  }

  buscarIdDoMoradorLogado(): void {
    this.authService.getMoradorLogado().subscribe((morador) => {
      this.idMoradorLogado = morador.id;
      this.servicosMorador = morador.servicos;
      this.isAdm = morador.isAdministrador ? true : false;
    });
  }

  solicitarServico(): void {
    
    if (this.formularioServico.invalid) {
      return;
    }
    
    const novoServico: Servico = this.formularioServico.value;

    novoServico.moradorId = this.idMoradorLogado;
    novoServico.statusDoServico = "pendente";

    this.servResidencial.criarServico(novoServico, novoServico.moradorId).subscribe((res) => {
      this.formularioServico.reset();
      this.servicosGeral.push(res);
      this.servicosMorador.push(res);
    });

  }

  apagarServico(id: number): void {
    this.servResidencial.excluirServico(id).subscribe((res) => {
      this.servicosMorador = this.servicosMorador.filter((servico: Servico) => servico.id !== id);

      this.servicosGeral = this.servicosGeral.filter((servico: Servico) => servico.id !== id);
    });
  }

  Servicofeito(id: number): void {
    this.servResidencial.atualizarStatusDoServico(id).subscribe((res) => {
      this.buscarIdDoMoradorLogado();
    });
  }

}
