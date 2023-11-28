import { inject, Injectable } from '@angular/core';
import { Usuario } from 'src/app/models/Usuario';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { enviroment } from 'src/env/env.dev';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private http: HttpClient = inject(HttpClient);

  // Método GET (READ)
  public get():Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${enviroment.URL_API}/usuarios/carregue`); 
  }

  // Método POST (CREATE)
  public save(cliente: Usuario, id: number = 0): Observable<Usuario> {
    if(id > 0) {
      return this.http.put<Usuario>(`${enviroment.URL_API}/usuarios/atualize/${id}`, cliente);
    }
    return this.http.post<Usuario>(`${enviroment.URL_API}/usuarios/crie`, cliente);
  }
  
  // Método GET por ID (READ) 
  public find(id: number): Observable<Usuario> {
    return this.http.get<Usuario>(`${enviroment.URL_API}/usuarios/carregue/${id}`);
  }

  // Método DELETE (DELETE)
  public delete(id: number): Observable<void> {
    return this.http.delete<void>(`${enviroment.URL_API}/usuarios/delete/${id}`);
  }
}
