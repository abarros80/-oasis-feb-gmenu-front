import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { MatSort, Sort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import {MatTableDataSource} from '@angular/material/table';
import { PageEvent } from '@angular/material/paginator';

import { MyPages } from '../../../../../../../my-shared/interfaces-shared/my-pages';
import { DialogService } from '../../../../../../../my-core/services/dialog.service';


import { IRestaurante } from '../../../interfaces/i-restaurante';
import { RestauranteCrudService } from '../../../services/restaurante-crud.service';
import { CriaralterarComponent } from '../criaralterar/criaralterar.component';
import { DetalheComponent } from '../detalhe/detalhe.component';
import { IResponsePageableRestaurante } from '../../../interfaces/i-response-pageable-restaurante';

@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.scss']
})
export class ListarComponent implements OnInit {

  displayedColumns: string[] = ['id', 'nome', 'numint', 'telefone', 'horario', 'activo', 'acoes'];
  ELEMENT_DATA: IRestaurante[] = [];

  dataSource = new  MatTableDataSource(this.ELEMENT_DATA);

  erroMsg?: string;
  haErroMsg: boolean = false;
  requestCompleto = false;

  carregando: boolean = false;

  //PAGINAÇÃO
  mypages?: MyPages;


  totalElements: number =0;
  sizeInicial: number =10;
  sort: string ="id";
  direccaoOrdem: string ="desc";

  pageSizeOptions: number[] = [5, 10, 20, 30];

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    if (setPageSizeOptionsInput) {
      this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
    }
  }

  //PAGE_EVENT
  pageEvent?: PageEvent;

  //SORT_EVENT
  sortEvent?: Sort;

  //-----FORM PESQUISA
  submitted = false;

  // CONTROLO POP_UP
  isPopupOpened = true;



  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private restauranteCrudService: RestauranteCrudService,
    private dialogService: DialogService,
    private dialog: MatDialog) { }

//CRIAR FORMULARIO PESQUISA
formPesquisa: FormGroup = this.formBuilder.group({
  opcao: [null],
  texto: [null],
  activo: [true]
});

  //DIALOG EDITAR
  editarRestaurante(row: IRestaurante) {
      this.isPopupOpened = true;
      //const contact = this._contactService.getAllContacts().find(c => c.ID === id);
      const dialogRef = this.dialog.open(CriaralterarComponent, {
        data: row
      });

      //ACCAO DEPOIS DE FECHAR DIALOG
      dialogRef.afterClosed().subscribe(
        result => {
            this.isPopupOpened = false;

            if(result==='update'){
              this.readAll();
            }
        }
      );
  }

  //DIALOG VER
  verRestaurante(row: IRestaurante) {
    this.isPopupOpened = true;

    const dialogRef = this.dialog.open(DetalheComponent, {
      data: row
    });

    //ACCAO DEPOIS DE FECHAR DIALOG
    dialogRef.afterClosed().subscribe(
      result => {
          this.isPopupOpened = false;
      }
    );
}

  //DIALOG CONFIRM DELETE
  deleteRestauranteDialgo(row: IRestaurante) {

    let dialogRef$ = this.dialogService.confirmDialog(
      {
        title: "Remover Restaurante?",
        message: "Nome: "+row.nome,
        confirmText: "Sim",
        cancelText: "Não",
      }
    );

    dialogRef$.subscribe(result => {
      console.log("Dialog result: ", result);

      if(result){
            this.deleteRestaurante(row);
      }
    });
}

