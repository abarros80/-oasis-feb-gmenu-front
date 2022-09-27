import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { MatSort, Sort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import {MatTableDataSource} from '@angular/material/table';
import { PageEvent } from '@angular/material/paginator';


import { IHotel } from '../../../interfaces/i-hotel';
import { MyPages } from '../../../../../../../my-shared/interfaces-shared/my-pages';

import { DialogService } from '../../../../../../../my-core/services/dialog.service';
import { HotelCrudService } from '../../../services/hotel-crud.service';
import { IResponsePageableHotel } from '../../../interfaces/i-response-pageable-hotel';
import { CriaralterarComponent } from '../criaralterar/criaralterar.component';
import { DetalheComponent } from '../detalhe/detalhe.component';



@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.scss']
})
export class ListarComponent implements OnInit {

  displayedColumns: string[] = ['id', 'nome', 'telefone', 'email', 'activo', 'acoes'];
  ELEMENT_DATA: IHotel[] = [];

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

  // CONTROLO POP_UP
  isPopupOpened = true;

  //CRIAR FORMULARIO PESQUISA
  formPesquisa: FormGroup = this.formBuilder.group({
    opcao: [null],
    texto: [null],
    activo: [true]
  });




  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private hotelCrudService: HotelCrudService,
    private dialogService: DialogService,
    private dialog: MatDialog) { }



  //DIALOG EDITAR
  editarHotel(row: IHotel) {
          this.isPopupOpened = true;
          //const contact = this._contactService.getAllContacts().find(c => c.ID === id);
          const dialogRef = this.dialog.open(CriaralterarComponent, {
            data: row,
            maxWidth: '70vw',
            maxHeight: '80vh',
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
  verHotel(row: IHotel) {
        this.isPopupOpened = true;

        const dialogRef = this.dialog.open(DetalheComponent, {
          data: row,
          maxWidth: '70vw',
          maxHeight: '80vh',
        });

        //ACCAO DEPOIS DE FECHAR DIALOG
        dialogRef.afterClosed().subscribe(
          result => {
              this.isPopupOpened = false;
          }
        );
  }


  //DIALOG CONFIRM DELETE
  deleteHotelDialgo(row: IHotel) {

        let dialogRef$ = this.dialogService.confirmDialog(
          {
            title: "Remover Hotel?",
            message: "Nome: "+row.nome,
            confirmText: "Sim",
            cancelText: "Não",
          }
        );

        dialogRef$.subscribe(result => {
          console.log("Dialog result: ", result);

          if(result){
                this.deleteHotel(row);
          }
        });
  }

  deleteHotel(row: IHotel){

        this.hotelCrudService.deleteData(row.id).subscribe(
              success => {
                    this.dialogService.openSnack_botao_tempo_css("Sucesso Delete Hotel", "X", 6000, "green-snackbar");

                    this.redirectTo('/oa-admin/gestao/entidades/hotel/listar');
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
                    console.log('DELETE HOTEL completo');
                    this.requestCompleto = true;
              }
        );


    //this.dialogService.openSnack_botao_tempo_css("Sucesso delete hotel "+row.nome, "X", 6000, "green-snackbar");

    //this.dialogService.openSnack_botao_tempo_css("Erro no delete","X", 3000, "red-snackbar")

  }

  //ON_INIT
  ngOnInit(): void {
    this.readAll();
  }


  //CARREGA LISTA
  readAll() {

    console.log("HOTEL OBJ ",this.getOpcao.value);

        this.carregando = true;

        let myObservablePesquisa$: Observable<IResponsePageableHotel> = this.selecionar_pesquisa();

        myObservablePesquisa$.subscribe(
          (data: IResponsePageableHotel) => {
            console.log('COMPONENTE LISTAR - Foi lido os seguintes dados, HOTEL: ', data._embedded.hoteis);
            this.dataSource = new  MatTableDataSource(data._embedded.hoteis);
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
  selecionar_pesquisa(): Observable<IResponsePageableHotel>{


    //PAGINAÇÃO
    let pageIndex = this.pageEvent? this.pageEvent.pageIndex: 0;
    let pageSize = this.pageEvent? this.pageEvent.pageSize: this.sizeInicial;

    //SORT
    this.sort = this.sortEvent? this.sortEvent.active : "nomePt";
    this.direccaoOrdem = this.sortEvent? this.sortEvent.direction : "asc";

    let myObservablePesquisa$: Observable<IResponsePageableHotel>;//commentar

    myObservablePesquisa$ = this.hotelCrudService.findAll(pageIndex, pageSize, this.sort, this.direccaoOrdem);

    console.log("selecionar_pesquisa -- ", this.formPesquisa.value.opcao);
    console.log("selecionar_pesquisa -- ", this.formPesquisa.value.texto);
    console.log("selecionar_pesquisa -- ", this.formPesquisa.value.activo);

    if(this.formPesquisa.value.opcao === "Nome" && this.formPesquisa.value.texto && this.submitted){
      myObservablePesquisa$ = this.hotelCrudService.findByNomeContainingIgnoreCaseAndActivoOrderByNome(this.formPesquisa.value.texto, this.formPesquisa.value.activo, pageIndex, pageSize, this.sort, this.direccaoOrdem)
    }else
    if(this.formPesquisa.value.opcao === "Telefone" && this.formPesquisa.value.texto && this.submitted){
      myObservablePesquisa$ = this.hotelCrudService.findByTelefoneContainingIgnoreCaseAndActivoOrderByNome(this.formPesquisa.value.texto, this.formPesquisa.value.activo, pageIndex, pageSize, this.sort, this.direccaoOrdem)
    }else
    if(this.formPesquisa.value.opcao === "Email" && this.formPesquisa.value.texto && this.submitted){
      myObservablePesquisa$ = this.hotelCrudService.findByEmailContainingIgnoreCaseAndActivoOrderByNome(this.formPesquisa.value.texto, this.formPesquisa.value.activo, pageIndex, pageSize, this.sort, this.direccaoOrdem)
    }else
    if(this.formPesquisa.value.opcao === "Todos" && this.submitted){
      myObservablePesquisa$ = this.hotelCrudService.findByActivoOrderByNome(this.formPesquisa.value.activo, pageIndex, pageSize, this.sort, this.direccaoOrdem)
    }else if(this.submitted){
      myObservablePesquisa$ = this.hotelCrudService.findByActivoOrderByNome(this.formPesquisa.value.activo, pageIndex, pageSize, this.sort, this.direccaoOrdem);
    }else{
      myObservablePesquisa$ = this.hotelCrudService.findAll(pageIndex, pageSize, this.sort, this.direccaoOrdem);
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

  disabledBotaoPesquisa: boolean = true;
  //ON_CHANCHE_HOTEL: boolean = false;

  mudarEstadoBotaoPesquisa(){

    if(this.formPesquisa.value.opcao === "Todos")
      this.disabledBotaoPesquisa = false; //activar
    else if(this.formPesquisa.value.opcao && this.formPesquisa.value.texto){
      this.disabledBotaoPesquisa = false; //activar
    }else {
      this.disabledBotaoPesquisa = true; //desactivar
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
        this.disabledBotaoPesquisa = true; //desactivar
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
