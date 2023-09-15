import { Component } from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-create-evaluation',
  templateUrl: './create-evaluation.component.html',
  styleUrls: ['./create-evaluation.component.scss']
})
export class CreateEvaluationComponent {

  form : FormGroup

  constructor(
      private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    // Initialize an empty form with default values
    this.form = this.formBuilder.group({
      class: ['', Validators.required],
      creationDate: new Date(),
      limitDate: new Date(),
      sections: this.formBuilder.array([]) // Create an empty array for sections
    });
  }

  get sections(): FormArray {
    return this.form.get('sections') as FormArray;
  }

  addSection() {
    this.sections.push(this.formBuilder.group({
      sectionId: '',
      sectionName: '',
      questions: this.formBuilder.array([])
    }));
  }

  addQuestion(sectionIndex: number) {
    const section = this.sections.at(sectionIndex);
    const questions = section.get('questions') as FormArray;
    questions.push(this.formBuilder.group({
      questionId: '',
      questionText: ''
    }));
  }

  editSection(sectionIndex: number) {

    const section = this.sections.at(sectionIndex);
    const sectionName = prompt('Edit Section Name:', section.value.sectionName);
    if (sectionName !== null) {
      section.patchValue({ sectionName });
    }
  }

  removeSection(sectionIndex: number) {
    const confirmation = confirm('Are you sure you want to remove this section?');
    if (confirmation) {
      this.sections.removeAt(sectionIndex);
    }
  }

  removeQuestion(sectionIndex: number, questionIndex: number) {
    const confirmation = confirm('Are you sure you want to remove this question?');
    if (confirmation) {
      const section = this.sections.at(sectionIndex);
      const questions = section.get('questions') as FormArray;
      questions.removeAt(questionIndex);
    }
  }
}
