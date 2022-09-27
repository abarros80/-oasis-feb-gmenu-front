import { Injectable } from '@angular/core';


const pdfMake = require('pdfmake/build/pdfmake.js');
//import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from 'pdfmake/build/vfs_fonts';

(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;


@Injectable({
  providedIn: 'root'
})
export class OaPdfService {



  constructor() {}






  async generatePdf(action = 'open') {
    let docDefinition = {

      background: 'simple text',

      header: 'simple text',

      footer: {
        columns: [
          'Left part',
          { text: 'Right part', alignment: 'right' }
        ]
      },



      content: [


        'paragraph 1',
        'paragraph 2',
        {
          columns: [
            'first column is a simple text',
            [
              // second column consists of paragraphs
              'paragraph A',
              'paragraph B',
              'these paragraphs will be rendered one below another inside the column'
            ]
          ]
        },


          // Previous configuration
          {
            text: 'Customer Details',
            style: 'sectionHeader'
          },
          {
            columns: [
                [{ qr: 'Adilson Barros', fit: '50' }],
                [{ text: 'Signature', alignment: 'right', italics: true }]
            ]
          },
          {
            ul: [
              'Order can be return in max 10 days.',
              'Warrenty of the product will be subject to the manufacturer terms and conditions.',
              'This is system generated invoice.',
            ]
          },

          {
            columns: [
                [
                    {
                        text: 'this.invoice.customerName',
                        bold: true
                    },
                    { text: 'this.invoice.address' },
                    { text: 'this.invoice.email' },
                    { text: 'this.invoice.contactNo' }
                ],
                [
                    {
                        text: `Date: ${new Date().toLocaleString()}`,
                        alignment: 'right'
                    },
                    {
                        text: `Bill No : ${((Math.random() * 1000).toFixed(0))}`,
                        alignment: 'right'
                    }
                ]
            ]
          },
          {
              text: 'Customer Details',
              style: 'sectionHeader'
          },
          {
            text: 'Order Details',
            style: 'sectionHeader'
          },
          {
              columns: [
                  [
                      {
                          text: 'this.invoice.customerName',
                          bold: true
                      },
                      { text: 'this.invoice.address' },
                      { text: 'this.invoice.email' },
                      { text: 'this.invoice.contactNo' }
                  ],
                  [
                      {
                          text: `Date: ${new Date().toLocaleString()}`,
                          alignment: 'right'
                      },
                      {
                          text: `Bill No : ${((Math.random() * 1000).toFixed(0))}`,
                          alignment: 'right'
                      }
                  ]
              ]
          },

          // if you don't need styles, you can use a simple string to define a paragraph
          'This is a standard paragraph, using default style',

          // using a { text: '...' } object lets you set styling properties
          { text: 'This paragraph will have a bigger font', fontSize: 15 },

          // if you set the value of text to an array instead of a string, you'll be able
          // to style any part individually
          {
            text: [
              'This paragraph is defined as an array of elements to make it possible to ',
              { text: 'restyle part of it and make it bigger ', fontSize: 15 },
              'than the rest.'
            ]
          },


          { text: 'This is a header', style: 'header' },
          'No styling here, this is a standard paragraph',
          { text: 'Another text', style: 'anotherStyle' },
          { text: 'Multiple styles applied', style: [ 'header', 'anotherStyle' ] },


          'This paragraph fills full width, as there are no columns. Next paragraph however consists of three columns',
          {
            columns: [
              {
                // auto-sized columns have their widths based on their content
                width: 'auto',
                text: 'First column'
              },
              {
                // star-sized columns fill the remaining space
                // if there's more than one star-column, available width is divided equally
                width: '*',
                text: 'Second column'
              },
              {
                // fixed width
                width: 100,
                text: 'Third column'
              },
              {
                // % width
                width: '20%',
                text: 'Fourth column'
              }
            ],
            // optional space between columns
            columnGap: 10
          },
          'This paragraph goes below all columns and has full width',


          {
            layout: 'lightHorizontalLines', // optional
            table: {
              // headers are automatically repeated if the table spans over multiple pages
              // you can declare how many rows should be treated as headers
              headerRows: 1,
              widths: [ '*', 'auto', 100, '*' ],

              body: [
                [ 'First', 'Second', 'Third', 'The last one' ],
                [ 'Value 1', 'Value 2', 'Value 3', 'Value 4' ],
                [ { text: 'Bold value', bold: true }, 'Val 2', 'Val 3', 'Val 4' ]
              ]
            }
          },



          'Bulleted list example:',
          {
            // to treat a paragraph as a bulleted list, set an array of items under the ul key
            ul: [
              'Item 1',
              'Item 2',
              'Item 3',
              { text: 'Item 4', bold: true },
            ]
          },

          'Numbered list example:',
          {
            // for numbered lists set the ol key
            ol: [
              'Item 1',
              'Item 2',
              'Item 3'
            ]
          },


          {
            image: await this.getBase64ImageFromURL(
              "/assets/img/BEBIDAS.jpg"
            )
          },

          {
            image: await this.getBase64ImageFromURL('https://picsum.photos/seed/picsum/200/300')
          },








      ],
      styles: {
          sectionHeader: {
              bold: true,
              decoration: 'underline',
              fontSize: 14,
              margin: [0, 15, 0, 15]
          },
          header: {
            fontSize: 22,
            bold: true
          },
          anotherStyle: {
            italics: true,
            alignment: 'right'
          }
      }
      ,

      images: {
        mySuperImage: 'data:image/jpeg;base64,...content...',

        // in browser is supported loading images via url (https or http protocol) (minimal version: 0.1.67)
        snow: 'https://picsum.photos/seed/picsum/200/300',

        // is supported loading images via url with custom headers (minimal version: 0.2.5)
        strawberries: {
          url: 'https://picsum.photos/id/1080/367/267',
          headers: {
            myheader: '123',
            myotherheader: 'abc',
          }
        }
      }



  }


        switch (action) {
          case 'open': pdfMake.createPdf(docDefinition).open(); break;
          case 'print': pdfMake.createPdf(docDefinition).print(); break;
          case 'download': pdfMake.createPdf(docDefinition).download(); break;
          default: pdfMake.createPdf(docDefinition).open(); break;
        }

  }






  getBase64ImageFromURL(url: any) {
    return new Promise((resolve, reject) => {
      var img = new Image();
      img.setAttribute("crossOrigin", "anonymous");

      img.onload = () => {
        var canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;

        var ctx = canvas.getContext("2d");
        ctx?.drawImage(img, 0, 0);

        var dataURL = canvas.toDataURL("image/png");

        resolve(dataURL);
      };

      img.onerror = error => {
        reject(error);
      };

      img.src = url;
    });}


    async createPdf() {
      var docDefinition = {
        content: [

          {
            image: await this.getBase64ImageFromURL(
              "/src/assets/img/BEBIDAS.jpg"
            )
          }
        ]
      }
    }


}
