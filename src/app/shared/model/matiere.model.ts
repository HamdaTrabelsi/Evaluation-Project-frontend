import {Utilisateur} from './utilisateur.model';
import {Classe} from './classe.model';

export interface Matiere {
    id?:String
    nom?:String,
    semestre?:String,
    enseignant?:Utilisateur,
    classe?:Classe,
}
