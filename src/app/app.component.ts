import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from './services/Auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'HomeTaskPlannerUI';
  estaLogado: boolean = false;
  private subscription!: Subscription;

  constructor (
    private authService: AuthService
    ) { }

  ngOnInit(): void {
    if (this.authService.estaLogado()) {
      this.subscription = this.authService.estaLogado$.subscribe(
        estaLogado => {
          this.estaLogado = estaLogado;
        }
        );
    }
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
