import { Component, OnInit } from '@angular/core';
import { map, tap } from 'rxjs/operators';

import { TipoConjuntoCrudService } from './../../../services/tipo-conjunto-crud.service';
import { TipoConjunto } from '../../../models/tipo-conjunto';

import { ResponsePageableTipoConjunto } from './../../../interfaces/response-pageable-tipo-conjunto';
import { MyPages } from '../../../../../my-shared/interfaces-shared/my-pages';
import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';

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

  mypages?: MyPages;


  totalElements: number =0;
  sizeInicial: number =1;
  sort: string ="nome";
  direccaoOrdem: string ="asc";

  pageSizeOptions: number[] = [1, 2, 5, 10];

  // MatPaginator Output
  pageEvent?: PageEvent;

  sortEvent?: Sort;

  carregando: boolean = false;

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    if (setPageSizeOptionsInput) {
      this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
    }
  }

  constructor(
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

    this.tipoConjuntoCrudService.findAll(pageIndex, pageSize, this.sort, this.direccaoOrdem)

    .subscribe(
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

}
