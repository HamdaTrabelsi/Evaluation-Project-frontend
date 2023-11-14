import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {MustMatch} from '../../../../../shared/validators/passwordMatch';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../../../../shared/auth/auth.service';
import {EvaluationService} from '../../../../../shared/services/evaluation.service';
import {Critere} from '../../../../../shared/model/critere.model';
import {Soumission} from '../../../../../shared/model/soumission.model';
import {Section} from '../../../../../shared/model/section.model';
import {SoumissionService} from '../../../../../shared/services/soumission.service';
import {Formulaire} from '../../../../../shared/model/formulaire.model';

@Component({
  selector: 'app-questionnaires-etudiant',
  templateUrl: './questionnaires-etudiant.component.html',
  styleUrls: ['./questionnaires-etudiant.component.scss']
})
export class QuestionnairesEtudiantComponent {

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  fourthFormGroup: FormGroup;

  maxDate: Date;

  form: FormGroup;
  formData: any = {};
  evaluationJson: any;

  userId: string;
  evaluationId;

  constructor(
      private _formBuilder: FormBuilder,
      private toaster: ToastrService,
      private activatedRoute: ActivatedRoute,
      private authService:AuthService,
      private evaluationService: EvaluationService,
      private soumissionService: SoumissionService,
      private router: Router
  ) {
    this.maxDate = new Date();
    this.form = this._formBuilder.group({});
  }

  initForm() {
    if (this.formData && this.formData.sections) {
      for (const section of this.formData.sections) {
        const sectionGroup = this._formBuilder.group({});
        for (const question of section.questions) {
          const questionGroup = this._formBuilder.group({});
          for (const critere of question.criteres) {
            questionGroup.addControl(critere.critereIndex, this._formBuilder.control(critere.reponse));
          }
          sectionGroup.addControl(question.questionIndex, questionGroup);
        }
        this.form.addControl(section.sectionId, sectionGroup);
      }
    }
    console.log(this.form)
  }

  ngOnInit(): void {
    this.evaluationId = this.activatedRoute.snapshot.paramMap.get('id');

    this.getEvaluation()
  }

  public finish(){
    this.toaster.success('Successfully Registered')
  }

  getEvaluation(){
    this.userId = this.authService.userData.id
    this.evaluationService.getEvaluationById(this.evaluationId,this.userId).subscribe(
        success => {
          this.evaluationJson = success
          this.formData = this.evaluationJson.formulaire
          this.sortArrayByProperty(this.formData.sections, 'sectionId');
          this.sortQuestions()
          this.sortCriteres()
          this.initForm();

        },
        error => {
          console.log(error)
        }
    )
  }

  submitForm() {
    if (this.form.valid) {
      for (const section of this.formData.sections) {
        for (const question of section.questions) {
          for (const critere of question.criteres) {
            critere.reponse = this.form.get(`${section.sectionId}.${question.questionIndex}.${critere.critereIndex}`).value;
          }
        }
      }

      // Now 'formData' contains the user responses in the 'reponse' field
    }

    let soumission: Soumission = this.createSoumission(this.formData);
    console.log("soumission")
    console.log(soumission)

    console.log("form")
    console.log(this.form)


    this.soumissionService.add(soumission).subscribe(
        success => {
          console.log("success")
          console.log(success)
          this.router.navigate(["/sesame/questionnaire/etudiant/liste"])

        },
        error => {

        }
    )
  }


  // Generic sorting function
  sortArrayByProperty(array: any[], property: string) {
    return array.sort((a, b) => a[property].localeCompare(b[property]));
  }

  // Example usage to sort sections by sectionId
  sortSections() {
    this.sortArrayByProperty(this.formData.sections, 'sectionId');
  }

  // Example usage to sort questions by questionIndex in a specific section
  sortQuestions() {
    if (this.formData && this.formData.sections) {
      this.formData.sections.forEach((section) => {
        if (section.questions) {
          section.questions = this.sortArrayByProperty(section.questions, 'questionIndex');
        }
      });
    }
  }

  // Example usage to sort criteres by critereIndex in a specific section and question
  sortCriteres() {
    if (this.formData && this.formData.sections) {
      this.formData.sections.forEach((section) => {
        if (section.questions) {
          section.questions.forEach((question) => {
            if (question.criteres) {
              question.criteres = this.sortArrayByProperty(question.criteres, 'critereIndex');
            }
          });
        }
      });
    }
  }

  createSoumission(sections:Formulaire) {
    let soumission: Soumission = {
      evaluation: {
        id: this.evaluationJson.id
      },
      utilisateur: {
        id: this.userId
      },
      formulaire: sections,
    }
    return soumission
  }

}
