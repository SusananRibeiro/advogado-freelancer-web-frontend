import { Component, inject, ViewChild, ElementRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Usuario } from 'src/app/models/Usuario';
import { LoginService } from 'src/app/services/login/login.service';
import { Router } from '@angular/router'; // Importe o Router do Angular
import { NavbarService } from 'src/app/services/NavbarService';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  private service: LoginService = inject(LoginService);
  private router: Router = inject(Router);
  public usuarios: Usuario[] = [];
  constructor(public navbarService: NavbarService) {}

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
        this.router.navigate(['/processos']);
        this.navbarService.mostrarNavbar = true;
      },
      (error: any) => {
        if (error.status === 401) {
          alert('Usuário ou senha inválida.');
        } else {
          alert('Erro ao realizar o login.');
        }
      }
    );
  }

  // Chamar o MODAL
  abrirModal() {
    const modelDiv = document.getElementById('janelaModal');
    if (modelDiv != null) {
      modelDiv.style.display = 'block';
    }
  }

  fecharModal() {
    const modelDiv = document.getElementById('janelaModal');
    if (modelDiv != null) {
      modelDiv.style.display = 'none';
    }
  }

}
