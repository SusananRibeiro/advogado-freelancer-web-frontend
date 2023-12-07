import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsuarioAtual {

  private static idUsuario: string | null = null;
  private static readonly USUARIO_KEY = 'idUsuario';

  static setIdUsuarioAtual(idUsuario: string): void {
    UsuarioAtual.idUsuario = idUsuario;
    localStorage.setItem(UsuarioAtual.USUARIO_KEY, idUsuario);
  }

  static getidUsuarioAtual(): string {
    return localStorage.getItem(UsuarioAtual.USUARIO_KEY) || UsuarioAtual.idUsuario || '';
  }
}
