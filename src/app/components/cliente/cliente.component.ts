import { Component, inject, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ClienteService } from '../../services/cliente.service';
import { Cliente } from '../../models/Cliente';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.scss']
})
export class ClienteComponent {

  private service: ClienteService = inject(ClienteService);
  public clientes: Cliente[] = [];

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
        alert("Erro ao buscar clientes!")
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
        alert("Cliente salvo com sucesso.")
        formulario.reset();
        this.get();
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
