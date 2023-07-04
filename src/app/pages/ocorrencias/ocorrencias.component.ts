import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Ocorrencia } from 'src/app/models/Ocorrencia';
import { MoradorService } from 'src/app/services/Morador/morador.service';
import { OcorrenciaService } from 'src/app/services/Ocorrencia/ocorrencia.service';
import { formatDate } from '@angular/common';
import { AuthService } from 'src/app/services/Auth/auth.service';
import { interval } from 'rxjs';

@Component({
  selector: 'app-ocorrencias',
  templateUrl: './ocorrencias.component.html',
  styleUrls: ['./ocorrencias.component.css']
})
export class OcorrenciasComponent {
  ocorrenciaFinalizada: boolean = false;
  ocorrenciasRegistradas: Ocorrencia[] = [];
  ocorrenciasDoMorador: Ocorrencia[] = [];
  ocorrenciasExistem: boolean = false;
  dataAgora: Date = new Date();
  formularioOcorrencia!: FormGroup;
  idMoradorLogado: number = 0;

  constructor(
    private formBuilder: FormBuilder,
    private ocorrenciaService: OcorrenciaService,
    private moradorService: MoradorService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.inicializarFormulario();
    this.buscarOcorrencias();
    this.buscarIdDoMoradorLogado();
    this.buscarOcorrenciasDoMorador();

    interval(20000).subscribe(() => {
      this.ocorrenciaFinalizada = false;
    });
  }

  private buscarOcorrencias(): void {
    this.ocorrenciaService.getAllOcorrencias().subscribe((ocorrencias) => {
      this.ocorrenciasRegistradas = ocorrencias;
    });
  }

  private buscarOcorrenciasDoMorador(): void {
    this.authService.getMoradorLogado().subscribe((ocM) => {
      this.ocorrenciasDoMorador = ocM.ocorrencia;
      this.ocorrenciasExistem = this.ocorrenciasDoMorador.length > 0;
    });
  };

  private buscarIdDoMoradorLogado(): number {
    this.authService.getMoradorLogado().subscribe((res) => {
      this.idMoradorLogado = res.id;
    });
    return this.idMoradorLogado;
  }

  deletarOcorrencia(ocorrenciaId: number): void {
    this.ocorrenciaService.deleteOcorrencia(ocorrenciaId).subscribe((res) => {
      // Remove da lista
      this.ocorrenciasDoMorador = this.ocorrenciasDoMorador.filter(ocorrencia => ocorrencia.id !== ocorrenciaId);
      this.ocorrenciasDoMorador = this.ocorrenciasDoMorador.filter(ocorrencia => ocorrencia.id !== ocorrenciaId);
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
    ocorrencia.moradorId = this.idMoradorLogado;

    this.ocorrenciaService.createOcorrencia(ocorrencia, ocorrencia.moradorId).subscribe((res) => {
      this.ocorrenciaFinalizada = true;
      this.buscarOcorrencias();

      this.ocorrenciasDoMorador.push(res);
      this.ocorrenciasRegistradas.push(res);
    });
  }

}
