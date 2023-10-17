import {Classe} from './classe.model';
import {Formulaire} from './formulaire.model';

export interface Evaluation {
    id?: String,
    titre?: String,
    anneeUniversitaire?: String,
    semestre?: String,
    creationDate?: String,
    limitDate?: String,
    classe?: Classe,
    actif?:Boolean,
    formulaire?: Formulaire
}
