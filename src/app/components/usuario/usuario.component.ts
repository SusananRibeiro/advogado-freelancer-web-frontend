import { Component, inject, ViewChild, ElementRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';
import { Usuario } from 'src/app/models/Usuario';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.scss']
})
export class UsuarioComponent {

  private service: UsuarioService = inject(UsuarioService);
  public usuarios: Usuario[] = [];

  @ViewChild("formulario") formulario: NgForm | undefined;

  ngOnInit(): void {
    this.get();
  }

  public get() {
    this.service.get().subscribe(
      (response: any) => {
        this.usuarios = response;
      },
      (error: any) => {
        //alert("Erro ao buscar usuarios!")
      }
    )
  }

  public save(formulario: NgForm) {

    this.service.save(formulario.value, formulario.value.id).subscribe(
        (response: any) => {
            alert("Usuário salvo com sucesso.")
            formulario.reset();
            this.get();
            this.fecharModal();
        },
        (error: any) => {
            let errorMessage = "Erro desconhecido";

            // Verifica se a resposta contém um corpo e mensagens de erro
            if (error.error && error.error.messages) {
                // Assume que pode haver várias mensagens, pega a primeira
                errorMessage = error.error.messages[0];
            }
            alert("Erro ao salvar usuário: " + errorMessage)
        }
    )
}

  // Chamar o MODAL
  abrirModal() {
    const modelDiv = document.getElementById('janelaModal');
    if(modelDiv != null) {
        modelDiv.style.display = 'block'; 
    }
  }

  fecharModal() {
    const modelDiv = document.getElementById('janelaModal');
    if(modelDiv != null) {
        modelDiv.style.display = 'none'; 
    }
  }

}
