import {Evaluation} from './evaluation.model';
import {Utilisateur} from './utilisateur.model';
import {Formulaire} from './formulaire.model';
import {Section} from './section.model';

export interface Soumission {
    id?: String;
    evaluation?:Evaluation;
    utilisateur?:Utilisateur;
    formulaire?:Formulaire;
    dateCreation?:String;
}
