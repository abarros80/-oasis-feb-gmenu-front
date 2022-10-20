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

import { IItem } from '../../../interfaces/i-item';
import { ItemCrudService } from '../../../services/item-crud.service';

import { IResponsePageableItem } from '../../../interfaces/i-response-pageable-item';



import { CriaralterarComponent } from '../criaralterar/criaralterar.component';
import { DetalheComponent } from '../detalhe/detalhe.component';

import { HotelCrudService } from '../../../../hotel/services/hotel-crud.service';
import { RestauranteCrudService } from '../../../../restaurante/services/restaurante-crud.service';
import { CardapioCrudService } from '../../../../cardapio/services/cardapio-crud.service';
import { TitemCrudService } from '../../../../titem/services/titem-crud.service';


import { LoginService } from '../../../../../../../my-core/services/login.service';

import { IHotel } from '../../../../hotel/interfaces/i-hotel';
import { IRestaurante } from '../../../../restaurante/interfaces/i-restaurante';
import { ICardapio } from '../../../../cardapio/interfaces/i-cardapio';
import { UnidadeMedidaEnum } from '../../../enums/unidade-medida-enum';
import { ITitem } from '../../../../titem/interfaces/i-titem';



@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.scss']
})
export class ListarComponent implements OnInit {

  displayedColumns: string[] = ['id', 'nomePt', 'nomeIng', 'nomeFr','descPt','descIng','descFr','preco','quantidade', 'unidadeMedida', 'tipoItem', 'activo', 'acoes'];
  ELEMENT_DATA: IItem[] = [];

  dataSource = new  MatTableDataSource(this.ELEMENT_DATA);

  erroMsg?: string;
  haErroMsg: boolean = false;
  requestCompleto = false;

  carregando: boolean = false;

  //PAGINAÇÃO
  mypages?: MyPages;

  totalElements: number =0;
  sizeInicial: number =20;
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

  //CARDAPIO
  cardapios: ICardapio[] = [];

  //T. ITEM
  titens: ITitem[] = [];


  myEnumUnidadeMedida: typeof UnidadeMedidaEnum = UnidadeMedidaEnum;


  //ID DO USER LOGADO
  readonly USERID = this.loginService.getLoggedInID();


