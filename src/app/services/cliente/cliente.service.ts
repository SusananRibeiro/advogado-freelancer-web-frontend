import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cliente } from 'src/app/models/Cliente';
import { enviroment } from 'src/env/env.dev';
import { UsuarioAtual } from 'src/app/components/login/usuario.atual';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private http: HttpClient = inject(HttpClient);

    // Método GET (READ)
    public get():Observable<Cliente[]> {
      return this.http.get<Cliente[]>(`${enviroment.URL_API}/clientes/carregue`); 
    }

  // Método POST (CREATE)
  public save(cliente: Cliente, id: number = 0): Observable<Cliente> {

    cliente.usuarioId = parseInt(UsuarioAtual.getidUsuarioAtual(), 10);

    if(id > 0) {
      return this.http.put<Cliente>(`${enviroment.URL_API}/clientes/atualize/${id}`, cliente);
    }
    return this.http.post<Cliente>(`${enviroment.URL_API}/clientes/crie`, cliente);
  }
  
  // Método DELETE (DELETE)
  public delete(id: number): Observable<void> {
    return this.http.delete<void>(`${enviroment.URL_API}/clientes/delete/${id}`);
  }

  // Método GET por ID (READ) 
  public find(id: number): Observable<Cliente> {
    return this.http.get<Cliente>(`${enviroment.URL_API}/clientes/carregue/${id}`);
  }
  
  // Método GET por usuarioId
  public getPorUser(): Observable<Cliente> {
    return this.http.get<Cliente>(`${enviroment.URL_API}/clientes/carregue/usuarioId/${UsuarioAtual.getidUsuarioAtual()}`);
  }

}
