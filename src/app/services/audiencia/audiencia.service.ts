import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Audiencia } from 'src/app/models/Audiencia';
import { enviroment } from 'src/env/env.dev';
import { UsuarioAtual } from 'src/app/components/login/usuario.atual';

@Injectable({
  providedIn: 'root'
})
export class AudienciaService {

  private http: HttpClient = inject(HttpClient);

  //Método GET
  public get():Observable<Audiencia[]>{
    return this.http.get<Audiencia[]>(`${enviroment.URL_API}/audiencias/carregue`);
  }

  //Método POST
  public save(audiencia:Audiencia, id: number = 0): Observable<Audiencia>{
    audiencia.usuarioId = parseInt(UsuarioAtual.getidUsuarioAtual(), 10);
    
    if(id>0){
      return this.http.put<Audiencia>(`${enviroment.URL_API}/audiencias/atualize/${id}`,audiencia);
    }
      return this.http.post<Audiencia>(`${enviroment.URL_API}/audiencias/crie`,audiencia);
  }

  //Método GET por ID
  public find(id:number): Observable<Audiencia>{
    return this.http.get<Audiencia>(`${enviroment.URL_API}/audiencias/carregue/${id}`);
  }

  //Método DELETE
  public delete(id:number):  Observable<void>{
    return this.http.delete<void>(`${enviroment.URL_API}/audiencias/delete/${id}`);
  }

  // Método GET por usuarioId
  public getPorUser(): Observable<Audiencia> {
    return this.http.get<Audiencia>(`${enviroment.URL_API}/audiencias/carregue/usuarioId/${UsuarioAtual.getidUsuarioAtual()}`);
  }

}


