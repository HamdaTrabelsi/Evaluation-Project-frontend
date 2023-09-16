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
      classe: ['', Validators.required],
      creationDate: new Date(),
      limitDate: new Date(),
      sections: this.formBuilder.array([]) // Create an empty array for sections
    });
  }

  get sections(): FormArray {
    return this.form.get('sections') as FormArray;
  }

  addSection() {
    let currentSection = this.sections.length + 1
    console.log(length)
    this.sections.push(this.formBuilder.group({
      sectionId: ['Section ' + currentSection],
      sectionName: ['', Validators.required],
      questions: this.formBuilder.array([])
    }));
  }

  addQuestion(sectionIndex: number) {
    const section = this.sections.at(sectionIndex);
    const questions = section.get('questions') as FormArray;
    questions.push(this.formBuilder.group({
      questionIndex: '',
      questionText: ['', Validators.required]
    }));
  }

  onSubmit() {
    if (this.form.valid) {
      // The form is valid, so you can access its values and perform actions.
      const formData = this.form.value;
      console.log(formData); // You can send this data to a server or perform other actions.
    } else {
      // Handle form validation errors or display a message to the user.
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
