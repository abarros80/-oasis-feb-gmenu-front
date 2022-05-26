import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { TipoConjuntoCrudService } from './../../../services/tipo-conjunto-crud.service';
import { TipoConjunto } from '../../../models/tipo-conjunto';

import { ResponsePageableTipoConjunto } from './../../../interfaces/response-pageable-tipo-conjunto';
import { MyPages } from '../../../../../my-shared/interfaces-shared/my-pages';
import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { Observable } from 'rxjs/internal/Observable';

const ELEMENT_DATA: TipoConjunto[] = [
  // {id: 1, nome: 'Hydrogen', tipoConjunto_id: 1, activo: true}
 ];

@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.css']
})
export class ListarComponent implements OnInit {

  displayedColumns: string[] = ['id', 'nome', 'filhos', 'activo', 'acoes'];
  dataSource = ELEMENT_DATA;

  listaTipoConjunto: TipoConjunto[] = [];
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

  pageEvent?: PageEvent;

  //SORT
  sortEvent?: Sort;

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    if (setPageSizeOptionsInput) {
      this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
    }
  }

  //FILTRO
  submitted = false;

  //CRIAR FORMULARIO
  formPesquisa: FormGroup = this.formBuilder.group({
    nome: [null],
    activo: [true]
  });

  constructor(
    private formBuilder: FormBuilder,
    private tipoConjuntoCrudService: TipoConjuntoCrudService
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
    this.sort = this.sortEvent? this.sortEvent.active : "nome";
    this.direccaoOrdem = this.sortEvent? this.sortEvent.direction : "asc";

    let myObservablePesquisa$: Observable<ResponsePageableTipoConjunto>;

    if(this.formPesquisa.value.nome && this.submitted){
      myObservablePesquisa$ = this.tipoConjuntoCrudService.findByNomeContainingIgnoreCaseAndActivoOrderByNome(this.formPesquisa.value.nome, this.formPesquisa.value.activo, pageIndex, pageSize, this.sort, this.direccaoOrdem)

    }else if(this.submitted){
      myObservablePesquisa$ = this.tipoConjuntoCrudService.findByActivoOrderByNome(this.formPesquisa.value.activo, pageIndex, pageSize, this.sort, this.direccaoOrdem);
    }else{
      myObservablePesquisa$ = this.tipoConjuntoCrudService.findAll(pageIndex, pageSize, this.sort, this.direccaoOrdem);
    }



    myObservablePesquisa$.subscribe(
      (data: ResponsePageableTipoConjunto) => {
        console.log('Foi lido os seguintes dados, tipo conjuntos: ', data._embedded.tipoconjuntos);
       this.listaTipoConjunto = data._embedded.tipoconjuntos;
       this.mypages = data.page;
       this.totalElements = this.mypages.totalElements;

       this.carregando = false;

      },
      error => {
        this.erroMsg = error;
        this.haErroMsg = true;

        console.error('ERROR: ', error);
        //alert(`erro: ${this.erroMsg}`);
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
