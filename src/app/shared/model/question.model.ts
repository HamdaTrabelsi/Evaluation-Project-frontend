import {Critere} from './critere.model';

export interface Question {
    questionIndex?:String,
    questionText?:String,
    criteres:Array<Critere>
}
