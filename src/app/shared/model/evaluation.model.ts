import {Classe} from './classe.model';
import {Formulaire} from './formulaire.model';

export interface Evaluation {
    id?: string,
    titre?: string,
    anneeUniversitaire?: string,
    semestre?: string,
    creationDate?: string,
    limitDate?: string,
    classe?: Classe,
    actif?:Boolean,
    formulaire?: Formulaire,
    description?:string
}
