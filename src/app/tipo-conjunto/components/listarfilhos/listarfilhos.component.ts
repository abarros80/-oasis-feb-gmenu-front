import { Component, OnInit } from '@angular/core';
import { ConjuntoCrudService } from './../../../conjunto/services/conjunto-crud.service';
import { Conjunto } from './../../../conjunto/models/conjunto';


import { map, tap } from 'rxjs/operators';
import { TipoConjuntoCrudService } from '../../services/tipo-conjunto-crud.service';
import { ActivatedRoute } from '@angular/router';



const ELEMENT_DATA: Conjunto[] = [
  // {id: 1, nome: 'Hydrogen', tipoConjunto_id: 1, activo: true}
 ];

@Component({
  selector: 'app-listarfilhos',
  templateUrl: './listarfilhos.component.html',
  styleUrls: ['./listarfilhos.component.css']
})
export class ListarfilhosComponent implements OnInit {


  displayedColumns: string[] = ['id', 'nome', 'tipo', 'acoes'];
  dataSource = ELEMENT_DATA;

  listaConjuntos: Conjunto[] = [];
  nometipoConjunto?: string;
  erroMsg?: string;
  haErroMsg: boolean = false;
  requestCompleto = false;

  constructor(
    private conjuntoCrudService: ConjuntoCrudService,
    private tipoconjuntoCrudService: TipoConjuntoCrudService,
    private route: ActivatedRoute,
    ) { }

  ngOnInit(): void {
    this.lernometipoConjunto()
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


  lernometipoConjunto(): void {
    //LER DADOS URL: SABER ID e ACCAO
    this.route.params.subscribe((params: any) =>{
      console.log(params);
      const id = params['id'];
      if(id){
        const tipoconjunto$ = this.tipoconjuntoCrudService.getData(id);
        tipoconjunto$.subscribe(tipoconjunto => {
          this.nometipoConjunto = tipoconjunto.nome;
        });
      }
    });
  }



}
