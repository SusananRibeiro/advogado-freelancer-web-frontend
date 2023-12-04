import { Cliente } from "./Cliente";
import { ClienteInfoRows } from "./ClienteInfoRows";

export interface ClienteRows {
    rows: Cliente[],
    infoRows: ClienteInfoRows
}