deleteRestaurante(row: IRestaurante){

  this.restauranteCrudService.deleteData(row.id).subscribe(
        success => {
              this.dialogService.openSnack_botao_tempo_css("Sucesso Delete Restaurante", "X", 6000, "green-snackbar");

              this.redirectTo('/oa-admin/gestao/entidades/restaurante/listar');
        },
        error => {

              this.dialogService.alertDialogError(
                {
                  message: error,
                  buttonText: "Sair",
                }
              );
        },

        () => {
              console.log('DELETE RESTAURANTE completo');
              this.requestCompleto = true;
        }
  );


//this.dialogService.openSnack_botao_tempo_css("Sucesso delete restaurante "+row.nome, "X", 6000, "green-snackbar");

//this.dialogService.openSnack_botao_tempo_css("Erro no delete","X", 3000, "red-snackbar")

}

  ngOnInit(): void {
    this.readAll();
  }

    //CARREGA LISTA
    readAll() {

          //console.log("RESTAURANTE OBJ ",this.getOpcao.value);

          this.carregando = true;

          let myObservablePesquisa$: Observable<IResponsePageableRestaurante> = this.selecionar_pesquisa();

          myObservablePesquisa$.subscribe(
            (data: IResponsePageableRestaurante) => {
              console.log('COMPONENTE LISTAR - Foi lido os seguintes dados, RESTAURANTE: ', data._embedded.restaurantes);
              this.dataSource = new  MatTableDataSource(data._embedded.restaurantes);
              //this.ELEMENT_DATA = data._embedded.hoteis;
              this.mypages = data.page;
              this.totalElements = this.mypages.totalElements;
              this.carregando = false;
            },
            error => {
              console.error('COMPONENTE LISTAR - ERROR: ', error);
              this.erroMsg = error;
              this.haErroMsg = true;
              this.carregando = false;

              this.alertDialogError(error);

            },
            () => { this.requestCompleto = true; }
          );
    }

  //Devolve o tipo de pesquisa consoante select do formulario
  selecionar_pesquisa(): Observable<IResponsePageableRestaurante>{


    //PAGINAÇÃO
    let pageIndex = this.pageEvent? this.pageEvent.pageIndex: 0;
    let pageSize = this.pageEvent? this.pageEvent.pageSize: this.sizeInicial;

    //SORT
    this.sort = this.sortEvent? this.sortEvent.active : "nome";
    this.direccaoOrdem = this.sortEvent? this.sortEvent.direction : "asc";

    let myObservablePesquisa$: Observable<IResponsePageableRestaurante>;//commentar

    myObservablePesquisa$ = this.restauranteCrudService.findAll(pageIndex, pageSize, this.sort, this.direccaoOrdem);

    console.log("selecionar_pesquisa -- ", this.formPesquisa.value.opcao);
    console.log("selecionar_pesquisa -- ", this.formPesquisa.value.texto);
    console.log("selecionar_pesquisa -- ", this.formPesquisa.value.activo);

    if(this.formPesquisa.value.opcao === "Nome" && this.formPesquisa.value.texto && this.submitted){
      myObservablePesquisa$ = this.restauranteCrudService.findByNomeContainingIgnoreCaseAndActivoOrderByNome(this.formPesquisa.value.texto, this.formPesquisa.value.activo, pageIndex, pageSize, this.sort, this.direccaoOrdem)
    }else
    if(this.formPesquisa.value.opcao === "Telefone" && this.formPesquisa.value.texto && this.submitted){
      myObservablePesquisa$ = this.restauranteCrudService.findByTelefoneContainingIgnoreCaseAndActivoOrderByTelefone(this.formPesquisa.value.texto, this.formPesquisa.value.activo, pageIndex, pageSize, this.sort, this.direccaoOrdem)
    }else
    if(this.formPesquisa.value.opcao === "NumInterno" && this.formPesquisa.value.texto && this.submitted){
      myObservablePesquisa$ = this.restauranteCrudService.findByNumeroInternoContainingIgnoreCaseAndActivoOrderByNumeroInterno(this.formPesquisa.value.texto, this.formPesquisa.value.activo, pageIndex, pageSize, this.sort, this.direccaoOrdem)
    }else
    if(this.formPesquisa.value.opcao === "Todos" && this.submitted){
      myObservablePesquisa$ = this.restauranteCrudService.findByActivoOrderByNome(this.formPesquisa.value.activo, pageIndex, pageSize, this.sort, this.direccaoOrdem)
    }else if(this.submitted){
      myObservablePesquisa$ = this.restauranteCrudService.findByActivoOrderByNome(this.formPesquisa.value.activo, pageIndex, pageSize, this.sort, this.direccaoOrdem);
    }else{
      myObservablePesquisa$ = this.restauranteCrudService.findAll(pageIndex, pageSize, this.sort, this.direccaoOrdem);
    }

    return myObservablePesquisa$;

  }

   //FILTER
   applyFilter(event: Event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
}


//ONSUBMIT PESQUISA
onSubmit() {
    this.submitted = true;
    this.readAll();
    this.submitted = false;
}


//LIMPAR CAMPOS FORM
limparPesquisa() {
    this.submitted = false;
    this.formPesquisa.reset();
}

alertDialogError(msg: string){
    this.dialogService.alertDialogError(
      {
        message: msg,
        buttonText: "Sair",
      }
    );
}

redirectTo(uri:string){
this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
this.router.navigate([uri]));
}

//METODOS GETs
get getOpcao(): any {
return this.formPesquisa?.get('opcao');
}

get getTexto(): any {
return this.formPesquisa?.get('texto');
}

get getActivo(): any {
return this.formPesquisa?.get('activo');
}

}
