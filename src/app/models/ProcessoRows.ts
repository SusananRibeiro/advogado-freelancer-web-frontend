import { Processo } from "./Processo";
import { ProcessoInfoRows } from "./ProcessoInfoRows";

export interface ProcessoRows {
    rows: Processo[], 
    infoRows: ProcessoInfoRows
}