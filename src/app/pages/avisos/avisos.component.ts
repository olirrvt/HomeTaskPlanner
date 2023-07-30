import { formatDate } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Aviso } from 'src/app/models/Aviso';
import { Morador } from 'src/app/models/Morador';
import { AuthService } from 'src/app/services/Auth/auth.service';
import { AvisoService } from 'src/app/services/Aviso/aviso.service';

@Component({
  selector: 'app-avisos',
  templateUrl: './avisos.component.html',
  styleUrls: ['./avisos.component.css']
})
export class AvisosComponent {
  dataAgora: Date = new Date();
  formularioAviso!: FormGroup;
  isAdm!: boolean;
  avisos: Aviso[] = [];

  // Variavel auxiliar para mudar para registro
  registrarNovoAviso: boolean = false;

  constructor(
    private avisoService: AvisoService,
    private authService: AuthService,
    private formBuilder: FormBuilder
    ) { }

  ngOnInit(): void {
    this.carregarAvisos();
    this.verificaMoradorIsAdm();
    this.inicializarFormularioAviso();
  }

  private inicializarFormularioAviso(): void {
    const dataFormatada = formatDate(this.dataAgora, 'yyyy-MM-ddTHH:mm:ss', 'en-US');
      this.formularioAviso = this.formBuilder.group({
        titulo: ['', Validators.required],
        mensagem: ['', Validators.required],
        dataPublicacao: dataFormatada
      });
  }

  mudarParaRegistroAviso(): void {
    this.registrarNovoAviso = true;
  }

  voltarParaViewAviso(): void {
    this.registrarNovoAviso = false;
  }

  verificaMoradorIsAdm(): void {
    this.authService.getMoradorLogado().subscribe((res) => {
      this.isAdm = res.isAdministrador;
    });
  }

  carregarAvisos(): void {
    this.avisoService.getAvisos().subscribe(
      (avisos) => {
        this.avisos = avisos;
      }
    );
  }

  criarAviso(): void {
    const aviso: Aviso = this.formularioAviso.value;
    this.avisoService.createAviso(aviso).subscribe((res) => {
      this.avisos.push(res);
    });
  }

  apagarAviso(aviso: Aviso): void {
    this.avisoService.deleteAviso(aviso.id).subscribe(() => {
      this.avisos = this.avisos.filter((a) => a !== aviso);
    });
  }

}
