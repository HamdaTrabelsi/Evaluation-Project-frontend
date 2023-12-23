import {Injectable, OnDestroy, OnInit} from '@angular/core';
import { Subject, BehaviorSubject, fromEvent } from "rxjs";
import { takeUntil, debounceTime } from "rxjs/operators";
import { Router } from "@angular/router";
import {AuthService} from '../auth/auth.service';

// Menu
export interface Menu {
  headTitle1?: string;
  headTitle2?: string;
  path?: string;
  title?: string;
  icon?: string;
  type?: string;
  badgeType?: string;
  badgeValue?: string;
  active?: boolean;
  bookmark?: boolean;
  children?: Menu[];
}

@Injectable({
  providedIn: "root",
})
export class NavService implements OnDestroy {
  private unsubscriber: Subject<any> = new Subject();
  public screenWidth: BehaviorSubject<number> = new BehaviorSubject(window.innerWidth);

  // Search Box
  public search: boolean = false;

  // Language
  public language: boolean = false;

  // Mega Menu
  public megaMenu: boolean = false;
  public levelMenu: boolean = false;
  public megaMenuColapse: boolean = window.innerWidth < 1199 ? true : false;

  // Collapse Sidebar
  public collapseSidebar: boolean = window.innerWidth < 991 ? true : false;

  // For Horizontal Layout Mobile
  public horizontal: boolean = window.innerWidth < 991 ? false : true;

  // Full screen
  public fullScreen: boolean = false;


  // Array
  items

  constructor(
      private router: Router,
      private authService: AuthService) {
    this.chooseMenuForRole()
    this.setScreenWidth(window.innerWidth);
    fromEvent(window, "resize")
      .pipe(debounceTime(1000), takeUntil(this.unsubscriber))
      .subscribe((evt: any) => {
        this.setScreenWidth(evt.target.innerWidth);
        if (evt.target.innerWidth < 991) {
          this.collapseSidebar = true;
          this.megaMenu = false;
          this.levelMenu = false;
        }
        if (evt.target.innerWidth < 1199) {
          this.megaMenuColapse = true;
        }
      });
    if (window.innerWidth < 991) {
      // Detect Route change sidebar close
      this.router.events.subscribe((event) => {
        this.collapseSidebar = true;
        this.megaMenu = false;
        this.levelMenu = false;
      });
    }
  }

  ngOnDestroy() {
    // this.unsubscriber.next();
    this.unsubscriber.complete();
  }

  private setScreenWidth(width: number): void {
    this.screenWidth.next(width);
  }

  ADMIN_MENU_ITEMS: Menu[] = [
    {
      headTitle1: "Applications",
      headTitle2: "Ready To Use Apps.",
    },
    {
      title: "Evaluations",
      icon: "project",
      type: "sub",
      badgeType: "light-secondary",
      // badgeValue: "New",
      active: false,
      children: [
        { path: "/sesame/evaluations/list", title: "List Evaluation", type: "link" },
        { path: "/sesame/evaluations/create", title: "Nouvelle Evaluation", type: "link" },
      ],
    },
    {
      path: "/sesame/departement/list",
      title: "Departements",
      icon: "file",
      type: "link",
    },
    {
      path: "/sesame/classes/list",
      title: "Classes",
      icon: "file",
      type: "link",
    },
    {
      path: "/sesame/matieres/list",
      title: "Matières",
      icon: "file",
      type: "link",
    },
    {
      title: "Utilisateurs",
      icon: "project",
      type: "sub",
      badgeType: "light-secondary",
      active: false,
      children: [
        {
          path: "/sesame/utilisateurs/list",
          title: "Utilisateurs",
          icon: "file",
          type: "link",
        },
        {
          path: "/sesame/utilisateurs/list/superadministrateur",
          title: "Super Administrateurs",
          icon: "file",
          type: "link",
        },
        {
          path: "/sesame/utilisateurs/list/administrateurs",
          title: "Administrateurs",
          icon: "file",
          type: "link",
        },
        {
          path: "/sesame/utilisateurs/list/enseignants",
          title: "Enseignants",
          icon: "file",
          type: "link",
        },
        {
          path: "/sesame/utilisateurs/list/etudiants",
          title: "Etudiants",
          icon: "file",
          type: "link",
        },
      ],
    },
  ];

  SUPER_ADMIN_MENU_ITEMS: Menu[] = [
    {
      headTitle1: "Applications",
      headTitle2: "Ready To Use Apps.",
    },
    {
      title: "Evaluations",
      icon: "project",
      type: "sub",
      badgeType: "light-secondary",
      // badgeValue: "New",
      active: false,
      children: [
        { path: "/sesame/evaluations/list", title: "List Evaluation", type: "link" },
      ],
    },
    {
      path: "/sesame/departement/list",
      title: "Departements",
      icon: "file",
      type: "link",
    },
    {
      path: "/sesame/classes/list",
      title: "Classes",
      icon: "file",
      type: "link",
    },
    {
      path: "/sesame/matieres/list",
      title: "Matières",
      icon: "file",
      type: "link",
    },
    {
      title: "Utilisateurs",
      icon: "project",
      type: "sub",
      badgeType: "light-secondary",
      active: false,
      children: [
        {
          path: "/sesame/utilisateurs/list",
          title: "Utilisateurs",
          icon: "file",
          type: "link",
        },
        {
          path: "/sesame/utilisateurs/list/superadministrateur",
          title: "Super Administrateurs",
          icon: "file",
          type: "link",
        },
        {
          path: "/sesame/utilisateurs/list/administrateurs",
          title: "Administrateurs",
          icon: "file",
          type: "link",
        },
        {
          path: "/sesame/utilisateurs/list/enseignants",
          title: "Enseignants",
          icon: "file",
          type: "link",
        },
        {
          path: "/sesame/utilisateurs/list/etudiants",
          title: "Etudiants",
          icon: "file",
          type: "link",
        },
      ],
    },
  ];

  ETUDIANT_MENU_ITEMS :Menu[] = [
    // {
    //   headTitle1: " ",
    //   headTitle2: "Ready To Use Apps.",
    // },

    {
      path: "/sesame/questionnaire/etudiant/liste",
      title: "Questionnaires",
      icon: "file",
      type: "link",
    },
    // {
    //   path: "/sesame/questionnaire/",
    //   title: "Rapport",
    //   icon: "file",
    //   type: "link",
    // },
  ];

  ENSEIGNANT_MENU_ITEMS :Menu[] = [
    {
      path: "/sesame/questionnaire/enseignant/liste",
      title: "Evaluations",
      icon: "file",
      type: "link",
    },
    // {
    //   path: "/sesame/classes/list",
    //   title: "Rapport",
    //   icon: "file",
    //   type: "link",
    // },
  ];

  chooseMenuForRole() {
    console.log("this.authService.userData")
    console.log(this.authService.userData)
    let currentRole = this.authService.userData.roles[0]
    console.log(currentRole)
    switch (currentRole) {
      case "ROLE_SUPER_ADMIN" :
        this.items = new BehaviorSubject<Menu[]>(this.SUPER_ADMIN_MENU_ITEMS)
            break;
      case "ROLE_ADMIN" :
        this.items = new BehaviorSubject<Menu[]>(this.ADMIN_MENU_ITEMS)
        break;
      case "ROLE_ETUDIANT" :
        this.items = new BehaviorSubject<Menu[]>(this.ETUDIANT_MENU_ITEMS)
        break;
      case "ROLE_ENSEIGNANT" :
        this.items = new BehaviorSubject<Menu[]>(this.ENSEIGNANT_MENU_ITEMS)
        break;
    }


  }

}
