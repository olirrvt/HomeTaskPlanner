import { formatDate } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Visitante } from 'src/app/models/Visitante';
import { MoradorService } from 'src/app/services/Morador/morador.service';
import { VisitanteService } from 'src/app/services/Visitantes/visitante.service';

@Component({
  selector: 'app-visitantes',
  templateUrl: './visitantes.component.html',
  styleUrls: ['./visitantes.component.css']
})
export class VisitantesComponent {
  visitantes: Visitante[] = [];
  formularioVisitante!: FormGroup;
  dataAgora: Date = new Date();
  visitanteCadastrado: boolean = false;

  constructor(
    private visitanteService: VisitanteService,
    private moradorService: MoradorService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.inicializarFormularioReserva();
    this.pegarVisitantesCadastrados();
  };

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

  CadastrarVisitante(): void {
    const visitante: Visitante = this.formularioVisitante.value;
    visitante.nomeVisitante = visitante.nomeVisitante.toLowerCase();

    this.visitanteService.registerVisitante(visitante, visitante.moradorId)
    .subscribe((res) => {
      this.visitanteCadastrado = true;
      this.pegarVisitantesCadastrados();
    });
  }

}
