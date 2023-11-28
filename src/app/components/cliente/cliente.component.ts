import { Component, inject, ViewChild, ElementRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ClienteService } from '../../services/cliente.service';
import { Cliente } from '../../models/Cliente';
import { ClienteRows } from 'src/app/models/ClienteRows';


@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.scss']
})
export class ClienteComponent {

  private service: ClienteService = inject(ClienteService);
  public clientes: Cliente[] = [];
 // public clientes: ClienteRows[] = [];

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

  // Consulta
  // public get(pageNumber: number = 0, pageSize: number = 10) {
  //   this.service.get(pageNumber, pageSize).subscribe(
  //     (response: ClienteRows) => {
  //       this.clientes = response;
  //     },
  //     (error: any) => {
  //       alert("Erro ao buscar clientes!")
  //     }
  //   )
  // }


  // POST
  public save(formulario: NgForm) {    

    this.service.save(formulario.value, formulario.value.id).subscribe(
      (response: any) => {
        alert("Cliente salvo com sucesso.")
        formulario.reset();
        this.get();
        this.closeModal();
      },
      (error: any) => {
        alert("Erro ao salvar cliente. " + JSON.stringify(error))
      }
    )
  }

  // PUT
  public setEditar(cliente: Cliente) {
    //this.formulario?.setValue(cliente); -> Foi mudado essa parte
    this.service.find(cliente.id).subscribe(
      (response: Cliente) => { 
        this.openModal()
        console.log(this.formulario);
        this.formulario?.setValue(response);  
                    
      },
      (error: any) => {
        alert("Erro ao buscar cliente!");
      }
    );    
  }  

  // // DELETE
  public delete(id: number) {
    const confirmDelete = confirm('Tem certeza que deseja excluir este cliente?');
  
    if (confirmDelete) {
      this.service.delete(id).subscribe(
        (response: any) => {
          alert('Cliente excluído com sucesso');
          this.get();
        },
        (error: any) => {
          alert('Erro ao excluir o cliente. ' + error);
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
