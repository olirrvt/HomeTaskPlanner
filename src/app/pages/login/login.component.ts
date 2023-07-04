import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Login } from 'src/app/models/Login';
import { Morador } from 'src/app/models/Morador';
import { AuthService } from 'src/app/services/Auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  formularioLogin!: FormGroup;
  moradorLogado: Morador | undefined;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router,
    private cookieService: CookieService
  ) { }

  ngOnInit(): void {
    this.inicializarFormularioLogin();
  };

  private inicializarFormularioLogin(): void {
    this.formularioLogin = this.formBuilder.group({
      email: ['', Validators.required],
      senha: ['', Validators.required]
    });
  }

  EfetuarLogin(): void {
    const login: Login = this.formularioLogin.value;

    this.authService.login(login).subscribe((response) => {
      if (response && response.token) {

        this.cookieService.set('token', response.token);
        this.authService.getMoradorLogado().subscribe(morador => {
          this.moradorLogado = morador;
          console.log(morador);
        })
        this.authService.estaLogadoSubject.next(true);
        this.router.navigate(['/']);

      } else {
        console.log("Error ao efetuar o login");
      }
    });
  }

} 
