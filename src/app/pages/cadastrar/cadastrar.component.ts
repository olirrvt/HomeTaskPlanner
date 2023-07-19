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
      nome: ['', [Validators.required, Validators]],
      apartamento: ['', [Validators.required, Validators]],
      email: ['', [Validators.required, Validators]],
      senha: ['', [Validators.required, Validators]],
      isAdministrador: [false]
    });
  }

  EnviarFormulario(): void {
    console.log(this.formulario.valid);

    if (this.formulario.valid) {
      this.inputInvalid = false;
      const morador: Morador = this.formulario.value;
  
      this.moradorService.postMorador(morador).subscribe(resultado => {
        this.modalService.exibirModal();
      });
    } else {
      console.log();
      this.inputInvalid = true;
      this.msgNome = this.formulario.controls['nome'].errors?.['required'] ? "O nome deve ter letras maiúsculas e minúsculas, espaços e ter um comprimento de no mínimo 2 caracteres e máximo de 30 caracteres." : "";
      this.msgApt = this.formulario.controls['apartamento'].errors?.['required'] ? "O número do apartamento deve seguir o formato '08102', onde os dois primeiros dígitos representam o bloco e os dois últimos dígitos representam o número do apartamento." : "";
      this.msgEmail = this.formulario.controls['email'].errors?.['required'] ? "O formato do email deve seguir um padrão básico" : "";
      this.msgSenha = this.formulario.controls['senha'].errors?.['required'] ? "Requer uma senha com pelo menos 8 caracteres, incluindo pelo menos uma letra maiúscula, uma letra minúscula, um número e um caractere especial." : "";
    }
  }

}
