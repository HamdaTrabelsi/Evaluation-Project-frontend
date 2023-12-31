import {Question} from './question.model';

export interface Section {
    sectionId?: String,
    sectionName?: String,
    questions?: Array<Question>,
    enseignantId?: String,
    enseignantName?: String,
    classeName?: String,
    classeId?: String,
    matiereId?:String
}
