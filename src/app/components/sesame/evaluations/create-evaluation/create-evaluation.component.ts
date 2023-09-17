import { Component } from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Classe} from '../../../../shared/model/classe.model';
import {ClasseService} from '../../../../shared/services/classe.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-create-evaluation',
  templateUrl: './create-evaluation.component.html',
  styleUrls: ['./create-evaluation.component.scss']
})
export class CreateEvaluationComponent {

  form : FormGroup
  classesList: Array<Classe> = []
  currentDate: Date

  constructor(
      private formBuilder: FormBuilder,
      private classService: ClasseService,
      private router: Router
  ) {}

  ngOnInit(): void {
    this.getListClasses()
    // Initialize an empty form with default values
    this.form = this.formBuilder.group({
      classe: ['', Validators.required],
      anneeUniversitaire: ['', Validators.required],
      semestre: ['', Validators.required],
      creationDate: [],
      limitDate: [, Validators.required],
      sections: this.formBuilder.array([]) // Create an empty array for sections
    });

    this.currentDate = new Date
    //this.form.get("creationDate").setValue(new Date())
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
      console.log(formData);
      this.router.navigate(["/sesame/evaluations/list"])
    } else {
      // Handle form validation errors or display a message to the user.
    }
  }



  removeSection(sectionIndex: number) {
    const confirmation = confirm('Êtes-vous sûr de vouloir supprimer cette section ?');
    if (confirmation) {
      this.sections.removeAt(sectionIndex);
    }
  }

  removeQuestion(sectionIndex: number, questionIndex: number) {
    const confirmation = confirm('Êtes-vous sûr de vouloir supprimer cette question ?');
    if (confirmation) {
      const section = this.sections.at(sectionIndex);
      const questions = section.get('questions') as FormArray;
      questions.removeAt(questionIndex);
    }
  }


  getListClasses(){
    this.classService.getAll().subscribe(
        success => {
          this.classesList = success
        },
        error => {
          console.log(error)
        }
    )
  }
}
