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
      public get(): Observable<Usuario[]> {
        return this.http.get<Usuario[]>(`${enviroment.URL_API}/usuarios/carregue`)
      }

        // Método POST (CREATE)
  public save(usuario: Usuario, id: number = 0): Observable<Usuario> {
    if(id > 0) {
      return this.http.put<Usuario>(`${enviroment.URL_API}/usuarios/atualize/${id}`, usuario);
    }
    return this.http.post<Usuario>(`${enviroment.URL_API}/usuarios/crie`, usuario);
  } 

}
