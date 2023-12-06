import { Audiencia } from "./Audiencia";
import { AudienciaInfoRows } from "./AudienciaInfoRows";

export interface AudienciaRows{
    rows: Audiencia[],
    infoRows: AudienciaInfoRows
}