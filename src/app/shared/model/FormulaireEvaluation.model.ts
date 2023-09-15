import {Section} from './Section.model';

export interface FormulaireEvaluation {
  classe: string;
  creationDate: Date;
  limitDate: Date;
  sections: Section[];
}
