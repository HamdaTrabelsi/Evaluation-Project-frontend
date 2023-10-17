import {Component, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {ChartOptions} from '../../../../../shared/data/chart/apex';
import {ChartComponent} from 'ng-apexcharts';

@Component({
    selector: 'app-liste-questionnaires-admin',
    templateUrl: './liste-questionnaires-admin.component.html',
    styleUrls: ['./liste-questionnaires-admin.component.scss']
})
export class ListeQuestionnairesAdminComponent {

    @ViewChild('chart') chart: ChartComponent;
    public pieChartOptions: Partial<ChartOptions>;


    canvaChartOptions = {
        animationEnabled: true,
        theme: 'light2', //"light1", "dark1", "dark2"
        title: {
            text: 'Statistiques et Probabilités',
            fontSize: 20,
            margin: 15
        },
        axisY: {
            interval: 10,
            suffix: '%',
            labelTextAlign: "right",

        },
        axisX : {
            reversed: true,
            labelTextAlign: "right",

        },
        toolTip: {
            shared: true
        },
        data: [
            {
                type: 'stackedBar100',
                toolTipContent: '{label}<br><b>{name}:</b> {y} (#percent%)',
                showInLegend: true,
                name: 'Oui',
                dataPoints: [
                    {y: 600, label: '1- Les objectifs du cours ont été présentés de façon claire\t\n'},
                    {y: 400, label: '2- Les modalités d’évaluation ont été clairement présentées (type d’épreuve, durée, notation …)\t\n'},
                    {y: 120, label: '3- Les travaux demandés (Applications, TD, TP, exposés, projets…) sont suffisants.\t\n'},
                    {y: 250, label: '4- Les notions importantes sont bien assimilées\t\n'},
                    {y: 120, label: '5- Les outils et les supports utilisés sur MOODLE sont suffisants pour la compréhension du cours\t\n'},
                    {y: 374, label: '6- L’ambiance dans la classe est agréable et favorise la participation\t\n'},
                ]
            },
            {
                type: 'stackedBar100',
                toolTipContent: '{label}<br><b>{name}:</b> {y} (#percent%)',
                showInLegend: true,
                name: 'Plûtot Oui',
                dataPoints: [
                    {y: 600, label: '1- Les objectifs du cours ont été présentés de façon claire\t\n'},
                    {y: 400, label: '2- Les modalités d’évaluation ont été clairement présentées (type d’épreuve, durée, notation …)\t\n'},
                    {y: 120, label: '3- Les travaux demandés (Applications, TD, TP, exposés, projets…) sont suffisants.\t\n'},
                    {y: 250, label: '4- Les notions importantes sont bien assimilées\t\n'},
                    {y: 120, label: '5- Les outils et les supports utilisés sur MOODLE sont suffisants pour la compréhension du cours\t\n'},
                    {y: 374, label: '6- L’ambiance dans la classe est agréable et favorise la participation\t\n'},
                ]
            },
            {
                type: 'stackedBar100',
                toolTipContent: '{label}<br><b>{name}:</b> {y} (#percent%)',
                showInLegend: true,
                name: 'plûtot Non',
                dataPoints: [
                    {y: 600, label: '1- Les objectifs du cours ont été présentés de façon claire\t\n'},
                    {y: 400, label: '2- Les modalités d’évaluation ont été clairement présentées (type d’épreuve, durée, notation …)\t\n'},
                    {y: 120, label: '3- Les travaux demandés (Applications, TD, TP, exposés, projets…) sont suffisants.\t\n'},
                    {y: 250, label: '4- Les notions importantes sont bien assimilées\t\n'},
                    {y: 120, label: '5- Les outils et les supports utilisés sur MOODLE sont suffisants pour la compréhension du cours\t\n'},
                    {y: 374, label: '6- L’ambiance dans la classe est agréable et favorise la participation\t\n'},
                ]
            },
            {
                type: 'stackedBar100',
                toolTipContent: '{label}<br><b>{name}:</b> {y} (#percent%)',
                showInLegend: true,
                name: 'non',
                dataPoints: [
                    {y: 600, label: '1- Les objectifs du cours ont été présentés de façon claire\t\n'},
                    {y: 400, label: '2- Les modalités d’évaluation ont été clairement présentées (type d’épreuve, durée, notation …)\t\n'},
                    {y: 120, label: '3- Les travaux demandés (Applications, TD, TP, exposés, projets…) sont suffisants.\t\n'},
                    {y: 250, label: '4- Les notions importantes sont bien assimilées\t\n'},
                    {y: 120, label: '5- Les outils et les supports utilisés sur MOODLE sont suffisants pour la compréhension du cours\t\n'},
                    {y: 374, label: '6- L’ambiance dans la classe est agréable et favorise la participation\t\n'},
                ]
            },
        ]
    };

    canvaPieChartOptions = {
        animationEnabled: true,
        title: {
            text: 'Taux de participation par classe',
            fontSize: 20,
            margin: 15
        },
        data: [{
            type: "pie",
            startAngle: 240,
            yValueFormatString: "##0.00\"%\"",
            indexLabel: "{label} {y}",
            dataPoints: [
                {y: 25, label: "Repondu"},
                {y: 5, label: "Ignoré"},
            ]
        }]
    }

    etudiants = [
        {
            studentEmail: 'ahmed@sesame.com',
            submissionDate: new Date(), // You can set this to a recent date.
            classe: 'ING4C',
        },
        {
            studentEmail: 'fatima@sesame.com',
            submissionDate: new Date(), // You can set this to a recent date.
            classe: 'ING4C',
        },
        {
            studentEmail: 'mohammed@sesame.com',
            submissionDate: new Date(), // You can set this to a recent date.
            classe: 'ING4C',
        },
        {
            studentEmail: 'layla@sesame.com',
            submissionDate: new Date(), // You can set this to a recent date.
            classe: 'ING4C',
        },
        {
            studentEmail: 'youssef@sesame.com',
            submissionDate: new Date(), // You can set this to a recent date.
            classe: 'ING4C',
        },
        {
            studentEmail: 'nadia@sesame.com',
            submissionDate: new Date(), // You can set this to a recent date.
            classe: 'ING4C',
        },
        {
            studentEmail: 'karim@sesame.com',
            submissionDate: new Date(), // You can set this to a recent date.
            classe: 'ING4C',
        },
        {
            studentEmail: 'ranya@sesame.com',
            submissionDate: new Date(), // You can set this to a recent date.
            classe: 'ING4C',
        },
        {
            studentEmail: 'amir@sesame.com',
            submissionDate: new Date(), // You can set this to a recent date.
            classe: 'ING4C',
        },
        {
            studentEmail: 'leila@sesame.com',
            submissionDate: new Date(), // You can set this to a recent date.
            classe: 'ING4C',
        },
        {
            studentEmail: 'sara@sesame.com',
            submissionDate: new Date(), // You can set this to a recent date.
            classe: 'ING4C',
        },
        {
            studentEmail: 'khalid@sesame.com',
            submissionDate: new Date(), // You can set this to a recent date.
            classe: 'ING4C',
        },
    ];

    constructor(
        private router: Router
    ) {}

    openForm() {
        this.router.navigate(['/sesame/questionnaire/etudiant/remplir/1']);
    }


}
