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


import { ICardapio } from '../../../interfaces/i-cardapio';
import { IResponsePageableCardapio } from '../../../interfaces/i-response-pageable-cardapio';

import { CardapioCrudService } from '../../../services/cardapio-crud.service';
import { CriaralterarComponent } from '../criaralterar/criaralterar.component';
import { DetalheComponent } from '../detalhe/detalhe.component';

import { HotelCrudService } from '../../../../hotel/services/hotel-crud.service';
import { RestauranteCrudService } from '../../../../restaurante/services/restaurante-crud.service';

import { LoginService } from '../../../../../../../my-core/services/login.service';

import { IHotel } from '../../../../hotel/interfaces/i-hotel';
import { IRestaurante } from '../../../../restaurante/interfaces/i-restaurante';


@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.scss']
})
export class ListarComponent implements OnInit {

  displayedColumns: string[] = ['id', 'nomePT', 'nomeING', 'nomeFR', 'codigo', 'hotel', 'activo', 'acoes'];
  ELEMENT_DATA: ICardapio[] = [];

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


  //HOTEIS
  hoteis: IHotel[] = [];

   //HOTEIS
   restaurantes: IRestaurante[] = [];


  //ID DO USER LOGADO
  readonly USERID = this.loginService.getLoggedInID();

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private cardapioCrudService: CardapioCrudService,
    private restauranteCrudService: RestauranteCrudService,
    private hotelCrudService: HotelCrudService,
    private loginService: LoginService,
    private dialogService: DialogService,
    private dialog: MatDialog) { }

    //CRIAR FORMULARIO PESQUISA
  formPesquisa: FormGroup = this.formBuilder.group({
    hotel: [null, Validators.required],
    restaurante: [null, Validators.required],
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
    this.inicializarHoteis();
  }

  //INICIALIZAR HOTEIS
  inicializarHoteis(): void{
    //console.log("COMPONENTE CRIAR/ALTERAR - IDUSER: ", this.USERID);
    this.hotelCrudService.findByActivoAndUsersIdOrderByNome(true, Number(this.USERID)).subscribe(
      success => {
        this.hoteis = success._embedded.hoteis;
      },
      error => {
        this.hoteis = [];
      }
    );
  }

  //INICIALIZAR RESTAURANTES
  inicializarRestaurantes(): void{
    //console.log("COMPONENTE CRIAR/ALTERAR - IDUSER: ", this.USERID);
    this.restauranteCrudService.findByActivoAndHotelIdOrderByNomeLIST(true, this.formPesquisa.value.hotel).subscribe(
      success => {
        this.restaurantes = success._embedded.restaurantes;
      },
      error => {
        this.restaurantes = [];
      }
    );
  }

  //CARREGA LISTA
  readAll() {

    //console.log("RESTAURANTE OBJ ",this.getOpcao.value);

    this.carregando = true;

    let myObservablePesquisa$: Observable<IResponsePageableCardapio> = this.selecionar_pesquisa();

    myObservablePesquisa$.subscribe(
      (data: IResponsePageableCardapio) => {
        console.log('COMPONENTE LISTAR - Foi lido os seguintes dados, CARDAPIO: ', data._embedded.cardapios);
        this.dataSource = new  MatTableDataSource(data._embedded.cardapios);
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
  selecionar_pesquisa(): Observable<IResponsePageableCardapio>{


      //PAGINAÇÃO
      let pageIndex = this.pageEvent? this.pageEvent.pageIndex: 0;
      let pageSize = this.pageEvent? this.pageEvent.pageSize: this.sizeInicial;

      //SORT
      this.sort = this.sortEvent? this.sortEvent.active : "nome";
      this.direccaoOrdem = this.sortEvent? this.sortEvent.direction : "asc";

      let myObservablePesquisa$: Observable<IResponsePageableCardapio>;//commentar

      //myObservablePesquisa$ = this.cardapioCrudService.findAll(pageIndex, pageSize, this.sort, this.direccaoOrdem);

      console.log("selecionar_pesquisa opcao-- ", this.formPesquisa.value.opcao);
      console.log("selecionar_pesquisa texto-- ", this.formPesquisa.value.texto);
      console.log("selecionar_pesquisa activo-- ", this.formPesquisa.value.activo);



      if(this.formPesquisa.value.opcao === "NomePT" && this.formPesquisa.value.texto && this.submitted){
        myObservablePesquisa$ = this.cardapioCrudService.findByNomePtContainingIgnoreCaseAndActivoAndHotelIdAndRestauranteCardapioRestauranteId(this.formPesquisa.value.texto, this.formPesquisa.value.activo, this.formPesquisa.value.hotel, this.formPesquisa.value.restaurante, pageIndex, pageSize, this.sort, this.direccaoOrdem);
      }

      else if(this.formPesquisa.value.opcao === "NomeING" && this.formPesquisa.value.texto && this.submitted){
        myObservablePesquisa$ = this.cardapioCrudService.findByNomeIngContainingIgnoreCaseAndActivoAndHotelIdAndRestauranteCardapioRestauranteId(this.formPesquisa.value.texto, this.formPesquisa.value.activo, this.formPesquisa.value.hotel, this.formPesquisa.value.restaurante, pageIndex, pageSize, this.sort, this.direccaoOrdem);
      }

      else if(this.formPesquisa.value.opcao === "NomeFR" && this.formPesquisa.value.texto && this.submitted){
        myObservablePesquisa$ = this.cardapioCrudService.findByNomeFrContainingIgnoreCaseAndActivoAndHotelIdAndRestauranteCardapioRestauranteId(this.formPesquisa.value.texto, this.formPesquisa.value.activo, this.formPesquisa.value.hotel, this.formPesquisa.value.restaurante, pageIndex, pageSize, this.sort, this.direccaoOrdem);
      }
      else
      if(this.formPesquisa.value.opcao === "Codigo" && this.formPesquisa.value.texto && this.submitted){
        myObservablePesquisa$ = this.cardapioCrudService.findByNomeFrContainingIgnoreCaseAndActivoAndHotelIdAndRestauranteCardapioRestauranteId(this.formPesquisa.value.texto, this.formPesquisa.value.activo, this.formPesquisa.value.hotel, this.formPesquisa.value.restaurante, pageIndex, pageSize, this.sort, this.direccaoOrdem);
      }

      else if(this.formPesquisa.value.opcao === "Todos" && this.submitted){
        myObservablePesquisa$ = this.cardapioCrudService.findByActivoAndHotelIdAndRestauranteCardapioRestauranteId(this.formPesquisa.value.activo, this.formPesquisa.value.hotel, this.formPesquisa.value.restaurante, pageIndex, pageSize, this.sort, this.direccaoOrdem);
      }
      else if(this.submitted){
        myObservablePesquisa$ = this.cardapioCrudService.findByActivoAndHotelIdAndRestauranteCardapioRestauranteId(this.formPesquisa.value.activo, this.formPesquisa.value.hotel, this.formPesquisa.value.restaurante, pageIndex, pageSize, this.sort, this.direccaoOrdem);
      }

      else if(this.ON_CHANCHE_RESTAURANTE && this.formPesquisa.value.restaurante){
        myObservablePesquisa$ = this.cardapioCrudService.findByHotelIdAndRestauranteCardapioRestauranteId(this.formPesquisa.value.hotel, this.formPesquisa.value.restaurante, pageIndex, pageSize, this.sort, this.direccaoOrdem);
      }

      else{
        myObservablePesquisa$ = this.cardapioCrudService.findByHotelUsersId(this.USERID, pageIndex, pageSize, this.sort, this.direccaoOrdem);
      }

      return myObservablePesquisa$;

  }

  //ON_CHANCHE_HOTEL
  disabledBotaoPesquisa: boolean = true;
  ON_CHANCHE_RESTAURANTE: boolean = false;

  selectHotelChange(){



    if(this.formPesquisa.value.hotel){
      this.inicializarRestaurantes();
      this.formPesquisa.value.restaurante = undefined;
      this.mudarEstadoBotaoPesquisa();

    }else{
      this.restaurantes = [];
      this.disabledBotaoPesquisa = true; //desactivar
    }



  }

  selectRestauranteChange(){

    this.ON_CHANCHE_RESTAURANTE = true;

    if(this.formPesquisa.value.restaurante){
      this.mudarEstadoBotaoPesquisa();
      this.readAll();
    }else{
      this.disabledBotaoPesquisa = true; //desactivar
    }

    this.ON_CHANCHE_RESTAURANTE = false;

  }

  mudarEstadoBotaoPesquisa(){

    if(!this.formPesquisa.value.hotel || !this.formPesquisa.value.restaurante){
      this.disabledBotaoPesquisa = true; //desactivar
    }else if(this.formPesquisa.value.opcao === "Todos")
      this.disabledBotaoPesquisa = false; //activar
    else if(this.formPesquisa.value.opcao && this.formPesquisa.value.texto){
      this.disabledBotaoPesquisa = false; //activar
    }else {
      this.disabledBotaoPesquisa = true; //desactivar
    }

  }



  //DIALOG EDITAR
  editarEntety(row: ICardapio) {
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
  verEntety(row: ICardapio) {
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
  deleteEntetyDialgo(row: ICardapio) {

    let dialogRef$ = this.dialogService.confirmDialog(
      {
        title: "Remover Cardapio?",
        message: "Nome: "+row.nomePt,
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

  deleteEntety(row: ICardapio){

  this.cardapioCrudService.deleteData(row.id).subscribe(
        success => {
              this.dialogService.openSnack_botao_tempo_css("Sucesso Delete Cardapio", "X", 6000, "green-snackbar");

              this.redirectTo('/oa-admin/gestao/entidades/cardapio/listar');
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
              console.log('DELETE CARDAPIO completo');
              this.requestCompleto = true;
        }
  );
  }



  //DIALOG ERRO
  alertDialogError(msg: string){
    this.dialogService.alertDialogError(
      {
        message: msg,
        buttonText: "Sair",
      }
    );
  }


  //LIMPAR CAMPOS FORM
  limparPesquisa() {
    this.submitted = false;
    this.formPesquisa.reset();
  }


  redirectTo(uri:string){
  this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
  this.router.navigate([uri]));
  }

  //FILTER
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
  get getHotel(): any {
    return this.formPesquisa?.get('hotel');
  }

  get getRestaurante(): any {
    return this.formPesquisa?.get('restaurante');
  }




}
