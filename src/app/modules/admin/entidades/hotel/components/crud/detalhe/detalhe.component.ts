import { Component, OnInit, Inject  } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';

import {  FormBuilder, FormGroup, Validators } from '@angular/forms';

import {  MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


import { LoginService } from '../../../../../../../my-core/services/login.service';
import { HotelCrudService } from '../../../../hotel/services/hotel-crud.service';

import { DialogService } from '../../../../../../../my-core/services/dialog.service';


import { IHotel } from '../../../../hotel/interfaces/i-hotel';

import { IReqHotel } from '../../../interfaces/i-req-hotel';

@Component({
  selector: 'app-detalhe',
  templateUrl: './detalhe.component.html',
  styleUrls: ['./detalhe.component.scss']
})
export class DetalheComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private hotelCrudService: HotelCrudService,
    private dialogRef: MatDialogRef<DetalheComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IHotel,

    private loginService: LoginService,
    private dialogService: DialogService
  ) {}

  ngOnInit(): void {
    console.log("COMPONENTE DETALHES: ngOnInit ===============================");
    this.detalhes();
  }

  detalhes(): void {

  }

}
