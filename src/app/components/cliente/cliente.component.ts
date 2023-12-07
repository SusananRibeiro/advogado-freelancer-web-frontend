import { Component, inject, ViewChild, ElementRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ClienteService } from '../../services/cliente/cliente.service';
import { Cliente } from '../../models/Cliente';
import { ClienteRows } from 'src/app/models/ClienteRows';


@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.scss']
})
export class ClienteComponent {
  
  public status: string = 'Ativo'; // Valor padrão como true para o checkbox
  public relatorio: boolean = true;
  private service: ClienteService = inject(ClienteService);
  public clientes: Cliente[] = [];
 // public  clientesRows!: ClienteRows;

  @ViewChild("formulario") formulario: NgForm | undefined;

  ngOnInit(): void {
   // this.getP();
    this.get();
  }


  public get() {
    this.service.getPorUser().subscribe(
        (response: any) => {
            this.clientes = response;
        },
        (error: any) => {
            let errorMessage = "Erro desconhecido";

            // Verifica se a resposta contém um corpo e mensagens de erro
            if (error.error && error.error.messages) {
                // Assume que pode haver várias mensagens, pega a primeira
                errorMessage = error.error.messages[0];
            }
            alert("Erro ao buscar cliente: " + errorMessage)
        }
    )
}

public save(formulario: NgForm) {

    this.service.save(formulario.value, formulario.value.id).subscribe(
        (response: any) => {
            alert("Cliente salvo com sucesso.")
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
            alert("Erro ao salvar cliente: " + errorMessage)
        }
    )
}

public setEditar(cliente: Cliente) {        
    this.service.find(cliente.id).subscribe(
        (response: Cliente) => {
            this.abrirModal()
            this.formulario?.setValue(response);
            this.status = response.status;
        },
        (error: any) => {
            let errorMessage = "Erro desconhecido";

            // Verifica se a resposta contém um corpo e mensagens de erro
            if (error.error && error.error.messages) {
                // Assume que pode haver várias mensagens, pega a primeira
                errorMessage = error.error.messages[0];
            }
            alert("Erro ao salvar cliente: " + errorMessage)
        }
    );
}


public delete(id: number) {
    const confirmDelete = confirm('Tem certeza que deseja excluir este cliente?');

    if (confirmDelete) {
        this.service.delete(id).subscribe(
            (response: any) => {
                console.log(response);
                alert(response.error || 'Cliente excluído com sucesso');
                this.get();
            },
        );
    }
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
