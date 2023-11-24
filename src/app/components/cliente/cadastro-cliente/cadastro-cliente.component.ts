import { Component, inject, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Cliente } from 'src/app/models/Cliente';
import { CadastroClienteService } from 'src/app/services/cadastro-cliente.service';
import { ClienteComponent } from '../cliente.component';

@Component({
  selector: 'app-cadastro-cliente',
  templateUrl: './cadastro-cliente.component.html',
  styleUrls: ['./cadastro-cliente.component.scss']
})
export class CadastroClienteComponent {

  private service: CadastroClienteService = inject(CadastroClienteService);  
  public clientes: Cliente[] = [];
  private modal: ClienteComponent = inject(ClienteComponent);

  @ViewChild("formulario") formulario: NgForm | undefined;

  ngOnInit(): void {
    this.get();
  }

  public get() {
    this.service.get().subscribe(
      (response: any) => {
        this.clientes = response;
      },
      (error: any) => {
        //alert("Erro ao buscar clientes!")
      }
    )
  }

  public save(formulario: NgForm) {
    if(!formulario.valid) {
      alert("Dados inválidos")
      return;
    }
    this.service.save(formulario.value, formulario.value.id).subscribe(
      (response: any) => {        
        formulario.reset();
        this.get();
        this.modal.closeModal();
        alert("Cliente salvo com sucesso.")
      },
      (error: any) => {
        alert("Erro ao salvar cliente. " + error)
      }
    )
  }

  public setEditar(cliente: Cliente) {
    // this.formulario?.setValue(produto); -> Foi mudado essa parte
    this.service.find(cliente.id).subscribe(
      (response: Cliente) => {
        this.modal.openModal();
        this.formulario?.setValue(response);
        
      },
      (error: any) => {
        alert("Erro ao buscar cliente!");
      }
    );    
  }  

  public delete(id: number) {
    this.service.delete(id).subscribe(
      (response: any) => {
        alert("Cliente excluido com sucesso");
        this.get();
      },
      (error: any) => {
        alert("Erro ao excluir o cliente. " + error);
      }
    )
  }

}
