import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cliente } from 'src/app/models/Cliente';
import { enviroment } from 'src/env/env.dev';

@Injectable({
  providedIn: 'root'
})
export class CadastroClienteService {

  private http: HttpClient = inject(HttpClient);

  // Método GET (READ)
  public get():Observable<Cliente[]> {
    return this.http.get<Cliente[]>(`${enviroment.URL_API}/clientes/carregue`); 
  }

  // Método POST  e PUT (CREATE)
  public save(cliente: Cliente, id: number = 0): Observable<Cliente> {
    if(id > 0) {
      return this.http.put<Cliente>(`${enviroment.URL_API}/clientes/cadastro-cliente/atualize/${id}`, cliente);
    }
    return this.http.post<Cliente>(`${enviroment.URL_API}/clientes/cadastro-cliente/crie`, cliente);
  }

  // Método GET por ID (READ)
  public find(id: number): Observable<Cliente> {
    return this.http.get<Cliente>(`${enviroment.URL_API}/clientes/cadastro-cliente/carregue/${id}`);
  }

  // Não precisa do Método DELETE

}
