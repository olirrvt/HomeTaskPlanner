import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
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
    VisitantesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
