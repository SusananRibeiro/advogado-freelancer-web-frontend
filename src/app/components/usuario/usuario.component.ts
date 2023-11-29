import { Component, inject, ViewChild, ElementRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UsuarioService } from 'src/app/services/usuario.service';
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
        //alert("Erro ao buscar usuario!")
      }
    )
  }

  

  // POST
  public save(formulario: NgForm) {    
    this.service.save(formulario.value, formulario.value.id).subscribe(
      (response: any) => {
        alert("Usuário salvo com sucesso.")
        formulario.reset();
        this.closeModal();
      },
      (error: any) => {
        console.log(this.usuarios)
        alert("Erro ao salvar usuário. " + JSON.stringify(error))
      }
    )
  }

  // PUT
  public setEditar(usuario: Usuario) {
    this.service.find(usuario.id).subscribe(
      (response: Usuario) => { 
        this.openModal();
        this.formulario?.setValue(response);           
      },
      (error: any) => {
        alert("Erro ao buscar usuário!");
      }
    );    
  }  

  // // DELETE
  public delete(id: number) {
    const confirmDelete = confirm('Tem certeza que deseja excluir a conta?');  
    if (confirmDelete) {
      this.service.delete(id).subscribe(
        (response: any) => {
          alert('Usuário excluído com sucesso');
          this.get();
        },
        (error: any) => {
          alert('Erro ao excluir o usuário. ' + error);
        }
      );
    }
  }



  // Chamar o MODAL
  openModal() {
    const modelDiv = document.getElementById('myModal');
    if(modelDiv != null) {
        modelDiv.style.display = 'block'; 
    }
  }

  closeModal() {
    const modelDiv = document.getElementById('myModal');
    if(modelDiv != null) {
        modelDiv.style.display = 'none'; 
    }
  }

}