  constructor(
    private formBuilder: FormBuilder,
    private router: Router,

    private itemCrudService: ItemCrudService,
    private titemCrudService: TitemCrudService,
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
    cardapio: [null, Validators.required],
    titem: ["Todos", Validators.required],
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
    //this.inicializarTitens();
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
          this.formPesquisa.value.restaurante = null;// = undefined;
        },
        error => {
          this.restaurantes = [];
        }
      );
    }

    //INICIALIZAR CARDAPIOS
    inicializarCardapios(): void{
      //console.log("COMPONENTE CRIAR/ALTERAR - IDUSER: ", this.USERID);
      this.cardapioCrudService.findByActivoAndHotelIdOrderByNomePt(true, this.formPesquisa.value.hotel).subscribe(
        success => {
          this.cardapios = success._embedded.cardapios;

        },
        error => {
          this.cardapios = [];
        }
      );
    }

    //INICIALIZAR CARDAPIOS
    inicializarTitens(): void{
      //console.log("COMPONENTE CRIAR/ALTERAR - IDUSER: ", this.USERID);
      this.titemCrudService.findDistinctNomeByActivoAndItensHotelIdOrderByNome(true, this.formPesquisa.value.hotel).subscribe(
        success => {
          this.titens = success._embedded.tipoitens;
        },
        error => {
          this.titens = [];
        }
      );
    }




    //CARREGA LISTA
    readAll() {

      //console.log("RESTAURANTE OBJ ",this.getOpcao.value);

      this.carregando = true;

      let myObservablePesquisa$: Observable<IResponsePageableItem> = this.selecionar_pesquisa();

      myObservablePesquisa$.subscribe(
        (data: IResponsePageableItem) => {
          console.log('COMPONENTE LISTAR - Foi lido os seguintes dados, TITEM: ', data._embedded.itens);
          this.dataSource = new  MatTableDataSource(this.atualizarTipoItemNome(data._embedded.itens));
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

    atualizarTipoItemNome(list: IItem[]): IItem[]{

      for(let i = 0; i < list.length; i++){
        let item: IItem = list[i];

        this.titemCrudService.getDataByURL(item._links.tipoItem.href).subscribe(
          (data: ITitem) => {

            item.nometipoItem=data.nome;

            list[i] = item;

          },
          error => {
            console.error('atualizarTipoItemNome TITEM - ERROR: ', error);
          }
        );
        //item._links.tipoItem.href
      }

      return list

    }


     //Devolve o tipo de pesquisa consoante select do formulario
  selecionar_pesquisa(): Observable<IResponsePageableItem>{


    //PAGINAÇÃO
    let pageIndex = this.pageEvent? this.pageEvent.pageIndex: 0;
    let pageSize = this.pageEvent? this.pageEvent.pageSize: this.sizeInicial;

    //SORT
    this.sort = this.sortEvent? this.sortEvent.active : "id";
    this.direccaoOrdem = this.sortEvent? this.sortEvent.direction : "desc";

    let myObservablePesquisa$: Observable<IResponsePageableItem>;//commentar

    myObservablePesquisa$ = this.itemCrudService.findAll(pageIndex, pageSize, this.sort, this.direccaoOrdem);

    console.log("selecionar_pesquisa opcao-- ", this.formPesquisa.value.opcao);
    console.log("selecionar_pesquisa texto-- ", this.formPesquisa.value.texto);
    console.log("selecionar_pesquisa activo-- ", this.formPesquisa.value.activo);

/*

    if(this.formPesquisa.value.opcao === "NomePT" && this.formPesquisa.value.texto && this.submitted){
      myObservablePesquisa$ = this.cardapioCrudService.findByNomePtContainingIgnoreCaseAndActivoAndHotelIdAndRestauranteCardapioRestauranteId(this.formPesquisa.value.texto, this.formPesquisa.value.activo, this.formPesquisa.value.hotel, this.formPesquisa.value.restaurante, pageIndex, pageSize, this.sort, this.direccaoOrdem);
    }

    else if(this.formPesquisa.value.opcao === "NomeING" && this.formPesquisa.value.texto && this.submitted){
      myObservablePesquisa$ = this.cardapioCrudService.findByNomeIngContainingIgnoreCaseAndActivoAndHotelIdAndRestauranteCardapioRestauranteId(this.formPesquisa.value.texto, this.formPesquisa.value.activo, this.formPesquisa.value.hotel, this.formPesquisa.value.restaurante, pageIndex, pageSize, this.sort, this.direccaoOrdem);
    }

    else if(this.formPesquisa.value.opcao === "NomeFR" && this.formPesquisa.value.texto && this.submitted){
      myObservablePesquisa$ = this.cardapioCrudService.findByNomeFrContainingIgnoreCaseAndActivoAndHotelIdAndRestauranteCardapioRestauranteId(this.formPesquisa.value.texto, this.formPesquisa.value.activo, this.formPesquisa.value.hotel, this.formPesquisa.value.restaurante, pageIndex, pageSize, this.sort, this.direccaoOrdem);
    }

    else if(this.formPesquisa.value.opcao === "Codigo" && this.formPesquisa.value.texto && this.submitted){
      myObservablePesquisa$ = this.cardapioCrudService.findByCodigoReduzidoContainingIgnoreCaseAndActivoAndHotelIdAndRestauranteCardapioRestauranteId(this.formPesquisa.value.texto, this.formPesquisa.value.activo, this.formPesquisa.value.hotel, this.formPesquisa.value.restaurante, pageIndex, pageSize, this.sort, this.direccaoOrdem);
    }

    else if(this.formPesquisa.value.opcao === "Todos" && this.submitted){
      myObservablePesquisa$ = this.cardapioCrudService.findByActivoAndHotelIdAndRestauranteCardapioRestauranteId(this.formPesquisa.value.activo, this.formPesquisa.value.hotel, this.formPesquisa.value.restaurante, pageIndex, pageSize, this.sort, this.direccaoOrdem);
    }

    else if(this.submitted){
      myObservablePesquisa$ = this.cardapioCrudService.findByActivoAndHotelIdAndRestauranteCardapioRestauranteId(this.formPesquisa.value.activo, this.formPesquisa.value.hotel, this.formPesquisa.value.restaurante, pageIndex, pageSize, this.sort, this.direccaoOrdem);
    }

    else */
    if(this.ON_CHANCHE_CARDAPIO && this.formPesquisa.value.cardapio){
      myObservablePesquisa$ = this.itemCrudService.findByHotelIdAndItemCardapioCardapioId(this.formPesquisa.value.hotel, this.formPesquisa.value.cardapio, pageIndex, pageSize, this.sort, this.direccaoOrdem);
    }

    else{
      myObservablePesquisa$ = this.itemCrudService.findByHotelUsersId(this.USERID, pageIndex, pageSize, this.sort, this.direccaoOrdem);
    }

    return myObservablePesquisa$;


}


  //ON_CHANCHE_HOTEL
  disabledBotaoPesquisa: boolean = true;
  ON_CHANCHE_CARDAPIO: boolean = false;

  selectHotelChange(){

    if(this.formPesquisa.value.hotel){
      this.inicializarRestaurantes();
      this.inicializarCardapios();
      this.inicializarTitens();

      this.mudarEstadoBotaoPesquisa();
    }else{
      this.restaurantes = [];
      this.disabledBotaoPesquisa = true; //desactivar
    }

  }

  selectRestauranteChange(){

    if(this.formPesquisa.value.restaurante){
      this.inicializarCardapios();
      this.mudarEstadoBotaoPesquisa();

    }else{
      this.cardapios = [];
      this.disabledBotaoPesquisa = true; //desactivar
    }


  }

  selectCardapioChange(){

    this.ON_CHANCHE_CARDAPIO = true;

    if(this.formPesquisa.value.cardapio){
      this.mudarEstadoBotaoPesquisa();
      this.readAll();
    }else{
      this.disabledBotaoPesquisa = true; //desactivar
    }

    this.ON_CHANCHE_CARDAPIO = false;

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
  editarEntety(row: IItem) {
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
  verEntety(row: IItem) {
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
  deleteEntetyDialgo(row: IItem) {

    let dialogRef$ = this.dialogService.confirmDialog(
      {
        title: "Remover Item?",
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

  deleteEntety(row: IItem){

    this.itemCrudService.deleteData(row.id).subscribe(
          success => {
                this.dialogService.openSnack_botao_tempo_css("Sucesso Delete Item", "X", 6000, "green-snackbar");

                this.redirectTo('/oa-admin/gestao/entidades/item/listar');
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
                console.log('DELETE ITEM completo');
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

  get getCardapio(): any {
    return this.formPesquisa?.get('cardapio');
  }



  limparPesquisa() {
    this.submitted = false;
    this.formPesquisa.reset();
  }

}
