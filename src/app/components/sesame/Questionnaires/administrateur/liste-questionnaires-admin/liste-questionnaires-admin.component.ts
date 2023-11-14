import {Component, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ChartOptions} from '../../../../../shared/data/chart/apex';
import {ChartComponent} from 'ng-apexcharts';
import {SoumissionService} from '../../../../../shared/services/soumission.service';
import {DataTransformationService} from '../../../../../shared/services/dataTransformationService.service';
import {WordDocumentService} from '../../../../../shared/services/wordDocumentService.service';
import {saveAs} from 'file-saver';
import {Document, ImageRun, Packer, Paragraph, TextRun} from 'docx';
import html2canvas from 'html2canvas';

@Component({
    selector: 'app-liste-questionnaires-admin',
    templateUrl: './liste-questionnaires-admin.component.html',
    styleUrls: ['./liste-questionnaires-admin.component.scss']
})
// @ts-ignore
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
            labelTextAlign: 'right',

        },
        axisX: {
            reversed: true,
            labelTextAlign: 'right',

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

    // Pie Chart 3
    pieChart3: any = {
        chartType: 'PieChart',
        dataTable: [
            ['Etudiants', 'Participation'],
            ['Répondu', 23],
            ['En Attente', 7],
        ],
        options: {
            title: 'My Daily Activities',
            pieHole: 0.4,
            width: '800',
            height: 400,
            colors: ['#36A2EB', '#FF6384'],
            backgroundColor: 'transparent'
        },
    };

    canvaPieChartOptions = {
        width: 500,
        animationEnabled: true,
        title: {
            text: 'Taux de participation par classe',
            fontSize: 20,
            margin: 15
        },
        data: [{
            type: 'pie',
            startAngle: 240,
            yValueFormatString: '##0.00"%"',
            indexLabel: '{label} {y}',
            dataPoints: [
                {y: 25, label: 'Repondu'},
                {y: 5, label: 'Ignoré'},
            ]
        }]
    };

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

    evaluationStats: any;

    evaluationId: String;

    loading: boolean = true;

    evaluationChartsData;

    transformedData: any[] = [];

    responses: String[] = ['Non', 'Plutot Non', 'Plutot Oui', 'Oui'];

    constructor(
        private router: Router,
        private soumissionService: SoumissionService,
        private activatedRoute: ActivatedRoute,
        private dataTransformationService: DataTransformationService,
        private wordDocumentService: WordDocumentService
    ) {
    }

    ngOnInit(): void {
        this.evaluationId = this.activatedRoute.snapshot.paramMap.get('id');

        this.getStatistics();
    }

    getStatistics() {
        this.soumissionService.getStatByEvaluation(this.evaluationId).subscribe(
            success => {
                this.evaluationStats = success;
                console.log(success);
                // console.log(this.canvaChartOptions)
                // this.evaluationChartsData = this.convertDataForCharts(this.evaluationStats)
                // console.log(this.evaluationChartsData)

                this.transformData(success);
                this.evaluationChartsData = this.transformedData;

                // Log the transformed data to the console for demonstration
                console.log('Transformed Data:', this.evaluationChartsData);
            },
            error => {
                console.log(error);
            }
        );
    }

    openForm() {
        this.router.navigate(['/sesame/questionnaire/etudiant/remplir/1']);
    }


    generateDocxFile() {
        // Get the HTML template from the Angular component
        const htmlTemplate = this.getHtmlTemplate();

        // Generate the docx file
        this.wordDocumentService.generateDocument(this.transformedData);
    }

    // Get the HTML template from the Angular component
    getHtmlTemplate(): string {
        return `
      <h1>This is the title of the document</h1>
      <p>This is the body of the document</p>
      <img src="https://example.com/image.png" alt="Image">
    `;
    }

    transformData(providedData: any) {
        for (const sectionName in providedData) {
            if (providedData.hasOwnProperty(sectionName)) {
                const sectionData = providedData[sectionName];
                const sectionEntry = {
                    sectionName: sectionData.sectionName,
                    questions: []
                };

                for (const questionName in sectionData.questions) {
                    if (sectionData.questions.hasOwnProperty(questionName)) {
                        const questionData = sectionData.questions[questionName];
                        const questionEntry = {
                            animationEnabled: true,
                            theme: 'light2',
                            title: {text: questionData.questionText, fontSize: 20, margin: 15},
                            axisY: {interval: 10, suffix: '%', labelTextAlign: 'right'},
                            axisX: {reversed: true, labelTextAlign: 'right'},
                            toolTip: {shared: true},
                            data: []
                        };

                        for (const critereName in questionData.criteres) {
                            if (questionData.criteres.hasOwnProperty(critereName)) {
                                const critereData = questionData.criteres[critereName];
                                // for (const response in critereData.responses) {
                                //     if (critereData.responses.hasOwnProperty(response)) {
                                //         const count = critereData.responses[response];
                                //         const dataPoint = {
                                //             type: 'stackedBar100',
                                //             toolTipContent: `{label}<br><b>{name}:</b> {y} (#percent%)`,
                                //             showInLegend: true,
                                //             name: response,
                                //             dataPoints: [{ y: count, label: critereName }]
                                //         };
                                //         questionEntry.data.push(dataPoint);
                                //     }
                                // }
                            }
                        }

                        this.responses.forEach(r => {
                                let datapoints = this.getResponseCountByCritere(questionData, r);
                                const dataPoint = {
                                    type: 'stackedBar100',
                                    toolTipContent: `{label}<br><b>{name}:</b> {y} (#percent%)`,
                                    showInLegend: true,
                                    name: r,
                                    dataPoints:
                                    datapoints
                                };
                                questionEntry.data.push(dataPoint);
                            }
                        );


                        sectionEntry.questions.push(questionEntry);
                    }
                }

                this.transformedData.push(sectionEntry);
            }
        }
    }

    // @ts-ignore
    public async downloadDoxc() {

        const imageUrl = 'https://raw.githubusercontent.com/dolanmiu/docx/master/demo/images/cat.jpg';
        const response = await fetch(imageUrl);
        const arrayBuffer = await response.arrayBuffer();
        const uint8Array = new Uint8Array(arrayBuffer);


        let doc = new Document({
            sections: [
                {
                    properties: {},
                    children: [
                        new Paragraph({
                            children: [
                                new TextRun('Hello World'),
                                new TextRun({
                                    text: 'Foo Bar',
                                    bold: true,
                                }),
                                new TextRun({
                                    text: '\tGithub is the best',
                                    bold: true,
                                }),
                            ],
                        }),
                        new Paragraph({
                            children: [
                                new ImageRun({
                                    data: uint8Array,
                                    transformation: {
                                        width: 1690,
                                        height: 400,
                                    },
                                }),]
                        })
                    ],

                },


            ],
        });


        Packer.toBlob(doc).then((blob) => {
            console.log(blob);
            saveAs(blob, 'example.docx');
            console.log('Document created successfully');
        });
    }

    getResponseCountByCritere(questionData, r) {
        let datapoints = [];

        for (const critereName in questionData.criteres) {
            // @ts-ignore
            let count = questionData.criteres[critereName].responses[r] == undefined ? 0 : questionData.criteres[critereName].responses[r];
            datapoints.push({y: count, label: critereName});
        }

        return datapoints;
    }

    public async downloadChart() {
        try {
            const chartContainer = document.getElementById('chartContainer');

            if (chartContainer) {
                const canvas = await html2canvas(chartContainer);
                const dataUrl = canvas.toDataURL('image/png');
                const arrayBuffer = this.dataURLToUint8Array(dataUrl);

                let barCharts: Array<Paragraph> = [];

                barCharts.push(new Paragraph({
                        children: [
                            new TextRun('Hello World'),
                            new TextRun({
                                text: 'Foo Bar',
                                bold: true,
                            }),
                            new TextRun({
                                text: '\tGithub is the best',
                                bold: true,
                            }),
                        ],
                    }),
                    new Paragraph({
                        children: [
                            new ImageRun({
                                data: arrayBuffer,
                                transformation: {
                                    width: 500,
                                    height: 350,
                                },
                            }),
                        ],
                    }))
                let chartsImages = await this.getAllQeuestionCharts();

                chartsImages.forEach(c => {
                    barCharts.push(c)
                })

                console.log(chartsImages)

                let doc = new Document({
                    sections: [
                        {
                            properties: {},
                            children: barCharts
                        },
                    ],
                });


                const docBlob = await Packer.toBlob(doc);
                saveAs(docBlob, 'example.docx');
                console.log('Document created successfully');
            } else {
                console.error('Element with ID "chartContainer" not found.');
            }
        } catch (error) {
            console.error('Error downloading document:', error);
        }
    }

    async getAllQeuestionCharts(): Promise<Paragraph[]> {
        let chartList: Array<any> = [];
        for (let i=0;i<this.evaluationChartsData.length;i++) {

            let paragraph: Paragraph = new Paragraph({});
            let sectionName: TextRun = new TextRun(this.evaluationChartsData[i].sectionName);
            paragraph.addChildElement(sectionName);

            //let barChartsParagraph: Array<any> = [];

            for (let j=0;j<this.evaluationChartsData[i].questions.length;j++) {
                let chartParagraph: Paragraph= new Paragraph({});

                let chartTitle = new TextRun(this.evaluationChartsData[i].questions[j]?.title?.text);

                const chartContainer = document.getElementById('canvaChart'+i+j);
                const canvas = await html2canvas(chartContainer);
                const dataUrl = canvas.toDataURL('image/png');
                const arrayBuffer = this.dataURLToUint8Array(dataUrl);

                paragraph.addChildElement(chartTitle);
                paragraph.addChildElement(new ImageRun({
                    data: arrayBuffer,
                    transformation: {
                        width: 500,
                        height: 350,
                    },
                }));

                //barChartsParagraph.addChildElement(chartParagraph);
            }

           // paragraph.addChildElement(barChartsParagraph)
            chartList.push(paragraph)
        }
        return chartList;
    }

    private dataURLToUint8Array(dataUrl: string): Uint8Array {
        const binary = atob(dataUrl.split(',')[1]);
        const array = new Uint8Array(binary.length);

        for (let i = 0; i < binary.length; i++) {
            array[i] = binary.charCodeAt(i);
        }

        return array;
    }

}
