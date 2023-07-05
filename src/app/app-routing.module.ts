import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';

// Componentes da Aplicação
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { CadastrarComponent } from './pages/cadastrar/cadastrar.component';
import { ContasComponent } from './pages/contas/contas.component';
import { AreasComunsComponent } from './pages/areas-comuns/areas-comuns.component';
import { AvisosComponent } from './pages/avisos/avisos.component';
import { OcorrenciasComponent } from './pages/ocorrencias/ocorrencias.component';
import { VisitantesComponent } from './pages/visitantes/visitantes.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { AuthGuard } from './services/AuthGuard/auth-guard.service';
import { ProdutosComponent } from './pages/produtos/produtos.component';
import { ServicosComponent } from './pages/servicos/servicos.component';

const routes: Routes = [
    { path: "", component: HomeComponent },
    { path: "login", component: LoginComponent },
    { path: "cadastrar", component: CadastrarComponent },
    { path: "contas", component: ContasComponent, canActivate: [AuthGuard] },
    { path: "areas-comuns", component: AreasComunsComponent, canActivate: [AuthGuard] },
    { path: "avisos", component: AvisosComponent, canActivate: [AuthGuard] },
    { path: "ocorrencias", component: OcorrenciasComponent, canActivate: [AuthGuard] },
    { path: "visitantes", component: VisitantesComponent, canActivate: [AuthGuard] },
    { path: "perfil", component: PerfilComponent, canActivate: [AuthGuard] },
    { path: "produtos", component: ProdutosComponent, canActivate: [AuthGuard] },
    { path: "servicos", component: ServicosComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
