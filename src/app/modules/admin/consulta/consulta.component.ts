import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ChartData, ChartOptions } from 'chart.js';

import { OaPdfService } from '../../../my-core/services/oa-pdf.service';
import { OaFileUploadService } from '../../../my-core/services/oa-file-upload.service';
import { OaExelService } from '../../../my-core/services/oa-exel.service';


export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}




@Component({
  selector: 'app-consulta',
  templateUrl: './consulta.component.html',
  styleUrls: ['./consulta.component.css']
})
export class ConsultaComponent implements OnInit {

  //CRIAR FORMULARIO
  formHotel: FormGroup = this.formBuilder.group({});

  constructor(
    private formBuilder: FormBuilder,
    private oaPdfService: OaPdfService,
    private oaExelService: OaExelService,
    private oaFileUploadService: OaFileUploadService
    ) { }

  ngOnInit(): void {
    this.incializarForm();

    this.fileInfos = this.oaFileUploadService.getFiles();

  }

  //CRIAR FORMULARIO
  incializarForm(): void {
    this.formHotel = this.formBuilder.group({

      id: [null],
      nome: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(10)]],
      imagemLogo: [null, Validators.required],
    });
  }

  generatePdf(accao: string) {
    this.oaPdfService.generatePdf(accao);
  }



  //NGX-CHARTS =========================
  saleData = [
    { name: "Mobiles", value: 105000 },
    { name: "Laptop", value: 55000 },
    { name: "AC", value: 15000 },
    { name: "Headset", value: 150000 },
    { name: "Fridge", value: 20000 }
  ];

    //NG2-CHARTS =========================

    salesData: ChartData<'line'> = {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
      datasets: [
        { label: 'Mobiles', data: [1000, 1200, 1050, 2000, 500], tension: 0.5 },
        { label: 'Laptop', data: [200, 100, 400, 50, 90], tension: 0.5 },
        { label: 'AC', data: [500, 400, 350, 450, 650], tension: 0.5 },
        { label: 'Headset', data: [1200, 1500, 1020, 1600, 900], tension: 0.5 },
      ],
    };
    chartOptions: ChartOptions = {
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: 'Monthly Sales Data',
        },
      },
    };



    onSubmit() {
      this.upload();
    }



  currentFile?: File;
  progress = 0;
  message = '';

  fileName = 'Select File';
  fileInfos?: Observable<any>;


  selectFile(event: any): void {
    if (event.target.files && event.target.files[0]) {
      const file: File = event.target.files[0];
      this.currentFile = file;
      this.fileName = this.currentFile.name;

      //document.getElementById('fileInput')?.innerHTML = this.fileName;

    } else {
      this.fileName = 'Select File';
    }
  }

  upload(): void {
    this.progress = 0;
    this.message = "";

    if (this.currentFile) {


      this.oaFileUploadService.upload(this.currentFile).subscribe(
        (event: any) => {
          if (event.type === HttpEventType.UploadProgress) {
            this.progress = Math.round(100 * event.loaded / event.total);
          } else if (event instanceof HttpResponse) {
            this.message = event.body.message;
            this.fileInfos = this.oaFileUploadService.getFiles();
          }
        },
        (err: any) => {
          console.log(err);
          this.progress = 0;

          if (err.error && err.error.message) {
            this.message = err.error.message;
          } else {
            this.message = 'Could not upload the file!';
          }

          this.currentFile = undefined;
        });


    }

  }




    //METODOS GETs
    get getNome(): any {
      return this.formHotel?.get('nome');
    }
    get getImagemLogo(): any {
      return this.formHotel?.get('imagemLogo');
    }


    // =========EXEL================

    title = 'angular-exportexcel-example';

    data: any = [{
      eid: 'e101',
      ename: 'ravi',
      esal: 1000
      },{
      eid: 'e102',
      ename: 'ram',
      esal: 2000
      },{
      eid: 'e103',
      ename: 'rajesh',
      esal: 3000
      }];



      exportAsXLSX():void {
      this.oaExelService.exportExcel(this.data, 'customers');
    }


    exportArrayToExcel():void {
      this.oaExelService.exportArrayToExcel(this.data, 'customers');
    }

    ELEMENT_DATA: PeriodicElement[] = [
      { position: 1, name: "Hydrogen", weight: 1.0079, symbol: "H" },
      { position: 2, name: "Helium", weight: 4.0026, symbol: "He" },
      { position: 3, name: "Lithium", weight: 6.941, symbol: "Li" },
      { position: 4, name: "Beryllium", weight: 9.0122, symbol: "Be" },
      { position: 5, name: "Boron", weight: 10.811, symbol: "B" },
      { position: 6, name: "Carbon", weight: 12.0107, symbol: "C" },
      { position: 7, name: "Nitrogen", weight: 14.0067, symbol: "N" },
      { position: 8, name: "Oxygen", weight: 15.9994, symbol: "O" },
      { position: 9, name: "Fluorine", weight: 18.9984, symbol: "F" },
      { position: 10, name: "Neon", weight: 20.1797, symbol: "Ne" }
    ];

    displayedColumns: string[] = ["position", "name", "weight", "symbol"];
    dataSource = this.ELEMENT_DATA;

    exportTable() {
      this.oaExelService.exportTableToExcel("ExampleMaterialTable");
    }



}
