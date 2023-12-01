export interface Processo {
    id: number,
    numeroProcesso: string,
    dataContrato: Date,
    codigoCliente: number,
    acaoProcesso: string,
    tribunal: string,
    vara: string,
    comarca: string,
    foro: string,
    linkDocumentos: string,
    dataAbertura: Date,
    dataFechamento: Date,
    status: number,
    
    // Para a paginação
    totalPages: number,
    totalElements: number,
    pageNumber: number,
    size: number
}