import { formatDate } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Visitante } from 'src/app/models/Visitante';
import { AuthService } from 'src/app/services/Auth/auth.service';
import { MoradorService } from 'src/app/services/Morador/morador.service';
import { VisitanteService } from 'src/app/services/Visitantes/visitante.service';

@Component({
  selector: 'app-visitantes',
  templateUrl: './visitantes.component.html',
  styleUrls: ['./visitantes.component.css']
})
export class VisitantesComponent {
  // Verifica se o morador tem privilégios
  isAdm!: boolean;
  // Visitantes
  visitantes: Visitante[] = [];
  // Verifica se o morador tem visitante
  moradorTemVisitante: boolean = false;
  visitantesDoMorador: Visitante[] = [];
  // Controle de Formulário
  formularioVisitante!: FormGroup;
  // Controle de Data
  dataAgora: Date = new Date();
  visitanteCadastrado: boolean = false;
  idDoMoradorLogado: number = 0;
  // Variável para mudar de estado para cadastrar visistante
  cadastrarVisitante: boolean = false;


  constructor(
    private visitanteService: VisitanteService,
    private moradorService: MoradorService,
    private authService: AuthService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.inicializarFormularioReserva();
    this.pegarVisitantesCadastrados();
    this.buscarIdDoMoradorLogado();
    this.buscarVisitantesDoMorador();
    this.verificaMoradorIsAdm();
  };

  mudarParaCadastro(): void {
    this.cadastrarVisitante = true;
  }

  voltarParaViewVisitante(): void {
    this.cadastrarVisitante = false;
  }

  private buscarIdDoMoradorLogado(): any {
    this.authService.getMoradorLogado().subscribe((res) => {
      this.idDoMoradorLogado = res.id;
    });
  }

  verificaMoradorIsAdm(): void {
    this.authService.getMoradorLogado().subscribe((res) => {
      this.isAdm = res.isAdministrador;
    });
  }

  private buscarVisitantesDoMorador(): any {
    this.authService.getMoradorLogado().subscribe((res) => {
      if (res.visitantes && res.visitantes.length > 0) {
        this.moradorTemVisitante = true;
        this.visitantesDoMorador = res.visitantes;
      } else {
        this.moradorTemVisitante = false;
        this.visitantesDoMorador = [];
      }
    });
  }

  private inicializarFormularioReserva(): void {
    const dataFormatada = formatDate(this.dataAgora, 'yyyy-MM-ddTHH:mm:ss', 'en-US');

    this.formularioVisitante = this.formBuilder.group({
      moradorId: ['', Validators.required],
      nomeVisitante: ['', Validators.required],
      dataHoraEntrada: dataFormatada,
      dataHoraSaida: ['', Validators.required]
    });
  }

  private pegarVisitantesCadastrados(): void {
    this.visitanteService.getAllVisitantes().subscribe((visitantes) => {
      this.visitantes = visitantes;
    });
  }

  apagarVisitante(visitanteId: number): void {
    this.visitanteService.deleteVisitante(visitanteId).subscribe((res) => {
      this.visitantesDoMorador = this.visitantesDoMorador.filter(visitante => visitante.id !== visitanteId);
    });
  }

  CadastrarVisitante(): void {
    const visitante: Visitante = this.formularioVisitante.value;

    visitante.nomeVisitante = visitante.nomeVisitante.toLowerCase();
    visitante.moradorId = this.idDoMoradorLogado;

    this.visitanteService.registerVisitante(visitante, visitante.moradorId)
    .subscribe((res) => {
      this.visitanteCadastrado = true;

      this.buscarVisitantesDoMorador();

      this.visitantesDoMorador.push(res);
    });
  }

}
