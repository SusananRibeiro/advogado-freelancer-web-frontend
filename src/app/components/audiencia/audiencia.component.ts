import { Component, ViewChild, inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Audiencia } from 'src/app/models/Audiencia';
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

  @ViewChild("formulario") formulario: NgForm | undefined;

  ngOnInit(): void {
    this.get();
  }

  // GET
  public get() {
    this.service.get().subscribe(
      (response: any) => {
        this.audiencias = response;
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
        alert("Erro ao salvar audiencia. " + JSON.stringify(error))
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
          alert('Audiencia excluída com sucesso');
          this.get();
        },
        (error: any) => {
          alert('Erro ao excluir a audiencia. ' + error);
        }
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
