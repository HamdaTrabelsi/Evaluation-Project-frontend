import {MoyenneCours} from './moyenneCours.model';

export interface MoyenneFormation {
    name?:string,
    moyennesCours?:MoyenneCours[],
    indiceRetour?:number
}
