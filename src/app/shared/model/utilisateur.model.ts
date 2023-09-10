import {Departement} from './departement.model';
import {Classe} from './classe.model';

export interface Utilisateur{
    id?:string
    username?:string
    email?:string
    departement?:Departement
    classe?:Classe
    firstName?:string
    lastname?:string
    identifiant?:string
    codePostal?:string
    description?:string
    linkedInUrl?:string
    password?:string
    adresse?:string
    actif?:string
    roles?: string[]
}
