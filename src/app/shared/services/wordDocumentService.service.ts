// word-document.service.ts

import { Injectable } from '@angular/core';
import * as JSZip from 'jszip';
import * as fs from 'file-saver';

@Injectable({
    providedIn: 'root'
})
export class WordDocumentService {

    generateDocument(chartData: any[]): void {
        this.loadTemplate().then(templateContent => {
            // @ts-ignore
            const doc = new Docxtemplater();
            doc.loadZip(new JSZip(templateContent));

            // Inject data into the Word document template
            // doc.setData({
            //     chartData: JSON.stringify(chartData)
            // });
            //
            // try {
            //     doc.render();
            // } catch (error) {
            //     console.log(error);
            //     return;
            // }
            //
            // const out = doc.getZip().generate({
            //     type: 'blob',
            //     mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
            // });
            //
            // fs.saveAs(out, 'generated-document.docx');
        });
    }

    private loadTemplate(): Promise<string> {
        // Load your template content using a method of your choice
        // This example assumes the template is a string
        const templateContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8" />
        </head>
        <body>
          <p>This is a Word document template with a chart:</p>
          <p>{{chartData}}</p>
        </body>
      </html>
    `;

        return Promise.resolve(templateContent);
    }
}
