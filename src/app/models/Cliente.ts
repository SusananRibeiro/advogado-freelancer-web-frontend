export interface Cliente {
    id: number,
    nomeCompleto: string,
    cpfOuCnpj: string,
    dataNascimento: Date,
    rua: string,
    numero: number,
    bairro: string,
    uf: string,
    cep: number,
    pais: string,
    telefone: string,
    email: string,
    complemento: string,
    status: boolean

}