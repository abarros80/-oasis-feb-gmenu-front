import { Component, OnInit } from '@angular/core';
import { ConjuntoCrudService } from '../../../services/conjunto-crud.service';
import { Conjunto } from '../../../models/conjunto';
import { map, tap } from 'rxjs/operators';



const ELEMENT_DATA: Conjunto[] = [
  // {id: 1, nome: 'Hydrogen', tipoConjunto_id: 1, activo: true}
 ];


@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.css']
})
export class ListarComponent implements OnInit {



  displayedColumns: string[] = ['id', 'nome', 'tipo', 'filhos', 'acoes'];
  dataSource = ELEMENT_DATA;

  listaConjuntos: Conjunto[] = [];
  erroMsg?: string;
  haErroMsg: boolean = false;
  requestCompleto = false;

  constructor(
    private conjuntoCrudService: ConjuntoCrudService
    ) { }

  ngOnInit(): void {
    this.readAll();
  }

  readAll() {
    this.conjuntoCrudService.getAllData()
    .pipe(
      map((dados: any) => dados._embedded ),
      tap(console.log),
      map((dados: {conjuntos: Conjunto[]}) => dados.conjuntos )
    )
    .subscribe(
      data => {
        console.log('Foi lido os seguintes dados, conjuntos: ', data);
        /*
        data.forEach((value: any) => {
          let novoconjunto = new Conjunto();
          this.print(value, novoconjunto);
          this.listaConjuntos.push(novoconjunto)
          //console.log(value);
        });

        */
        this.listaConjuntos = data;

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


/*
  print(unidademultipla: any, resultunidademultipla: Conjunto) {

    resultunidademultipla.id = unidademultipla.id;
    resultunidademultipla.nome = unidademultipla.nome;

    resultunidademultipla.estado = unidademultipla.estado;

    //LER ESTABELECIMENTO
    this.conjuntoCrudService.getDataByURL(unidademultipla._links.estabelecimento.href)
    .subscribe(
      data => {
        console.log('Foi lido os seguintes dados, Estabelecimento: ', data);
        resultunidademultipla.estabelecimento = data.nome;
      },
      error => {
        console.error('ERROR ler Estabelecimento: ', error);
      }
    );

  }
*/




}
