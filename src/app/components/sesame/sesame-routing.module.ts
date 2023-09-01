import {ListeDepartementsComponent} from './Departements/liste-departements/liste-departements.component';
import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';

const routes: Routes = [
    {
        path: 'departement',
        children: [
            {
                path: 'list',
                component: ListeDepartementsComponent
            },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SesameRoutingModule { }
