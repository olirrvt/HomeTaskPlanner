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
  inputValid: boolean = true;
  msgNome: string = "";
  msgApt: string = "";
  msgEmail: string = "";
  msgSenha: string = "";

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
      nome: ['', [Validators.required, Validators.pattern(this.nomeRegex)]],
      apartamento: ['', [Validators.required, Validators.pattern(this.apartamentoRegex)]],
      email: ['', [Validators.required, Validators.pattern(this.emailRegex)]],
      senha: ['', [Validators.required, Validators.pattern(this.senhaRegex)]],
      isAdministrador: [false]
    });
  }

  EnviarFormulario(): void {
    console.log(this.formulario.valid);
    if (this.formulario.valid) {
      const morador: Morador = this.formulario.value;
  
      this.moradorService.postMorador(morador).subscribe(resultado => {
        this.modalService.exibirModal();
      });
    } else {
      this.inputValid = false;
      console.log(this.formulario.controls['email'].errors);
      this.msgNome = this.formulario.controls['nome'].errors?.['required'] ? "A senha deve ter letras maiúsculas e minúsculas, espaços e ter um comprimento de no mínimo 2 caracteres e máximo de 30 caracteres." : "";
      this.msgApt = this.formulario.controls['apartamento'].errors?.['required'] ? "O número do apartamento deve seguir o formato '08102', onde os dois primeiros dígitos representam o bloco e os dois últimos dígitos representam o número do apartamento." : "";
      this.msgEmail = this.formulario.controls['email'].errors?.['required'] ? "O formato do email deve seguir um padrão básico" : "";
      this.msgSenha = this.formulario.controls['senha'].errors?.['required'] ? "Requer uma senha com pelo menos 8 caracteres, incluindo pelo menos uma letra maiúscula, uma letra minúscula, um número e um caractere especial." : "";
    }
  }

}
