import {Classe} from './classe.model';

export interface EtudiantDTO {
    id?: string;
    email?: string;
    dateSoumission?: string;
    classe?: Classe;
    idSoumission?: string;
}
