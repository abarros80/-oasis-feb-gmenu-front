import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ChartData, ChartOptions } from 'chart.js';

import { OaPdfService } from '../../../my-core/services/oa-pdf.service';
import { OaFileUploadService } from '../../../my-core/services/oa-file-upload.service';





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



}
