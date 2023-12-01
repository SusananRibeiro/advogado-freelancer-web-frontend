import { Component, inject, ViewChild, ElementRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ProcessoService } from '../../services/processo/processo.service';
import { Processo } from '../../models/Processo';
import { ProcessoRows } from 'src/app/models/ProcessoRows';


@Component({
    selector: 'app-processo',
    templateUrl: './processo.component.html',
    styleUrls: ['./processo.component.scss']
})
export class ProcessoComponent {

    public status: number = 1;
    public relatorio: boolean = true;
    private service: ProcessoService = inject(ProcessoService);
    public processos: Processo[] = [];

    @ViewChild("formulario") formulario: NgForm | undefined;

    ngOnInit(): void {
        this.get();
    }

    public get() {
        this.service.get().subscribe(
            (response: any) => {
                this.processos = response;
            },
            (error: any) => {
                //alert("Erro ao buscar processos!")
            }
        )
    }


    public save(formulario: NgForm) {

        this.service.save(formulario.value, formulario.value.id).subscribe(
            (response: any) => {
                alert("Processo salvo com sucesso.")
                formulario.reset();
                this.get();
                this.fecharModal();
            },
            (error: any) => {
                alert("Erro ao salvar processo. " + JSON.stringify(error))
            }
        )
    }

    public setEditar(processo: Processo) {
        this.service.find(processo.id).subscribe(
            (response: Processo) => {
                this.abrirModal()
                this.formulario?.setValue(response);

            },
            (error: any) => {
                alert("Erro ao buscar processo!");
            }
        );
    }


    public delete(id: number) {
        const confirmDelete = confirm('Tem certeza que deseja excluir este processo?');

        if (confirmDelete) {
            this.service.delete(id).subscribe(
                (response: any) => {
                    alert('Processo excluído com sucesso');
                    this.get();
                },
                (error: any) => {
                    alert('Erro ao excluir o processo. ' + error);
                }
            );
        }
    }


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
