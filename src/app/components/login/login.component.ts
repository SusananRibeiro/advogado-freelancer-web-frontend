import { Component, inject, ViewChild, ElementRef  } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Usuario } from 'src/app/models/Usuario';
import { LoginService } from 'src/app/services/login/login.service';
import { Router } from '@angular/router'; // Importe o Router do Angular


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  private service: LoginService = inject(LoginService);
  private router: Router = inject(Router); 
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
//  public saveLogin(formulario: NgForm) {  
//   this.service.saveLogin(formulario.value, formulario.value.id).subscribe(
//     (response: any) => {
//       alert("Login realizado com sucesso!")
//       formulario.reset();
//     },
//     (error: any) => {
//       alert("Erro ao salvar cliente. " + JSON.stringify(error))
//     }
//   )
// }

public login(formulario: NgForm): void {
  this.service.saveLogin(formulario.value, formulario.value.id).subscribe(
    (response: any) => {
      // Se o login for bem-sucedido, redirecione para o componente de cliente
      this.router.navigate(['/clientes/carregue']); // Redireciona para a rota do componente de cliente após o login
    },
    (error: any) => {
      alert("Erro ao salvar cliente. " + JSON.stringify(error));
      console.error('Erro no login:', error);
    }
  );
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
