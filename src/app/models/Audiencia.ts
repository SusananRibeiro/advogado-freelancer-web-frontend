import { Time } from "@angular/common";
import { Cliente } from "./Cliente";
import { Processo } from "./Processo";

export interface Audiencia{
    id: number,
    data: Date,
    hora: Time,
    clienteId: number,
    cliente: Cliente,
    processoId: number,
    processo: Processo,
    local: string,
    status: string,
    usuarioId: number,

    // Para a paginação
    totalPages: number,
    totalElements: number,
    pageNumber: number,
    size: number
}