import {Question} from './Question.model';

export interface Section {
    id: string,
    sectionName: string;
    questions: Question[];
}
