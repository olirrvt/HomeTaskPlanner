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

// FontAwesome
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

// Http Requisição
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

// Services
import { MoradorService } from './services/morador.service';
import { ModalService } from './services/modal.service';

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
    ModalComponent
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
    MoradorService,
    ModalService 
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
