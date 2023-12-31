import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';

// Components for Angular
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { CadastrarComponent } from './pages/cadastrar/cadastrar.component';
import { ContasComponent } from './pages/contas/contas.component';
import { AreasComunsComponent } from './pages/areas-comuns/areas-comuns.component';
import { OcorrenciasComponent } from './pages/ocorrencias/ocorrencias.component';
import { AvisosComponent } from './pages/avisos/avisos.component';
import { VisitantesComponent } from './pages/visitantes/visitantes.component';
import { FooterComponent } from './components/footer/footer.component';
import { ModalComponent } from './components/modal/modal.component';
import { HomeButtonComponent } from './components/home-button/home-button.component';
import { CardComponent } from './components/card/card.component';
import { HeaderLogadoComponent } from './components/header-logado/header-logado.component';

// FontAwesome
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

// Http Requisição
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule, DatePipe } from '@angular/common';

// Services
import { MoradorService } from './services/Morador/morador.service';
import { ModalService } from './services/Modal/modal.service';
import { ContasService } from './services/Contas/contas.service';
import { ReservaService } from './services/Reserva/reserva.service';
import { OcorrenciaService } from './services/Ocorrencia/ocorrencia.service';
import { AvisoService } from './services/Aviso/aviso.service';
import { AuthService } from './services/Auth/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { ProdutosComponent } from './pages/produtos/produtos.component';
import { ServicosComponent } from './pages/servicos/servicos.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    LoginComponent,
    CadastrarComponent,
    ContasComponent,
    AreasComunsComponent,
    OcorrenciasComponent,
    AvisosComponent,
    VisitantesComponent,
    FooterComponent,
    ModalComponent,
    HomeButtonComponent,
    CardComponent,
    HeaderLogadoComponent,
    PerfilComponent,
    ProdutosComponent,
    ServicosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    HttpClientModule,
    CommonModule,
    ReactiveFormsModule
  ],
  providers: [
    HttpClientModule,
    CookieService,
    MoradorService,
    ModalService,
    ContasService,
    ReservaService,
    OcorrenciaService,
    AvisoService,
    AuthService,
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
