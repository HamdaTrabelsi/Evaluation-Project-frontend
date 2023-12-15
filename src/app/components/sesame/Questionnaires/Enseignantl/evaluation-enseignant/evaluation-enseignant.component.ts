import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {SoumissionService} from '../../../../../shared/services/soumission.service';
import {AuthService} from '../../../../../shared/auth/auth.service';
import {Location} from '@angular/common';
import {MoyenneFormation} from '../../../../../shared/model/moyenneFormation.model';
import {UtilisateurService} from '../../../../../shared/services/user.service';
import html2canvas from 'html2canvas';
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
import {MoyenneCours} from '../../../../../shared/model/moyenneCours.model';

@Component({
    selector: 'app-evaluation-enseignant',
    templateUrl: './evaluation-enseignant.component.html',
    styleUrls: ['./evaluation-enseignant.component.scss']
})

export class EvaluationEnseignantComponent {

    annee;

    documentLoading = false;

    moyennesCours: MoyenneFormation[] = [];
    evaluationChartsData: any[] = [];

    currentuser;
    enseignantInfo;

    responses: String[] = ['Oui', 'Plutot Oui', 'Plutot Non', 'Non'];
    transformedData: any[] = [];

    documentTemplate = '/assets/docTemplates/enseignant_stats_template.docx';

    nbRows = 0;

    hasStats: boolean = false;

    constructor(
        private router: Router,
        private soumissionService: SoumissionService,
        private authservice: AuthService,
        private location: Location,
        private authService: AuthService,
        private utilisateurService: UtilisateurService
    ) {

        if (this.router.getCurrentNavigation()?.extras?.state?.anneeUniversitaire) {
            this.annee = this.router.getCurrentNavigation().extras.state.anneeUniversitaire;
        } else {
            this.router.navigate(['/sesame/questionnaire/enseignant/liste']);
        }

    }

    ngOnInit() {
        this.currentuser = this.authservice.userData;

        this.getEnseignantInfo();

    }

    checkIfEnseignantHasStats() {
        this.soumissionService.getEnseignantSoumissions(this.enseignantInfo.id, this.annee).subscribe(
            success => {

                this.hasStats = success.length > 0;
                this.getMoyennesEnseignantByAnnee();
                this.getChartStatistics();
            },
            error => {
                console.log(error);
            }
        );
    }

    getEnseignantInfo() {
        this.utilisateurService.getById(this.currentuser.id).subscribe(
            success => {
                this.enseignantInfo = success;
                this.checkIfEnseignantHasStats();

            },
            error => {
                console.log(error);
            }
        );
    }

    getMoyennesEnseignantByAnnee() {

        this.soumissionService.getMoyennesEnseignantByAnnee(this.currentuser.id, this.annee).subscribe(
            success => {
                this.moyennesCours = success;
                console.log(success);
                this.getNumberofRowsForTable();
            },
            error => {
                console.log(error);
            }
        );
    }

    getChartStatistics() {
        this.soumissionService.getStatistiquesEnseignantByIdAndAnnee(this.currentuser.id, this.annee).subscribe(
            success => {
                this.transformData(success);
                this.evaluationChartsData = this.transformedData;
                console.log('stats');
                console.log(this.evaluationChartsData);
            },
            error => {

            }
        );
    }

    public async downloadChart() {
        try {
            this.documentLoading = true;

            let docElements: Array<any> = [];


            let chartsImages = await this.getAllQuestionCharts();

            let docum = await this.prepareDocument(docElements, chartsImages);

            this.downloadBuffer(docum);


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

        } catch (error) {
            console.error('Error downloading document:', error);
        }
    }

