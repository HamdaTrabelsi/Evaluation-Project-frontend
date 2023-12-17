import {Departement} from './departement.model';

export interface Classe{
    id?:string
    nom?:string
    anneeUniversitaire?:string
    departement?: Departement
    dateCreation?:string
    nbEtudiants?:string
    nbEnseignants?:string
}
