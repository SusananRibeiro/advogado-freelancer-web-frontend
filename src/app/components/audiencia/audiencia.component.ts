import { Component, ViewChild, inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Audiencia } from 'src/app/models/Audiencia';
import { Cliente } from 'src/app/models/Cliente';
import { Processo } from 'src/app/models/Processo';
import { AudienciaService } from 'src/app/services/audiencia/audiencia.service';

@Component({
  selector: 'app-audiencia',
  templateUrl: './audiencia.component.html',
  styleUrls: ['./audiencia.component.scss']
})
export class AudienciaComponent {
  public status: string = "em_andamento";
  public relatorio: boolean= true;
  public service: AudienciaService = inject(AudienciaService);
  public audiencias : Audiencia[]= [];
  public clientes : Cliente[] = [];
  public processos : Processo[] = [];

  @ViewChild("formulario") formulario: NgForm | undefined;

  ngOnInit(): void {
    this.get();
  }

  // GET
  public get() {
    this.service.getPorUser().subscribe(
        (response: any) => {
            this.audiencias = response;
        },
        (error: any) => {
            let errorMessage = "Erro desconhecido";

            // Verifica se a resposta contém um corpo e mensagens de erro
            if (error.error && error.error.messages) {
                // Assume que pode haver várias mensagens, pega a primeira
                errorMessage = error.error.messages[0];
            }
            alert("Erro ao buscar audiência: " + errorMessage)
        }
    )
}

  // POST
  public save(formulario: NgForm) {   
    this.service.save(formulario.value, formulario.value.id).subscribe(
      (response: any) => {
        alert("Audiência salva com sucesso.")
        formulario.reset();
        this.get();
        this.fecharModal();
      },
      (error: any) => {
        alert("Erro ao salvar audiência. " + JSON.stringify(error))
      }
    )
  }

  // PUT
  public setEditar(audiencia: Audiencia) {
    this.service.find(audiencia.id).subscribe(
      (response: Audiencia) => { 
        this.abrirModal()
        this.formulario?.setValue(response);  
                    
      },
      (error: any) => {
        alert("Erro ao buscar audiencia!");
      }
    );    
  }
  
  // // DELETE
  public delete(id: number) {
    const confirmDelete = confirm('Tem certeza que deseja excluir esta audiencia?');
  
    if (confirmDelete) {
      this.service.delete(id).subscribe(
        (response: any) => {
          alert('Audiência excluída com sucesso');
          this.get();
        },
        (error: any) => {
          alert('Erro ao excluir a audiência. ' + error);
        }
      );
    }
  }
  
  // Chamar o MODAL
  abrirModal() {
    this.service.getPorUser().subscribe(
        (response: any) => {
            this.audiencias = response;
        },
        (error: any) => {
            let errorMessage = "Erro desconhecido";

            if (error.error && error.error.messages) {
                errorMessage = error.error.messages[0];
            }
            alert("Erro ao buscar audiências: " + errorMessage)
        }
    )

   const modelDiv = document.getElementById('janelaModal');
   if (modelDiv != null) {
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
