import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Processo } from 'src/app/models/Processo';
import { enviroment } from 'src/env/env.dev';
import { ProcessoRows } from 'src/app/models/ProcessoRows';
import { UsuarioAtual } from 'src/app/components/login/usuario.atual';


@Injectable({
  providedIn: 'root'
})
export class ProcessoService {

  private http: HttpClient = inject(HttpClient);

    public get():Observable<Processo[]> {
      return this.http.get<Processo[]>(`${enviroment.URL_API}/processos/carregar`); 
    }

  public save(processo: Processo, id: number = 0): Observable<Processo> {
    processo.usuarioId = parseInt(UsuarioAtual.getidUsuarioAtual(), 10);
    if(id > 0) {
      return this.http.put<Processo>(`${enviroment.URL_API}/processos/atualizar/${id}`, processo);
    }
    return this.http.post<Processo>(`${enviroment.URL_API}/processos/criar`, processo);
  }
  
  public find(id: number): Observable<Processo> {
    return this.http.get<Processo>(`${enviroment.URL_API}/processos/carregar/${id}`);
  }

  public delete(id: number): Observable<void> {
    return this.http.delete<void>(`${enviroment.URL_API}/processos/deletar/${id}`);
  }

  // Método GET por usuarioId
  public getPorUser(): Observable<Processo> {
<<<<<<< HEAD
    return this.http.get<Processo>(`${enviroment.URL_API}/processos/carregue/usuarioId/${UsuarioAtual.getidUsuarioAtual()}`);
=======
    return this.http.get<Processo>(`${enviroment.URL_API}/processos/carregar/usuarioId/${UsuarioAtual.getidUsuarioAtual()}`);
>>>>>>> e0faae44b3f0ffe882af94026602505867f58892
  }

  // ----------------- Paginação
  // Método GET (READ)
  public getP(pageNumber: number, pageSize: number):Observable<ProcessoRows> {
    return this.http.get<ProcessoRows>(`${enviroment.URL_API}/processos/carregar/page?page=${pageNumber}&size=${pageSize}`);
  }

}