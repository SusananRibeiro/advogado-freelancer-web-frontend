import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClienteComponent } from './components/cliente/cliente.component';
import { CadastroClienteComponent } from './components/cliente/cadastro-cliente/cadastro-cliente.component';

const routes: Routes = [
  { path: 'clientes', component: ClienteComponent },
  { path: 'clientes/cadastro-cliente', component: CadastroClienteComponent },
  // Página padrão (opcional)
  { path: '', redirectTo: '/agenda', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
