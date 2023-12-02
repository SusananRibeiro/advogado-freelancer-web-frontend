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
  
  public status: boolean = true; // Valor padrão como true para o checkbox
  public relatorio: boolean = true;
  private service: ClienteService = inject(ClienteService);
  public clientes: Cliente[] = [];
 // public  clientesRows!: ClienteRows;

  @ViewChild("formulario") formulario: NgForm | undefined;

  ngOnInit(): void {
   // this.getP();
    this.get();
  }
  // GET
  public get() {
    this.service.get().subscribe(
      (response: any) => {
        
        this.clientes = response;
      },
      (error: any) => {
        
      }
    )
  }

  // POST
  public save(formulario: NgForm) {   
    this.service.save(formulario.value, formulario.value.id).subscribe(
      (response: any) => {
        alert("Cliente salvo com sucesso.")
        formulario.reset();
        this.get();
        this.fecharModal();
      },
      (error: any) => {
        alert("Erro ao salvar cliente. " + JSON.stringify(error))
      }
    )
  }

  // PUT
  public setEditar(cliente: Cliente) {
    this.service.find(cliente.id).subscribe(
      (response: Cliente) => { 
        this.abrirModal()
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

    // //Consulta com paginação
  // public getP(pageNumber: number = 0, pageSize: number = 10) {
  //   this.service.get(pageNumber, pageSize).subscribe(
  //     (response: ClienteRows) => {
  //       this.clientesRows = response;
  //     },
  //     (error: any) => {
  //       alert("Erro ao buscar clientes!")
  //     }
  //   )
  // }

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
