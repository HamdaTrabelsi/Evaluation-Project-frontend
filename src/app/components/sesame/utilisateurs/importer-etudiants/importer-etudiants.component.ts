import { Component } from '@angular/core';
import {Classe} from '../../../../shared/model/classe.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ClasseService} from '../../../../shared/services/classe.service';
import {Router} from '@angular/router';
import {EvaluationService} from '../../../../shared/services/evaluation.service';
import {MatiereService} from '../../../../shared/services/matiere.service';
import {UtilisateurService} from '../../../../shared/services/user.service';

@Component({
  selector: 'app-importer-etudiants',
  templateUrl: './importer-etudiants.component.html',
  styleUrls: ['./importer-etudiants.component.scss']
})
export class ImporterEtudiantsComponent {

  files: File[] = [];
  classesList: Array<Classe> = [];
  form: FormGroup;
  importSuccess = false
  nbImported = 0

  constructor(
      private formBuilder: FormBuilder,
      private classService: ClasseService,
      private router: Router,
      private utilisateurService:UtilisateurService
  ) {
  }


  ngOnInit(): void {
    this.getListClasses();
    // Initialize an empty form with default values
    this.form = this.formBuilder.group({
      classe: ['', Validators.required],
    });

    console.log(this.form)
    //this.form.get("creationDate").setValue(new Date())
  }

  valueChanged($event) {
    console.log(this.form)
    console.log(this.files)
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

  customSearchFn(term: string, item: any) {
    term = term.toLocaleLowerCase();
    return item?.nom?.toLocaleLowerCase().indexOf(term) > -1 || item?.anneeUniversitaire?.toLocaleLowerCase().indexOf(term) > -1;
  }

  onSelect(event) {
    this.files.push(...event.addedFiles);
    if(this.files.length > 1){
      this.replaceFile();
    }
  }

  replaceFile() {
    this.files.splice(0,1);
  }

  onRemove(event) {
    this.files.splice(this.files.indexOf(event), 1);
  }

  importUsers(){
    if(this.form.invalid || this.files.length == 0){
      return
    }

    let classeId = this.form.get("classe").value?.id
    // console.log(this.files[0])
    this.utilisateurService.importUser(classeId, this.files[0]).subscribe(
        success => {
          console.log(success)
          this.importSuccess = true
          this.nbImported = success
        }, error => {
          console.log(error)
        }
    )
  }
}
