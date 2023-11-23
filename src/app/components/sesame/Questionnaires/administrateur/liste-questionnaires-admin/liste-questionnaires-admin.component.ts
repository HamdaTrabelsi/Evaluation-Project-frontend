import {Component, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ChartOptions} from '../../../../../shared/data/chart/apex';
import {ChartComponent} from 'ng-apexcharts';
import {SoumissionService} from '../../../../../shared/services/soumission.service';
import {DataTransformationService} from '../../../../../shared/services/dataTransformationService.service';
import {WordDocumentService} from '../../../../../shared/services/wordDocumentService.service';
import {DatePipe} from '@angular/common';

import {
    Document,
    HeightRule,
    ImageRun,
    Packer,
    Paragraph,
    patchDocument,
    PatchType,
    Table,
    TableCell,
    TableRow,
    TextRun,
    VerticalAlign
} from 'docx';
import html2canvas from 'html2canvas';
import {EtudiantDTO} from '../../../../../shared/model/etudiantDTO.model';
import {MoyenneEval} from '../../../../../shared/model/moyenneEval.model';
import {Evaluation} from '../../../../../shared/model/evaluation.model';
import {EvaluationService} from '../../../../../shared/services/evaluation.service';


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

    documentLoading = false

    // Pie Chart 3
    pieChart3: any = {
        chartType: 'PieChart',
        dataTable: [],
        options: {
            title: 'My Daily Activities',
            pieHole: 0.4,
            width: '800',
            height: 400,
            colors: ['#36A2EB', '#FF6384'],
            backgroundColor: 'transparent'
        },
    };

    etudiants: EtudiantDTO[] = [];

    evaluationStats: any;

    evaluationId: String;

    loading: boolean = true;

    evaluationChartsData;

    transformedData: any[] = [];

    responses: String[] = ['Non', 'Plutot Non', 'Plutot Oui', 'Oui'];

    moyenneEval: MoyenneEval;

    currentEvaluation: Evaluation;

    documentTemplate = '/assets/docTemplates/evaluation_classe_template.docx'

    etudiantsRepondus
    etudiantsEnAttente
    nombreEtudiants

    constructor(
        private router: Router,
        private soumissionService: SoumissionService,
        private activatedRoute: ActivatedRoute,
        private dataTransformationService: DataTransformationService,
        private wordDocumentService: WordDocumentService,
        private evaluationService: EvaluationService,
        private datePipe: DatePipe
    ) {
    }

    ngOnInit(): void {
        this.evaluationId = this.activatedRoute.snapshot.paramMap.get('id');

        this.getCurrentEvaluation();
        this.getStatistics();
        this.getStudents();
        this.getPieChartStats();
        this.getMoyennesEvaluation();
    }

    getPieChartStats() {
        this.soumissionService.getNumberOfSoumissionForClasse(this.evaluationId).subscribe(
            success => {
                this.etudiantsRepondus = success?.reponses
                this.etudiantsEnAttente = success?.nonRepondus
                this.nombreEtudiants = success?.nonRepondus+ success?.reponses
                let datapoints =
                    [
                        ['Etudiants', 'Participation'],
                        ['Répondu', success.reponses],
                        ['En Attente', success?.nonRepondus],
                    ];

                this.pieChart3.dataTable = datapoints;
            },
            error => {
                console.log(error);
            }
        );
    }

    getStatistics() {
        this.soumissionService.getStatByEvaluation(this.evaluationId).subscribe(
            success => {
                this.evaluationStats = success;
                this.transformData(success);
                this.evaluationChartsData = this.transformedData.sort((a, b) => a.sectionIndex.localeCompare(b.sectionIndex));

                // Log the transformed data to the console for demonstration
                console.log('Transformed Data:', this.evaluationChartsData);
            },
            error => {
                console.log(error);
            }
        );
    }

    getMoyennesEvaluation() {
        this.soumissionService.getMoyennesEvaluation(this.evaluationId).subscribe(
            success => {
                this.moyenneEval = success;
                console.log('moyenne eval');
                console.log(this.moyenneEval);
            },
            error => {
                console.log(error);
            }
        );
    }

    getCurrentEvaluation() {
        this.evaluationService.findEvaluatiob(this.evaluationId).subscribe(
            success => {
                this.currentEvaluation = success;
                console.log('current Evaluation');
                console.log(this.currentEvaluation);
            },
            error => {
                console.log(error);
            }
        );
    }

    openForm() {
        this.router.navigate(['/sesame/questionnaire/etudiant/remplir/1']);
    }


    transformData(providedData: any) {
        for (const sectionIndex in providedData) {
            if (providedData.hasOwnProperty(sectionIndex)) {
                const sectionData = providedData[sectionIndex];

                const sectionEntry = {
                    sectionName: sectionData.sectionName,
                    sectionIndex: sectionData.sectionIndex,
                    enseignantName: sectionData.enseignantName,
                    questions: []
                };

                for (const questionIndex in sectionData.questions) {
                    if (sectionData.questions.hasOwnProperty(questionIndex)) {
                        const questionData = sectionData.questions[questionIndex];
                        const questionEntry = {
                            animationEnabled: true,
                            theme: 'light2',
                            title: {text: questionData.questionText, fontSize: 20, margin: 15},
                            axisY: {interval: 10, suffix: '%', labelTextAlign: 'right'},
                            axisX: {reversed: true, labelTextAlign: 'right'},
                            toolTip: {shared: true},
                            data: []
                        };

                        for (const critereIndex in questionData.criteres) {
                            if (questionData.criteres.hasOwnProperty(critereIndex)) {
                                const critereData = questionData.criteres[critereIndex];
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

                                const sortedData = datapoints.sort((a, b) => a.label.localeCompare(b.label));

                                const dataPoint = {
                                    type: 'stackedBar100',
                                    toolTipContent: `{label}<br><b>{name}:</b> {y} (#percent%)`,
                                    showInLegend: true,
                                    name: r,
                                    dataPoints:
                                    sortedData
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

    getResponseCountByCritere(questionData, r) {
        let datapoints = [];

        for (const critereName in questionData.criteres) {
            // @ts-ignore
            let count = questionData.criteres[critereName].responses[r] == undefined ? 0 : questionData.criteres[critereName].responses[r];
            datapoints.push({y: count, label: critereName});
        }

        const sortedData = datapoints.sort((a, b) => a.label.localeCompare(b.label));

        return sortedData;
    }

    public async downloadChart() {
        try {
            this.documentLoading = true
            const chartContainer = document.getElementById('chartContainer');

            if (chartContainer) {
                const canvas = await html2canvas(chartContainer);
                const dataUrl = canvas.toDataURL('image/png');
                const arrayBuffer = this.dataURLToUint8Array(dataUrl);

                let docElements: Array<any> = [];

                //Pie Chart
                // docElements.push(
                //     new Paragraph({
                //         children: [
                //             new ImageRun({
                //                 data: arrayBuffer,
                //                 transformation: {
                //                     width: 500,
                //                     height: 350,
                //                 },
                //             }),
                //         ],
                //     }));


                let chartsImages = await this.getAllQuestionCharts();

                let docum = await this.prepareDocument(docElements, chartsImages);

                this.downloadBuffer(docum)


                let doc = new Document({
                    sections: [
                        {
                            properties: {},
                            children: docElements
                        },
                    ],
                });


                const docBlob = await Packer.toBlob(doc);
                //saveAs(docBlob, 'example.docx');
                console.log('Document created successfully');
            } else {
                console.error('Element with ID "chartContainer" not found.');
            }
        } catch (error) {
            console.error('Error downloading document:', error);
        }
    }


    private async prepareDocument(docElements: Array<any>, chartsImages: Paragraph[]) {

        if (this.moyenneEval.moyenneBarometre != null && this.moyenneEval.moyenneBarometre.nom != null) {
            let barometreTable = this.createMoyenneBarometreTable();
            let barometreText = new Paragraph({ children : [new TextRun({text: 'Baromètre de satisfaction', bold:true,size:28})]});
            docElements.push(barometreText);
            docElements.push(new Paragraph({text: ''}));
            docElements.push(barometreTable);
        }

        let courseTable = this.createMoyenneFormationTable();
        let barometreText = new Paragraph({children : [new TextRun({text: 'Retour d’expérience: formation', bold:true,size:28})], spacing: {before:500}});
        docElements.push(barometreText);
        docElements.push(courseTable);

        chartsImages.forEach(c => {
            docElements.push(c);
        });


        let file;
        file = await (await fetch(this.documentTemplate)).arrayBuffer();


        let docum = await patchDocument(file, {
            patches: {
                classe: {
                    type: PatchType.PARAGRAPH,
                    children: [new TextRun({text: this.currentEvaluation?.classe?.nom, size: 70,color:"1f497d",bold:true})],
                },
                classe_text: {
                    type: PatchType.PARAGRAPH,
                    children: [new TextRun({text: this.currentEvaluation?.classe?.nom})],
                },
                classe_bold: {
                    type: PatchType.PARAGRAPH,
                    children: [new TextRun({text: this.currentEvaluation?.classe?.nom, size:32, bold : true})],
                },
                semestre: {
                    type: PatchType.PARAGRAPH,
                    children: [new TextRun({text: this.currentEvaluation?.semestre, size: 38, color:'4f81bd', bold:true})],
                },
                semestre_text: {
                    type: PatchType.PARAGRAPH,
                    children: [new TextRun({text: this.currentEvaluation?.semestre})],
                },
                annee_universitaire: {
                    type: PatchType.PARAGRAPH,
                    children: [new TextRun({text: this.currentEvaluation?.anneeUniversitaire, size: 60, bold:true})],
                },
                annee_universitaire_text: {
                    type: PatchType.PARAGRAPH,
                    children: [new TextRun({text: this.currentEvaluation?.anneeUniversitaire})],
                },
                date_creation: {
                    type: PatchType.PARAGRAPH,
                    children: [new TextRun({text: this.datePipe.transform(this.currentEvaluation?.creationDate,'dd/MM/yyyy')})],
                },
                date_cloture: {
                    type: PatchType.PARAGRAPH,
                    children: [new TextRun({text: this.datePipe.transform(this.currentEvaluation?.limitDate,'dd/MM/yyyy')})],
                },
                nombre_etudiants: {
                    type: PatchType.PARAGRAPH,
                    children: [new TextRun({text: this.nombreEtudiants.toString()})],
                },
                nombre_participation: {
                    type: PatchType.PARAGRAPH,
                    children: [new TextRun({text: this.etudiantsRepondus.toString()})],
                },
                taux_participation: {
                    type: PatchType.PARAGRAPH,
                    children: [new TextRun({text: (this.etudiantsRepondus*100)/this.nombreEtudiants + "%"})],
                },
                charts: {
                    type: PatchType.DOCUMENT,
                    children: docElements,
                },
            },
        });
        return docum;
    }

    async getAllQuestionCharts(): Promise<Paragraph[]> {
        let chartList: Array<any> = [];
        console.log("this.evaluationChartsData")
        console.log(this.evaluationChartsData)
        for (let i = 0; i < this.evaluationChartsData.length; i++) {

            let paragraph: Paragraph = new Paragraph({spacing: {before:15,}});
            let sectionName = new TextRun({text: this.evaluationChartsData[i].sectionName.toString(), size:35, bold: true});
            let sectionNameSpacing =  new TextRun({
                text: '',
                break: 1
            });

            paragraph.addChildElement(sectionName);
            paragraph.addChildElement(sectionNameSpacing);

            if (this.evaluationChartsData[i].enseignantName != null && this.evaluationChartsData[i].enseignantName != "undefined undefined") {
                let enseignantName: TextRun = new TextRun({text: 'Professeur : ' + this.evaluationChartsData[i].enseignantName, size:30, bold: true});
                let enseignantNameSpacing =  new TextRun({
                    text: '',
                    break: 1
                });
                paragraph.addChildElement(enseignantName);
                paragraph.addChildElement(enseignantNameSpacing);

            }
            //let barChartsParagraph: Array<any> = [];

            for (let j = 0; j < this.evaluationChartsData[i].questions.length; j++) {

                let chartTitle = new TextRun({text: this.evaluationChartsData[i].questions[j]?.title?.text, bold:true, size:30});

                const chartContainer = document.getElementById('canvaChart' + i + j);
                const canvas = await html2canvas(chartContainer);
                const dataUrl = canvas.toDataURL('image/png');
                const arrayBuffer = this.dataURLToUint8Array(dataUrl);

                paragraph.addChildElement(chartTitle);
                paragraph.addChildElement(new ImageRun({
                    data: arrayBuffer,
                    transformation: {
                        width: 650,
                        height: 250,
                    },
                }));

                //barChartsParagraph.addChildElement(chartParagraph);
            }

            // paragraph.addChildElement(barChartsParagraph)
            chartList.push(paragraph);
        }
        return chartList;
    }

    createMoyenneBarometreTable() {

        let tableRowsList: TableRow[] = [
            new TableRow({
                height:{ value: 600, rule: HeightRule.AUTO },
                children: [
                    new TableCell({
                        verticalAlign: VerticalAlign.CENTER,
                        children: [
                            new Paragraph({children: [new TextRun({text: 'Question', bold: true})]})
                        ]
                    }),
                    new TableCell({
                        verticalAlign: VerticalAlign.CENTER,
                        children: [
                            new Paragraph({children: [new TextRun({text: 'Score', bold: true})]})
                        ]
                    }),
                ]
            })
        ];
        if (this.moyenneEval?.moyenneBarometre != null) {
            for (let key in this.moyenneEval.moyenneBarometre.scores) {
                let tableRow = new TableRow({
                    height:{ value: 600, rule: HeightRule.AUTO },
                    children: [
                        new TableCell({
                            verticalAlign: VerticalAlign.CENTER,
                            children: [
                                new Paragraph(key)
                            ]
                        }),
                        new TableCell({
                            verticalAlign: VerticalAlign.CENTER,
                            children: [
                                new Paragraph(this.moyenneEval.moyenneBarometre.scores[key].toString())
                            ]
                        })
                    ]
                });
                tableRowsList.push(tableRow);
            }
        }

        let tableFooter: TableRow = new TableRow({
            height:{ value: 600, rule: HeightRule.AUTO },
            children: [
                new TableCell({
                    verticalAlign: VerticalAlign.CENTER,
                    children: [
                        new Paragraph({
                            children: [new TextRun({text:"Moyenne des scores", bold: true})],

                        })
                    ]
                }),
                new TableCell({
                    verticalAlign: VerticalAlign.CENTER,
                    children: [
                        new Paragraph({children:[new TextRun({text:this.moyenneEval?.moyenneBarometre?.moyenne.toString(),bold:true})]})
                    ]
                })
            ]
        });

        tableRowsList.push(tableFooter);

        let table = new Table({
            columnWidths: [7200, 1800],
            rows: tableRowsList,
        });
        return table;
    }

    createMoyenneFormationTable() {

        let tableRowsList: TableRow[] = [
            new TableRow({
                height:{ value: 600, rule: HeightRule.AUTO },
                children: [
                    new TableCell({
                        verticalAlign: VerticalAlign.CENTER,
                        children: [
                            new Paragraph({children: [new TextRun({text: 'Cours', bold: true})]})
                        ]
                    }),
                    new TableCell({
                        verticalAlign: VerticalAlign.CENTER,
                        children: [
                            new Paragraph({children: [new TextRun({text: 'Enseignant', bold: true})]})
                        ]
                    }),
                    new TableCell({
                        verticalAlign: VerticalAlign.CENTER,
                        children: [
                            new Paragraph({children: [new TextRun({text: 'Score', bold: true})]})
                        ]
                    }),
                ]
            })
        ];
        if (this.moyenneEval?.moyenneFormation != null) {
            for (let cours of this.moyenneEval.moyenneFormation.moyennesCours) {
                let tableRow = new TableRow({
                    height:{ value: 600, rule: HeightRule.AUTO },
                    children: [
                        new TableCell({
                            verticalAlign: VerticalAlign.CENTER,
                            children: [
                                new Paragraph(cours.courseName)
                            ]
                        }),
                        new TableCell({
                            verticalAlign: VerticalAlign.CENTER,
                            children: [
                                new Paragraph(cours.enseignant)
                            ]
                        }),
                        new TableCell({
                            verticalAlign: VerticalAlign.CENTER,
                            children: [
                                new Paragraph(cours.score.toString())
                            ]
                        })
                    ]
                });
                tableRowsList.push(tableRow);
            }
        }

        let tableFooter: TableRow = new TableRow({
            height:{ value: 600, rule: HeightRule.AUTO },
            children: [
                new TableCell({
                    children: [
                        new Paragraph({
                            children: [new TextRun({text:"Indice retour d’expérience formation", bold: true})],
                        })
                    ],
                    columnSpan: 2
                }),
                new TableCell({
                    children: [
                        new Paragraph({
                            children: [new TextRun({text:this.moyenneEval?.moyenneFormation?.indiceRetour.toString(), bold: true})],
                        })
                    ]
                })
            ]
        });

        tableRowsList.push(tableFooter);

        let table = new Table({
            columnWidths: [4000, 3000, 2000],
            rows: tableRowsList,
        });
        return table;
    }

    getStudents() {
        this.soumissionService.getStudentByEvaluation(this.evaluationId).subscribe(
            success => {
                this.etudiants = success;
            },
            error => {
                console.log(error);
            }
        );
    }

    voirReponses(id) {
        this.router.navigate(['/sesame/questionnaire/administrateur/evaluation/' + this.evaluationId + '/formulaire/details/' + id]);
    }

    private dataURLToUint8Array(dataUrl: string): Uint8Array {
        const binary = atob(dataUrl.split(',')[1]);
        const array = new Uint8Array(binary.length);

        for (let i = 0; i < binary.length; i++) {
            array[i] = binary.charCodeAt(i);
        }

        return array;
    }

    downloadBuffer(arrayBuffer) {
        const a = document.createElement('a')
        a.href = URL.createObjectURL(new Blob(
            [ arrayBuffer ],
            { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' }
        ))
        a.download = 'my-file.docx'
        a.click()
        this.documentLoading = false
    }
}
