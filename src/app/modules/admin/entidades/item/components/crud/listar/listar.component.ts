import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Observable } from 'rxjs/internal/Observable';

import { IItem } from '../../../interfaces/i-item';
import { ItemCrudService } from '../../../services/item-crud.service';
import { TitemCrudService } from '../../../../titem/services/titem-crud.service';
import { MyPages } from '../../../../../../../my-shared/interfaces-shared/my-pages';

import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { IResponsePageableItem } from '../../../interfaces/i-response-pageable-item';

@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.scss']
})
export class ListarComponent implements OnInit {

  displayedColumns: string[] = ['id', 'nome', 'activo', 'acoes'];
  dataSource: IItem[] = [];

  erroMsg?: string;
  haErroMsg: boolean = false;
  requestCompleto = false;

  carregando: boolean = false;

  //PAGINAÇÃO
  mypages?: MyPages;


  totalElements: number =0;
  sizeInicial: number =3;
  sort: string ="nome";
  direccaoOrdem: string ="asc";

  pageSizeOptions: number[] = [1, 2, 5, 10];

  //PAGE_EVENT
  pageEvent?: PageEvent;

  //SORT_EVENT
  sortEvent?: Sort;


  setPageSizeOptions(setPageSizeOptionsInput: string) {
    if (setPageSizeOptionsInput) {
      this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
    }
  }

  //-----FORM PESQUISA
  submitted = false;

  //CRIAR FORMULARIO
  formPesquisa: FormGroup = this.formBuilder.group({
    nome: [null],
    activo: [true]
  });

  constructor(
    private formBuilder: FormBuilder,
    private itemCrudService: ItemCrudService,
  ) { }

  ngOnInit(): void {
    this.readAll();
  }

  readAll() {
    //PAGINAÇÃO
    this.carregando = true;
    let pageIndex = this.pageEvent? this.pageEvent.pageIndex: 0;
    let pageSize = this.pageEvent? this.pageEvent.pageSize: this.sizeInicial;

    //SORT
    this.sort = this.sortEvent? this.sortEvent.active : "nomePt";
    this.direccaoOrdem = this.sortEvent? this.sortEvent.direction : "asc";

    let myObservablePesquisa$: Observable<IResponsePageableItem>;

    if(this.formPesquisa.value.nome && this.submitted){
      myObservablePesquisa$ = this.itemCrudService.findByNomePtContainingIgnoreCaseAndActivoOrderByNomePt(this.formPesquisa.value.nome, this.formPesquisa.value.activo, pageIndex, pageSize, this.sort, this.direccaoOrdem)
    }else if(this.submitted){
      myObservablePesquisa$ = this.itemCrudService.findByActivoOrderByNomePt(this.formPesquisa.value.activo, pageIndex, pageSize, this.sort, this.direccaoOrdem);
    }else{
      myObservablePesquisa$ = this.itemCrudService.findAll(pageIndex, pageSize, this.sort, this.direccaoOrdem);
    }

    myObservablePesquisa$.subscribe(
      (data: IResponsePageableItem) => {
        console.log('Foi lido os seguintes dados, item: ', data._embedded.itens);
        this.dataSource = data._embedded.itens;
        this.mypages = data.page;
        this.totalElements = this.mypages.totalElements;
        this.carregando = false;
      },
      error => {
        this.erroMsg = error;
        this.haErroMsg = true;
        console.error('ERROR: ', error);
      },
      () => { this.requestCompleto = true; }
    );

  }

  //ONSUBMIT
  onSubmit() {
    this.submitted = true;
    this.readAll();
  }

  limparPesquisa() {
    this.submitted = false;
    this.formPesquisa.reset();
  }

}
