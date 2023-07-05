import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Aviso } from 'src/app/models/Aviso';
import { Contas } from 'src/app/models/Conta';
import { AuthService } from 'src/app/services/Auth/auth.service';
import { AvisoService } from 'src/app/services/Aviso/aviso.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  usuarioLogado: boolean = false;
  avisosGeral: Aviso[] = [];
  contasMorador: Contas[] = [];

  constructor(
    private cookiesService: CookieService,
    private authService: AuthService,
    private avisoService: AvisoService
  ) { }

  ngOnInit(): void {
    this.verificaUserLogado();
  }

  buscarContas(): void {
    this.authService.getMoradorLogado().subscribe((res) => {
      this.contasMorador = res.conta;
    });
  }

  buscarAvisos(): void {
    this.avisoService.getAvisos().subscribe((avisos) => {
      this.avisosGeral = avisos;
    });
  }

  private verificaUserLogado(): void {
    const token = this.cookiesService.get('token');
    if (token) {
      this.usuarioLogado = true;
      this.buscarContas();
      this.buscarAvisos();
    } else {
      this.usuarioLogado = false; 
    }
  }
}