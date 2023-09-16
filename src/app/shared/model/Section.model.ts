import {Question} from './Question.model';

export interface Section {
    sectionIndex: string,
    sectionName: string;
    questions: Question[];
}
