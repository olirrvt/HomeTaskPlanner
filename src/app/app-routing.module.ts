import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { CadastrarComponent } from './pages/cadastrar/cadastrar.component';
import { ContasComponent } from './pages/contas/contas.component';
import { AreasComunsComponent } from './pages/areas-comuns/areas-comuns.component';
import { AvisosComponent } from './pages/avisos/avisos.component';
import { OcorrenciasComponent } from './pages/ocorrencias/ocorrencias.component';
import { VisitantesComponent } from './pages/visitantes/visitantes.component';

const routes: Routes = [
    { path: "", component: HomeComponent },
    { path: "login", component: LoginComponent },
    { path: "cadastrar", component: CadastrarComponent },
    { path: "contas", component: ContasComponent },
    { path: "areas-comuns", component: AreasComunsComponent },
    { path: "avisos", component: AvisosComponent },
    { path: "ocorrencias", component: OcorrenciasComponent },
    { path: "visitantes", component: VisitantesComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
