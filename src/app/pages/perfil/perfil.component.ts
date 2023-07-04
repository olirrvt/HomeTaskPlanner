import { Component } from '@angular/core';
import { Morador } from 'src/app/models/Morador';
import { AuthService } from 'src/app/services/Auth/auth.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent {
  morador!: Morador;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.getMoradorLogado();
  }

  getMoradorLogado(): void {
    this.authService.getMoradorLogado().subscribe((res) => {
      this.morador = res;
      console.log(this.morador);
    });
  }

  editarPerfil():void {
    console.log("Perfil");
  }

  apagarConta(): void {
    console.log("Apagar");
  }

}

