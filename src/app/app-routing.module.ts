import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClienteComponent } from './components/cliente/cliente.component';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { ProcessoComponent } from './components/processo/processo.component';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  { path: 'clientes', component: ClienteComponent },
  { path: 'usuarios', component: UsuarioComponent },
  { path: 'processos', component: ProcessoComponent },
  { path: 'login', component: LoginComponent },

  // Página padrão (opcional)
  { path: '', redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
