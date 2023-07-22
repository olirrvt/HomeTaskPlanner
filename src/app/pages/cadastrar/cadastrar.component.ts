import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Morador } from 'src/app/models/Morador';
import { MoradorService } from 'src/app/services/Morador/morador.service';
import { ModalService } from 'src/app/services/Modal/modal.service';

@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.component.html',
  styleUrls: ['./cadastrar.component.css']
})
export class CadastrarComponent {

  formulario!: FormGroup;
  inputInvalid: boolean = false;

  // Variáveis inicializadas para passar uma mensagem
  msgNome: string = "";
  msgApt: string = "";
  msgEmail: string = "";
  msgSenha: string = "";

  // Regex para a validação dos campos ainda não implementado

  nomeRegex = /^[a-zA-Z ]{2,30}$/;
  apartamentoRegex = /^\d{2}[A-Za-z]?\d{2}$/;
  emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  senhaRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  
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
      nome: ['', [Validators.required ] ],
      apartamento: ['', [Validators.required] ],
      email: ['', [Validators.required] ],
      senha: ['', [Validators.required] ],
      isAdministrador: [false]
    });
  }
  
  EnviarFormulario(): void {
      this.inputInvalid = false;
      const morador: Morador = this.formulario.value;
  
      this.moradorService.postMorador(morador).subscribe(resultado => {
        this.modalService.exibirModal();
      });
  }

}
