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


import { ITitem } from '../../../interfaces/i-titem';
import { IResponsePageableTitem } from '../../../interfaces/i-response-pageable-titem';

import { TitemCrudService } from '../../../services/titem-crud.service';
import { CriaralterarComponent } from '../criaralterar/criaralterar.component';
import { DetalheComponent } from '../detalhe/detalhe.component';

import { HotelCrudService } from '../../../../hotel/services/hotel-crud.service';
import { RestauranteCrudService } from '../../../../restaurante/services/restaurante-crud.service';
import { CardapioCrudService } from '../../../../cardapio/services/cardapio-crud.service';

import { LoginService } from '../../../../../../../my-core/services/login.service';

import { IHotel } from '../../../../hotel/interfaces/i-hotel';
import { IRestaurante } from '../../../../restaurante/interfaces/i-restaurante';
import { ICardapio } from '../../../../cardapio/interfaces/i-cardapio';



@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.scss']
})
export class ListarComponent implements OnInit {

  displayedColumns: string[] = ['id', 'nome', 'activo', 'acoes'];
  ELEMENT_DATA: ITitem[] = [];

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





  //ID DO USER LOGADO
  readonly USERID = this.loginService.getLoggedInID();


  constructor(
    private formBuilder: FormBuilder,
    private router: Router,

    private titemCrudService: TitemCrudService,
    private cardapioCrudService: CardapioCrudService,
    private restauranteCrudService: RestauranteCrudService,
    private hotelCrudService: HotelCrudService,
    private loginService: LoginService,
    private dialogService: DialogService,
    private dialog: MatDialog) { }

  //CRIAR FORMULARIO PESQUISA
  formPesquisa: FormGroup = this.formBuilder.group({
    opcao: [null],
    texto: [null],
    activo: [true]
  });

    //ONSUBMIT PESQUISA
    onSubmit() {
      this.submitted = true;
      this.readAll();
      this.submitted = false;
    }

    ngOnInit(): void {
      this.readAll();
    }



  //CARREGA LISTA
  readAll() {

    //console.log("RESTAURANTE OBJ ",this.getOpcao.value);

    this.carregando = true;

    let myObservablePesquisa$: Observable<IResponsePageableTitem> = this.selecionar_pesquisa();

    myObservablePesquisa$.subscribe(
      (data: IResponsePageableTitem) => {
        console.log('COMPONENTE LISTAR - Foi lido os seguintes dados, TITEM: ', data._embedded.tipoitens);
        this.dataSource = new  MatTableDataSource(data._embedded.tipoitens);
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
  selecionar_pesquisa(): Observable<IResponsePageableTitem>{


    //PAGINAÇÃO
    let pageIndex = this.pageEvent? this.pageEvent.pageIndex: 0;
    let pageSize = this.pageEvent? this.pageEvent.pageSize: this.sizeInicial;

    //SORT
    this.sort = this.sortEvent? this.sortEvent.active : "nome";
    this.direccaoOrdem = this.sortEvent? this.sortEvent.direction : "asc";

    let myObservablePesquisa$: Observable<IResponsePageableTitem>;//commentar

    myObservablePesquisa$ = this.titemCrudService.findAll(pageIndex, pageSize, this.sort, this.direccaoOrdem);

    console.log("selecionar_pesquisa opcao-- ", this.formPesquisa.value.opcao);
    console.log("selecionar_pesquisa texto-- ", this.formPesquisa.value.texto);
    console.log("selecionar_pesquisa activo-- ", this.formPesquisa.value.activo);



    if(this.formPesquisa.value.opcao === "Nome" && this.formPesquisa.value.texto && this.submitted){
      myObservablePesquisa$ = this.titemCrudService.findByNomeContainingIgnoreCaseAndActivo(this.formPesquisa.value.texto, this.formPesquisa.value.activo, pageIndex, pageSize, this.sort, this.direccaoOrdem);
    }

    else if(this.formPesquisa.value.opcao === "Todos" && this.submitted){
      myObservablePesquisa$ = this.titemCrudService.findByActivo(this.formPesquisa.value.activo, pageIndex, pageSize, this.sort, this.direccaoOrdem);
    }

    else{
      myObservablePesquisa$ = this.titemCrudService.findAll(pageIndex, pageSize, this.sort, this.direccaoOrdem);
    }

    return myObservablePesquisa$;

}


  //ON_CHANCHE_HOTEL
  disabledBotaoPesquisa: boolean = true;


  mudarEstadoBotaoPesquisa(){

    if(this.formPesquisa.value.opcao === "Todos")
      this.disabledBotaoPesquisa = false; //activar
    else if(this.formPesquisa.value.opcao && this.formPesquisa.value.texto){
      this.disabledBotaoPesquisa = false; //activar
    }else {
      this.disabledBotaoPesquisa = true; //desactivar
    }

  }


  //DIALOG EDITAR
  editarEntety(row: ITitem) {
    this.isPopupOpened = true;
    const dialogRef = this.dialog.open(CriaralterarComponent, {
      data: row,
      maxWidth: '70vw',
      maxHeight: '80vh',

      width: '70vw',

      disableClose: true
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
  verEntety(row: ITitem) {
    this.isPopupOpened = true;

    const dialogRef = this.dialog.open(DetalheComponent, {
      data: row,
      maxWidth: '70vw',
      maxHeight: '80vh',

      width: '70vw',


    });

    //ACCAO DEPOIS DE FECHAR DIALOG
    dialogRef.afterClosed().subscribe(
      result => {
          this.isPopupOpened = false;
      }
    );

  }

  //DIALOG CONFIRM DELETE
  deleteEntetyDialgo(row: ITitem) {

    let dialogRef$ = this.dialogService.confirmDialog(
      {
        title: "Remover Titem?",
        message: "Nome: "+row.nome,
        confirmText: "Sim",
        cancelText: "Não",
      }
    );

    dialogRef$.subscribe(result => {
      console.log("Dialog result: ", result);

      if(result){
            this.deleteEntety(row);
      }
    });
  }

  //REALIZAR DELETE
  deleteEntety(row: ITitem){

    this.titemCrudService.deleteData(row.id).subscribe(
          success => {

                this.dialogService.openSnack_botao_tempo_css("Sucesso: T. Item Removido", "X", 6000, "green-snackbar");

                this.redirectTo('/oa-admin/gestao/entidades/titem/listar');
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
                console.log('DELETE TITEM completo');
                this.requestCompleto = true;
          }
      );
    }


  //DIALOG ERROR
  alertDialogError(msg: string){
    this.dialogService.alertDialogError(
      {
        message: msg,
        buttonText: "Sair",
      }
    );
  }


  //LIMPAR CAMPOS FORM PESQUISA
  limparPesquisa() {
    this.submitted = false;
    this.disabledBotaoPesquisa = true; //desactivar
    this.formPesquisa.reset();
  }


  //REDIRECT DEPOIS DE CRIAR OU EDITAR
  redirectTo(uri:string){
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
    this.router.navigate([uri]));
  }

  //FILTER MAT TABLE
  applyFilter(event: Event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
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
