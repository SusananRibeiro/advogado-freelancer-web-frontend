import { Cliente } from "./Cliente"

export interface Processo {
    id: number,
    numeroProcesso: string,
    dataContrato: Date,
    clienteId: number,
    acaoProcesso: string,
    tribunal: string,
    vara: string,
    comarca: string,
    foro: string,
    linkDocumento: string,
    dataAbertura: Date,
    dataFechamento: Date,
    status: string,
    cliente: Cliente,
    
    // Para a paginação
    totalPages: number,
    totalElements: number,
    pageNumber: number,
    size: number
}