    async getAllQuestionCharts(): Promise<Paragraph[]> {
        let chartList: Array<any> = [];
        for (let i = 0; i < this.evaluationChartsData.length; i++) {

            let paragraph: Paragraph = new Paragraph({spacing: {before: 15,}});
            let sectionName = new TextRun({text: this.evaluationChartsData[i].sectionName.toString(), size: 35, bold: true});
            let sectionNameSpacing = new TextRun({
                text: '',
                break: 1
            });

            paragraph.addChildElement(sectionNameSpacing);
            paragraph.addChildElement(sectionName);
            paragraph.addChildElement(sectionNameSpacing);


            //let barChartsParagraph: Array<any> = [];

            for (let j = 0; j < this.evaluationChartsData[i].questions.length; j++) {

                let chartTitle = new TextRun({text: this.evaluationChartsData[i].questions[j]?.title?.text, bold: true, size: 30});

                const chartContainer = document.getElementById('canvaChart' + i + j);
                const canvas = await html2canvas(chartContainer);
                const dataUrl = canvas.toDataURL('image/png');
                const arrayBuffer = this.dataURLToUint8Array(dataUrl);

                paragraph.addChildElement(sectionNameSpacing);
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

    createMoyenneFormationTable() {

        let tableRowsList: TableRow[] = [
            new TableRow({
                height: {value: 600, rule: HeightRule.AUTO},
                children: [
                    new TableCell({
                        verticalAlign: VerticalAlign.CENTER,
                        children: [
                            new Paragraph({children: [new TextRun({text: 'Enseignant', bold: true})]})
                        ]
                    }),
                    new TableCell({
                        verticalAlign: VerticalAlign.CENTER,
                        children: [
                            new Paragraph({children: [new TextRun({text: 'Module', bold: true})]})
                        ]
                    }),
                    new TableCell({
                        verticalAlign: VerticalAlign.CENTER,
                        children: [
                            new Paragraph({children: [new TextRun({text: 'Classe', bold: true})]})
                        ]
                    }),
                    new TableCell({
                        verticalAlign: VerticalAlign.CENTER,
                        children: [
                            new Paragraph({children: [new TextRun({text: 'Note', bold: true})]})
                        ]
                    }),
                ]
            })
        ];
        for (let [jIndex, classe] of this.moyennesCours.entries()) {
            for (let [zIndex, cours] of classe.moyennesCours.entries()) {
                tableRowsList.push(this.createTabelCells(zIndex, jIndex, cours, classe, tableRowsList));
            }
        }


        let table = new Table({
            columnWidths: [3000, 4000, 2000, 1000],
            rows: tableRowsList,
        });
        return table;
    }

    transformData(providedData: any) {
        for (const classeIndex in providedData) {
            if (providedData.hasOwnProperty(classeIndex)) {
                const classeData = providedData[classeIndex];
                for (const sectionIndex in classeData.sections) {
                    if (classeData.sections.hasOwnProperty(sectionIndex)) {

                        const sectionData = classeData.sections[sectionIndex];

                        const sectionEntry = {
                            sectionName: sectionData.sectionName,
                            sectionIndex: sectionData.sectionIndex,
                            classeName: sectionData.classeName,
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
        }
    }

    getNumberofRowsForTable() {
        let nbrows = 0;
        this.moyennesCours.forEach(cours => {
            cours.moyennesCours.forEach(c => {
                nbrows++;
            });
        });

        this.nbRows = nbrows;
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

    downloadBuffer(arrayBuffer) {
        const a = document.createElement('a');
        a.href = URL.createObjectURL(new Blob(
            [arrayBuffer],
            {type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'}
        ));
        a.download = this.enseignantInfo.firstname + ' ' + this.enseignantInfo.lastname + '-statistiques-' + this.annee + '.docx';
        a.click();
        this.documentLoading = false;
    }

    private createTabelCells(zIndex: number, jIndex: number, cours: MoyenneCours, classe: MoyenneFormation, tableRowsList: TableRow[]) {
        let showFirstTableCell = zIndex == 0 && jIndex == 0;
        let tableRow;
        if (showFirstTableCell) {
            tableRow = new TableRow({
                height: {value: 600, rule: HeightRule.AUTO},
                children: [
                    new TableCell({
                        verticalAlign: VerticalAlign.CENTER,
                        children: [
                            new Paragraph(this.enseignantInfo.firstname + ' ' + this.enseignantInfo.lastname)
                        ],
                        rowSpan: this.nbRows
                    }),
                    new TableCell({
                        verticalAlign: VerticalAlign.CENTER,
                        children: [
                            new Paragraph(cours.courseName)
                        ]
                    }),
                    new TableCell({
                        verticalAlign: VerticalAlign.CENTER,
                        children: [
                            new Paragraph(classe.name)
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
        } else {
            tableRow = new TableRow({
                height: {value: 600, rule: HeightRule.AUTO},
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
                            new Paragraph(classe.name)
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
        }

        return tableRow;
    }

    private async prepareDocument(docElements: Array<any>, chartsImages: Paragraph[]) {


        let courseTable = this.createMoyenneFormationTable();
        let barometreText = new Paragraph({
            children: [new TextRun({text: 'Retour d’expérience: formation', bold: true, size: 28})],
            spacing: {before: 500}
        });
        docElements.push(barometreText);
        docElements.push(courseTable);

        chartsImages.forEach(c => {
            docElements.push(c);
        });


        let file;
        file = await (await fetch(this.documentTemplate)).arrayBuffer();


        let docum = await patchDocument(file, {
            patches: {
                enseignant_name: {
                    type: PatchType.PARAGRAPH,
                    children: [new TextRun({
                        text: this.enseignantInfo.firstname + ' ' + this.enseignantInfo.lastname,
                        size: 70,
                        color: '1f497d',
                        bold: true
                    })],
                },
                annee_universitaire: {
                    type: PatchType.PARAGRAPH,
                    children: [new TextRun({text: this.annee, size: 60, bold: true})],
                },
                charts: {
                    type: PatchType.DOCUMENT,
                    children: docElements,
                },
            },
        });
        return docum;
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
