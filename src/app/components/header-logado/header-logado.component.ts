import { Component, OnDestroy, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { AuthService } from 'src/app/services/Auth/auth.service';
import { Subscription } from 'rxjs';
import { Morador } from 'src/app/models/Morador';

@Component({
  selector: 'app-header-logado',
  templateUrl: './header-logado.component.html',
  styleUrls: ['./header-logado.component.css']
})
export class HeaderLogadoComponent implements OnInit, OnDestroy {
  private subscription!: Subscription;
  estaLogado: boolean = false;
  moradorLogado: Morador | undefined;
  bloco: string | undefined;
  numeroApartamento: string | undefined;

  constructor (private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.subscription = this.authService.estaLogado$.subscribe(
      estaLogado => {
        this.estaLogado = estaLogado;
  
          this.authService.getMoradorLogado().subscribe(morador => {
            this.moradorLogado = morador;
  
            this.bloco = morador.apartamento.slice(0, 2);
            this.numeroApartamento = morador.apartamento.slice(2, 5);
          });

      }
    );
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
