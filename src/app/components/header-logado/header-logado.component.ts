import { Component, OnDestroy, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { AuthService } from 'src/app/services/Auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header-logado',
  templateUrl: './header-logado.component.html',
  styleUrls: ['./header-logado.component.css']
})
export class HeaderLogadoComponent implements OnInit, OnDestroy {
  estaLogado: boolean = false;
  private subscription!: Subscription;

  constructor (private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.subscription = this.authService.estaLogado$.subscribe(
      estaLogado => {
        this.estaLogado = estaLogado;
      }
    );
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  deslogar(): void {
    this.authService.logout();
  }
}
