import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Ocorrencia } from 'src/app/models/Ocorrencia';
import { MoradorService } from 'src/app/services/Morador/morador.service';
import { OcorrenciaService } from 'src/app/services/Ocorrencia/ocorrencia.service';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-ocorrencias',
  templateUrl: './ocorrencias.component.html',
  styleUrls: ['./ocorrencias.component.css']
})
export class OcorrenciasComponent {
  ocorrenciaFinalizada: boolean = false;
  ocorrenciasRegistradas: Ocorrencia[] = [];
  dataAgora: Date = new Date();
  formularioOcorrencia!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private ocorrenciaService: OcorrenciaService,
    private moradorService: MoradorService
  ) { }

  ngOnInit(): void {
    this.inicializarFormulario();
    this.buscarOcorrencias();
  }

  private buscarOcorrencias(): void {
    this.ocorrenciaService.getAllOcorrencias().subscribe((ocorrencias) => {
      this.ocorrenciasRegistradas = ocorrencias;
    });
  }

  private inicializarFormulario(): void {
  const dataFormatada = formatDate(this.dataAgora, 'yyyy-MM-ddTHH:mm:ss', 'en-US');

    this.formularioOcorrencia = this.formBuilder.group({
      moradorId: ['', Validators.required],
      descricao: ['', Validators.required],
      dataHoraRegistro: dataFormatada
    });
  }

  EnviarFormularioOcorrencia(): void {
    const ocorrencia: Ocorrencia = this.formularioOcorrencia.value;
    this.ocorrenciaService.createOcorrencia(ocorrencia, ocorrencia.moradorId).subscribe((res) => {
      this.ocorrenciaFinalizada = true;
      this.buscarOcorrencias();
    });
  }

}
