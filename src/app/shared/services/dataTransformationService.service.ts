import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class DataTransformationService {

    transformData(inputData: any): any[] {
        const outputData: any[] = [];

        for (const sectionKey in inputData) {
            if (inputData.hasOwnProperty(sectionKey)) {
                const sectionValue = inputData[sectionKey];
                const sectionEntry = {
                    sectionName: sectionValue.sectionName,
                    questions: []
                };

                for (const questionKey in sectionValue.questions) {
                    if (sectionValue.questions.hasOwnProperty(questionKey)) {
                        const questionValue = sectionValue.questions[questionKey];
                        const questionEntry = this.createQuestionEntry(questionValue);
                        sectionEntry.questions.push(questionEntry);
                    }
                }

                outputData.push(sectionEntry);
            }
        }

        return outputData;
    }

    private createQuestionEntry(questionValue: any): any {
        const questionEntry = {
            animationEnabled: true,
            theme: 'light2',
            title: {
                text: questionValue.questionText,
                fontSize: 20,
                margin: 15
            },
            axisY: {
                interval: 10,
                suffix: '%',
                labelTextAlign: 'right'
            },
            axisX: {
                reversed: true,
                labelTextAlign: 'right'
            },
            toolTip: {
                shared: true
            },
            data: []
        };

        for (const critereKey in questionValue.criteres) {
            if (questionValue.criteres.hasOwnProperty(critereKey)) {
                const critereValue = questionValue.criteres[critereKey];
                const dataEntry = this.createDataEntry(critereKey, critereValue);
                questionEntry.data.push(dataEntry);
            }
        }

        return questionEntry;
    }

    private createDataEntry(critereKey: string, critereValue: any): any {
        const dataEntry = {
            type: 'stackedBar100',
            toolTipContent: '{label}<br><b>{name}:</b> {y} (#percent%)',
            showInLegend: true,
            name: critereKey,
            dataPoints: []
        };

        for (const responseKey in critereValue.responses) {
            if (critereValue.responses.hasOwnProperty(responseKey)) {
                const responseValue = critereValue.responses[responseKey];
                const dataPointEntry = {
                    y: responseValue,
                    label: responseKey
                };

                dataEntry.dataPoints.push(dataPointEntry);
            }
        }

        return dataEntry;
    }


}
