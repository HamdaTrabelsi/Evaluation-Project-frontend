import {Component} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Classe} from '../../../../shared/model/classe.model';
import {ClasseService} from '../../../../shared/services/classe.service';
import {Router} from '@angular/router';
import {Evaluation} from '../../../../shared/model/evaluation.model';
import {EvaluationService} from '../../../../shared/services/evaluation.service';

@Component({
    selector: 'app-create-evaluation',
    templateUrl: './create-evaluation.component.html',
    styleUrls: ['./create-evaluation.component.scss']
})
export class CreateEvaluationComponent {

    form: FormGroup;
    classesList: Array<Classe> = [];
    currentDate: Date;

    constructor(
        private formBuilder: FormBuilder,
        private classService: ClasseService,
        private router: Router,
        private evaluationService: EvaluationService
    ) {
    }

    get formulaire(): FormArray {
        return this.form.get('formulaire') as FormArray;
    }

    ngOnInit(): void {
        this.getListClasses();
        // Initialize an empty form with default values
        this.form = this.formBuilder.group({
            titre: ['', Validators.required],
            classe: ['', Validators.required],
            anneeUniversitaire: ['', Validators.required],
            semestre: ['', Validators.required],
            creationDate: [],
            limitDate: [, Validators.required],
            formulaire: this.formBuilder.array([]) // Create an empty array for sections
        });

        this.currentDate = new Date;
        //this.form.get("creationDate").setValue(new Date())
    }

    addSection() {
        let currentSection = this.formulaire.length + 1;
        console.log(length);
        this.formulaire.push(this.formBuilder.group({
            sectionId: ['Section ' + currentSection],
            sectionName: ['', Validators.required],
            questions: this.formBuilder.array([])
        }));
    }

    addQuestion(sectionIndex: number) {
        const section = this.formulaire.at(sectionIndex);
        const questions = section.get('questions') as FormArray;
        questions.push(this.formBuilder.group({
            questionIndex: '',
            questionText: ['', Validators.required],
            criteres: this.formBuilder.array([])
        }));
    }

    addCritere(sectionIndex: number, questionIndex: number) {
        const section = this.formulaire.at(sectionIndex) as FormArray;
        const questions = section.get('questions') as FormArray;
        const questionsAt = questions.at(questionIndex);
        const criteres = questionsAt.get('criteres') as FormArray;
        criteres.push(this.formBuilder.group({
            critereIndex: '',
            titre: '',
        }));
    }


    removeSection(sectionIndex: number) {
        const confirmation = confirm('Êtes-vous sûr de vouloir supprimer cette section ?');
        if (confirmation) {
            this.formulaire.removeAt(sectionIndex);
        }
    }

    removeQuestion(sectionIndex: number, questionIndex: number) {
        const confirmation = confirm('Êtes-vous sûr de vouloir supprimer cette question ?');
        if (confirmation) {
            const section = this.formulaire.at(sectionIndex);
            const questions = section.get('questions') as FormArray;
            questions.removeAt(questionIndex);
        }
    }

    removeCritere(sectionIndex: number, questionIndex: number, critereIndex: number) {
        const confirmation = confirm('Êtes-vous sûr de vouloir supprimer ce critère ?');
        if (confirmation) {
            const section = this.formulaire.at(sectionIndex) as FormArray;
            const questions = section.get('questions') as FormArray;
            const questionsAt = questions.at(questionIndex);
            const criteres = questionsAt.get('criteres') as FormArray;
            criteres.removeAt(critereIndex);
        }
    }


    getListClasses() {
        this.classService.getAll().subscribe(
            success => {
                this.classesList = success;
            },
            error => {
                console.log(error);
            }
        );
    }

    onSubmit() {
        if (this.form.valid) {
            let evaluation: Evaluation = this.createEvaluation()
            this.evaluationService.add(evaluation).subscribe(
                success => {
                    console.log("success")
                    this.router.navigate(["/sesame/evaluations/list"])
                },
                error => {
                    console.log(error)
                }
            )
        } else {
            // Handle form validation errors or display a message to the user.
        }
    }


    createEvaluation() {
        let evaluation: Evaluation = {
            titre: this.form.get('titre').value,
            classe: this.form.get('classe').value,
            anneeUniversitaire: this.form.get('anneeUniversitaire').value,
            semestre: this.form.get('semestre').value,
            creationDate: this.form.get('creationDate').value,
            limitDate: this.form.get('limitDate').value,
            formulaire: {
                sections : this.form.get('formulaire').value,
            }
        };

        return evaluation;
    }


}
