import { Component, inject, ViewChild, ElementRef  } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Usuario } from 'src/app/models/Usuario';
import { LoginService } from 'src/app/services/login/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  private service: LoginService = inject(LoginService);
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

  // POST
 public save(formulario: NgForm) {  
  this.service.save(formulario.value, formulario.value.id).subscribe(
    (response: any) => {
      alert("Usuario salvo com sucesso.")
      formulario.reset();
    },
    (error: any) => {
      alert("Erro ao salvar cliente. " + JSON.stringify(error))
    }
  )
}

  // POST
 public saveLogin(formulario: NgForm) {  
  this.service.saveLogin(formulario.value, formulario.value.id).subscribe(
    (response: any) => {
      alert("Login realizado com sucesso!")
      formulario.reset();
    },
    (error: any) => {
      alert("Erro ao salvar cliente. " + JSON.stringify(error))
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
