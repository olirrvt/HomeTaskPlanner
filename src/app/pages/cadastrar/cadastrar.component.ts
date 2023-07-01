import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Morador } from 'src/app/models/Morador';
import { MoradorService } from 'src/app/services/morador.service';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.component.html',
  styleUrls: ['./cadastrar.component.css']
})
export class CadastrarComponent {

  formulario!: FormGroup;
  
  constructor(
    private formBuilder: FormBuilder, 
    private moradorService: MoradorService,
    private modalService: ModalService
    ) { }

  ngOnInit(): void {
    this.inicializarFormulario();
  }

  private inicializarFormulario(): void {
    this.formulario = this.formBuilder.group({
      nome: ['', Validators.required],
      apartamento: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      senha: ['', Validators.required],
      isAdministrador: [false]
    });
  }

  EnviarFormulario(): void {
    // console.log(this.formulario.value);
    const morador: Morador = this.formulario.value;

    this.moradorService.postMorador(morador).subscribe(resultado => {
      this.modalService.exibirModal();
    });
  }
}
