import { Time } from "@angular/common";

export interface Audiencia{
    id: number,
    data: Date,
    hora: Time,
    cliente_id: number,
    cliente_nome: string,
    processo_id: string,
    processo_nome: string,
    local: string,
    status: string,

    // Para a paginação
    totalPages: number,
    totalElements: number,
    pageNumber: number,
    size: number
}