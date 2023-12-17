import {Departement} from './departement.model';
import {Classe} from './classe.model';
import {Role} from './role.model';

export interface Utilisateur{
    id?:string
    username?:string
    email?:string
    departement?:Departement
    classe?:Classe
    firstname?:string
    lastname?:string
    identifiant?:string
    codePostal?:string
    description?:string
    linkedInUrl?:string
    password?:string
    adresse?:string
    actif?:string
    roles?: Role []
}
