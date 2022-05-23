import { Component, OnInit } from '@angular/core';
import { map, tap } from 'rxjs/operators';

import { TipoConjuntoCrudService } from './../../../services/tipo-conjunto-crud.service';
import { TipoConjunto } from '../../../models/tipo-conjunto';

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

  constructor(
    private tipoConjuntoCrudService: TipoConjuntoCrudService
    ) { }

  ngOnInit(): void {
    this.readAll();
  }

  readAll() {
    this.tipoConjuntoCrudService.getAllData()
    .pipe(
      map((dados: any) => dados._embedded ),
      tap(console.log),
      map((dados: {tipoconjuntos: TipoConjunto[]}) => dados.tipoconjuntos )
    )
    .subscribe(
      data => {
        console.log('Foi lido os seguintes dados, tipo conjuntos: ', data);
        this.listaTipoConjunto = data;

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
