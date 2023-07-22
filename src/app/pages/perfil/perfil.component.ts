import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Morador } from 'src/app/models/Morador';
import { AuthService } from 'src/app/services/Auth/auth.service';
import { MoradorService } from 'src/app/services/Morador/morador.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent {
  morador!: Morador;
  idDoMorador!: number;
  formularioEditUser!: FormGroup;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private moradorService: MoradorService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.getMoradorLogado();
    this.iniciarFormularioEditUser();
  }

  iniciarFormularioEditUser(): void {
    this.formularioEditUser = this.formBuilder.group({
      id: this.idDoMorador,
      nome: ['', Validators.required],
      apartamento: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      senha: ['', Validators.required],
      isAdministrador: [false]
    });
  }

  getMoradorLogado(): void {
    this.authService.getMoradorLogado().subscribe((res) => {
      if (res !== null && res !== undefined) {
        this.morador = res;
        this.idDoMorador = this.morador.id;
      }
    });
  }


  editarPerfil():void {
    const moradorEdit: Morador = this.formularioEditUser.value;

    moradorEdit.id = this.idDoMorador;
    moradorEdit.isAdministrador = this.morador.isAdministrador
    // Verificação se vier vazio, atribui o mesmo valor
    moradorEdit.nome = moradorEdit.nome || this.morador.nome;
    moradorEdit.apartamento = moradorEdit.apartamento || this.morador.apartamento;
    moradorEdit.email = moradorEdit.email || this.morador.email;

    this.moradorService.UpdateMorador(moradorEdit).subscribe((res) => {
      window.location.reload();
    });

  }

  apagarConta(): void {
    this.moradorService.deleteMoradorAndRelatedItems(this.idDoMorador).subscribe((res) => {
        console.log("Apagado com sucesso!");
        this.authService.logout();
        this.router.navigate(['/login']); 
      });
  }

  deslogar(): void {
    this.authService.logout();
    window.location.reload();
  }

}

