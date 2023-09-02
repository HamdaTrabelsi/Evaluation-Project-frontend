import { Component } from '@angular/core';
import {PRODUCT} from '../../../../shared/data/tables/product-list';
import {Router} from '@angular/router';

@Component({
  selector: 'app-listeutilisateurs',
  templateUrl: './listeutilisateurs.component.html',
  styleUrls: ['./listeutilisateurs.component.scss']
})
export class ListeutilisateursComponent {

  public products = PRODUCT;
  users: Array<any> = [
    {
      imageUrl: 'https://example.com/user1.jpg',
      firstName: 'John',
      lastName: 'Doe',
      role: 'Enseignant',
      createdAt: new Date('2023-09-01T08:00:00Z'),
    },
    {
      imageUrl: 'https://example.com/user2.jpg',
      firstName: 'Alice',
      lastName: 'Smith',
      role: 'Student',
      createdAt: new Date('2023-09-02T10:15:00Z'),
    },
    {
      imageUrl: 'https://example.com/user3.jpg',
      firstName: 'Admin',
      lastName: 'Adminson',
      role: 'Admin',
      createdAt: new Date('2023-09-03T14:30:00Z'),
    },
    // Add more users below...
    {
      imageUrl: 'https://example.com/user4.jpg',
      firstName: 'Sarah',
      lastName: 'Johnson',
      role: 'Student',
      createdAt: new Date('2023-09-04T12:45:00Z'),
    },
    {
      imageUrl: 'https://example.com/user5.jpg',
      firstName: 'David',
      lastName: 'Williams',
      role: 'Enseignant',
      createdAt: new Date('2023-09-05T09:20:00Z'),
    },
    {
      imageUrl: 'https://example.com/user6.jpg',
      firstName: 'Ella',
      lastName: 'Brown',
      role: 'Student',
      createdAt: new Date('2023-09-06T16:10:00Z'),
    },
    {
      imageUrl: 'https://example.com/user7.jpg',
      firstName: 'Michael',
      lastName: 'Davis',
      role: 'Student',
      createdAt: new Date('2023-09-07T11:30:00Z'),
    },
    {
      imageUrl: 'https://example.com/user8.jpg',
      firstName: 'Olivia',
      lastName: 'Miller',
      role: 'Enseignant',
      createdAt: new Date('2023-09-08T13:55:00Z'),
    },
    {
      imageUrl: 'https://example.com/user9.jpg',
      firstName: 'William',
      lastName: 'Wilson',
      role: 'Student',
      createdAt: new Date('2023-09-09T15:40:00Z'),
    },
    {
      imageUrl: 'https://example.com/user10.jpg',
      firstName: 'Sophia',
      lastName: 'Moore',
      role: 'Admin',
      createdAt: new Date('2023-09-10T17:25:00Z'),
    },
    // Add more users here...
  ];

  constructor(private _router: Router) {
  }

  ajouterUtilisateur(){
    this._router.navigate(["/sesame/utilisateurs/ajout"])
  }
}
