import { Time } from "@angular/common";
import { Cliente } from "./Cliente";
import { Processo } from "./Processo";

export interface Audiencia{
    id: number,
    data: Date,
    hora: Time,
    cliente_id: Cliente,
    processo_id: Processo,
    local: string,
    status: string,

    // Para a paginação
    totalPages: number,
    totalElements: number,
    pageNumber: number,
    size: number
}