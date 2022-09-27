import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';

import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Observable, zip } from 'rxjs';

import { ItemCrudService } from '../../../services/item-crud.service';

import { LoginService } from '../../../../../../../my-core/services/login.service';
import { HotelCrudService } from '../../../../hotel/services/hotel-crud.service';
import { TitemCrudService } from '../../../../titem/services/titem-crud.service';

import { DialogService } from '../../../../../../../my-core/services/dialog.service';

import { MatSnackBar } from '@angular/material/snack-bar';
import { IItem } from '../../../interfaces/i-item';
import { UnidadeMedidaEnum } from '../../../enums/unidade-medida-enum';

import { IHotel } from '../../../../hotel/interfaces/i-hotel';
import { ITitem } from '../../../../titem/interfaces/i-titem';
import { IReqItem } from '../../../interfaces/i-req-item';
import { IFormCanDesactivate } from '../../../../../../../my-shared/interfaces-shared/iform-can-desactivate';




@Component({
  selector: 'app-criaralterar',
  templateUrl: './criaralterar.component.html',
  styleUrls: ['./criaralterar.component.scss']
})
export class CriaralterarComponent implements OnInit, IFormCanDesactivate {

  //DADOS HOTEIS
  disableHoteis = false;
  hoteis: IHotel[] = [];
  hotelID:number | undefined;

  //DADOS TIPOITENS
  disableTipoItens = false;
  tipoItens: ITitem[] = [];
  tipoItemID:number | undefined;

  //Variavel que representa o Enum: UnidadeMedidaEnum
  eUnidadesMedida = UnidadeMedidaEnum;

  //ID DO USER LOGADO
  readonly USERID = this.loginService.getLoggedInID();


  //VARIAVEIS para controlo
   submitted = false;
   erroMsg?: string;
   hasErroMsg: boolean = false;
   requestCompleto = false;
   accao: string = "Criar";

  //CRIAR FORMULARIO
  formItem: FormGroup = this.formBuilder.group({});

  constructor(
    private formBuilder: FormBuilder,
    private itemCrudService: ItemCrudService,
    private route: ActivatedRoute,
    private _snackBar: MatSnackBar,
    private loginService: LoginService,
    private hotelCrudService: HotelCrudService,
    private titemCrudService: TitemCrudService,
    private router: Router,
    private dialogService: DialogService
  ) {}


   ngOnInit(): void {

    console.log("COMPONENTE CRIAR/ALTERAR: ngOnInit ===============================");

     this.preencherFormulario();
     this.inicializarHoteis();
     this.inicializarTipoItens();

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

   //INICIALIZAR TIPO ITENS
   inicializarTipoItens(): void{
    //let idhotel = this.formItem?.get('hotel')?.value;
    //if(idhotel != null){ }
    this.titemCrudService.findByActivoOrderByNome(true).subscribe(
      success => {
        this.tipoItens = success._embedded.tipoitens;
      },
      error => {
        this.tipoItens = [];
      }
    );
   }

   preencherFormulario(): void {

     //LER DADOS URL: SABER ID e ACCAO
     this.route.params.subscribe((params: any) =>{

       console.log("COMPONENTE CRIAR/ALTERAR - PARAMS URL",params);

       const id = params['id'];

       if(id){
        this.preencherFormularioUpdate(id);
       }else{
         this.preencherFormularioCreate();
       }

     });

   }


   //INCIALIZAR FORM COM DADOS DE OBJECTO
   preencherFormularioCreate(): void {

    this.accao="Criar";
    console.log("COMPONENTE CRIAR/ALTERAR - ACCAO: ", this.accao);
    //this.novoItemReq?.fotoPath = "...";

    this.incializarFormItem();

   }


   //CARREGAR FORM COM DADOS DE OBJECTO
   preencherFormularioUpdate(id: number): void {

    console.log("CRIAR/ALTERAR ITEM - preencherFormularioUpdate");

    this.incializarFormItem();

    this.itemCrudService.findById(id).subscribe(


      item => {
        console.log("CRIAR/ALTERAR ITEM: ",item);
        this.updateFormFromOBJ(item)
      },
      error => {
        alert(error);
      }


      );
    //SABER ACCAO
    this.route.url.subscribe((url: any) =>{
      console.log("URL: ",url);
      url.forEach((value: {path: any}) =>{
        if(value.path=="ver"){
          this.accao="Ver";
          console.log("ACCAO: ", this.accao);
        }
        if(value.path=="editar"){
          this.accao="Editar";
          console.log("ACCAO: ", this.accao);
        }
      } )
    });

  }

   incializarFormItem(): void {
    this.formItem = this.formBuilder.group({

      id: [null],

      nomePt: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(10)]],
      nomeIng: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(10)]],
      nomeFr: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(10)]],
      activo: [null],
      fotoPath: ["..."],
      descPt: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(10)]],
      descFr: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(10)]],
      descIng: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(10)]],
      preco: [null],
      quantidade: [null],
      unidadeMedidaEnum: [null, Validators.required],
      idUser: [this.USERID, Validators.required],
      tipoItem: [{value: null,  disabled: this.disableTipoItens}, Validators.required],
      hotel: [{value: null,  disabled: this.disableHoteis}, Validators.required],
    });
  }








  //METODO AUX CARREGAR FORM COM DADOS DE OBJECTO
  updateFormFromOBJ(item: IItem): void{

    this.incializarFormItem();



    let link: any = item._links ;

    let getTipoItemFromItem$: Observable<ITitem>  = this.titemCrudService.getDataByURL(link.tipoItem.href);

    let getHotelFromItem$: Observable<IHotel>  = this.hotelCrudService.getDataByURL(link.hotel.href);

    //Juntar os pedidos de forma a aguardar a conclusão dos mesmos
    const example = zip(
      getTipoItemFromItem$,
      getHotelFromItem$

    );

    example.subscribe(val => {
      this.formItem?.patchValue({

        id: item.id,
        nomePt: item.nomePt,
        nomeIng: item.nomeIng,
        nomeFr: item.nomeFr,
        activo: item.activo,
        fotoPath: item.fotoPath,
        descPt: item.descPt,
        descFr: item.descFr,
        descIng: item.descIng,
        preco: item.preco,
        quantidade:item.quantidade,
        unidadeMedidaEnum: item.unidadeMedidaEnum,
        idUser: item.log.idUserAlteracao,
        tipoItem: val[0].id, //Val[0], corresponde a conclusão do primeiro pedido, getTipoItemFromItem
        hotel: val[1].id, //Val[1], corresponde a conclusão do segundo pedido, getHotelFromItem

       });

    });













  }







   //ONSUBMIT
   onSubmit() {
     this.submitted = true;
     // aqui você pode implementar a logica para fazer seu formulário salvar
     console.log("ONSUBMIT ITEM -------", this.formItem?.value);

     //FORM COM DADOS VALIDOS
     if(this.formItem?.valid){


       //FAZER UPDATE TCONJUNTO -------
       if(this.formItem.value.id){

        console.log("ONSUBMIT UPDATE ITEM");

        console.log("crearObjecto", this.crearObjectoFromFROM());

         this.itemCrudService.updateItemFromIReqItem(this.crearObjectoFromFROM()).subscribe(
           success => {
             this.hasErroMsg = false;
             this.msgSnackBar("ITEM update");
             console.log('UPDATE ITEM: sucesso', success);
             this.router.navigate(['/oa-admin/gestao/entidades/item/listar']);
           },
           error => {
             this.hasErroMsg = true;
             this.erroMsg = "UPDATE ITEM: Erro no Update Item \n"+error;
             this.requestCompleto = false;
             console.log(this.erroMsg);
             alert(this.erroMsg);
           },

           () => {
             console.log('UPDATE ITEM: request completo');
             this.requestCompleto = true;
           }
         );


        /*
         console.log("ONSUBMIT UPDATE TCONJUNTO", this.updateObjectoFromFORM());


         this.tipoconjuntoCrudService.updateData(this.formConjunto.value.id, this.updateObjectoFromFORM()).subscribe(
           success => {
             this.haErroMsg = false;
             this.msgSnackBar("Tipo Conjunto atualizado com sucesso");
             console.log('UPDATE TCONJUNTO: sucesso');
             this.router.navigate(['/oa-admin/gestao/tconjunto/listar']);
           },
           error => {
             this.haErroMsg = true;
             this.erroMsg = "UPDATE TCONJUNTO: Erro no Update Tipo Conjunto \n"+error;
             this.requestCompleto = false;
             console.log(this.erroMsg);
             alert(this.erroMsg);
           },
           () => {
             console.log('UPDATE TCONJUNTO: request completo');
             this.requestCompleto = true;
           }
         );

         // Usar o método reset para limpar os controles na tela
         //this.formConjunto.reset(new TipoConjunto());
         */

       //CRIAR TCONJUNTO ----------
       }else{

        console.log("ONSUBMIT CREATE ITEM");

         console.log("crearObjecto", this.crearObjectoFromFROM());

         this.itemCrudService.createItemFromIReqItem(this.crearObjectoFromFROM()).subscribe(
           success => {
             this.hasErroMsg = false;
             this.msgSnackBar("ITEM criado");
             console.log('CRIADO ITEM: sucesso');
             this.router.navigate(['/oa-admin/gestao/entidades/item/listar']);
           },
           error => {
             this.hasErroMsg = true;
             this.erroMsg = "CRIADO ITEM: Erro no Create Item \n"+error;
             this.requestCompleto = false;
             console.log(this.erroMsg);
             alert(this.erroMsg);
           },

           () => {
             console.log('CRIAR ITEM: request completo');
             this.requestCompleto = true;
           }
         );



         // Usar o método reset para limpar os controles na tela
         //this.formConjunto.reset(new TipoConjunto());

       }



     //FORM INVALIDO
     } else {

       this.hasErroMsg = true;
       this.erroMsg = "formulario invalido";
       this.requestCompleto = false;
       console.log(this.erroMsg);

       //Quando o formulario não é valido obriga marcar os campos para aparecer o erro
       if(this.formItem)
        this.verificaValidacoesForm(this.formItem);
     }
   }



   //CRIAR OBJECTO COM OS DADOS DE FORMULARIO, S/ ID, PARA SER ENVIADO NO PEDIDO
   crearObjectoFromFROM(): IReqItem{
     //let API_URL = environment.API;
     return {
      "id": this.formItem?.value.id,

      "nomePt": this.formItem?.value.nomePt,

       "nomeIng": this.formItem?.value.nomeIng,
       "nomeFr": this.formItem?.value.nomeFr,

       "activo": this.formItem?.value.activo,

       "fotoPath": this.formItem?.value.fotoPath,
       "descPt": this.formItem?.value.descPt,
       "descFr": this.formItem?.value.descFr,
       "descIng": this.formItem?.value.descIng,

       "preco": this.formItem?.value.preco,
       "quantidade": this.formItem?.value.quantidade,
       "unidadeMedidaEnum": this.formItem?.value.unidadeMedidaEnum,

       "idUser": this.formItem?.value.idUser,
       "tipoItem": "/tipoitens/"+this.formItem?.value.tipoItem,
       "hotel": "/hotels/"+this.formItem?.value.hotel,
     }
   }

   //CRIAR OBJECTO COM OS DADOS DE FORMULARIO, C/ ID, PARA SER ENVIADO NO PEDIDO
   updateObjectoFromFORM(): IReqItem{
     //let API_URL = environment.API;
     return {
       "id": this.formItem?.value.id,
       "nomePt": this.formItem?.value.nomePt,
       "nomeIng": this.formItem?.value.nomeIng,
       "nomeFr": this.formItem?.value.nomeFr,

       "activo": this.formItem?.value.activo,

       "fotoPath": this.formItem?.value.fotoPath,
       "descPt": this.formItem?.value.descPt,
       "descFr": this.formItem?.value.descFr,
       "descIng": this.formItem?.value.descIng,

       "preco": this.formItem?.value.preco,
       "quantidade": this.formItem?.value.quantidade,
       "unidadeMedidaEnum": this.formItem?.value.unidadeMedidaEnum,

       "idUser": this.formItem?.value.idUser,
       "tipoItem": "/tipoitens/"+this.formItem?.value.tipoItem,
       "hotel": "/hotels/"+this.formItem?.value.hotel,
     }
   }

   //RESET FORMULARIO
   onCancel() {
     this.submitted = false;
    // this.formItem.reset(new TipoConjunto());
     console.log('onCancel')
   }

   //METODO USADO PARA OBRIGAR A VALIDAÇÃO DOS CAMPOS QD CLICAMOS EM GUARDAR
   verificaValidacoesForm(formGroup: FormGroup){
     Object.keys(formGroup.controls).forEach(campo => {
       //console.log(campo);
       const controle = formGroup.get(campo);
       controle?.markAsDirty(); //obriga os campos a serem validados (marca o campo como "sujo")
       if(controle instanceof FormGroup){
         this.verificaValidacoesForm(controle);
       }
       if(controle instanceof FormArray){
        controle.controls.forEach(c => {
          if(c instanceof FormGroup){
            this.verificaValidacoesForm(c);
          }
        });
      }


     });
   }

   //POP MENSAGEM
   msgSnackBar(mensagem: string) {
     this._snackBar.open(mensagem, 'Ok', {
       horizontalPosition: 'end',
       verticalPosition: 'top',
       duration: 3000
     });
   }

   //DIALOG CONFIRMACAO =======================

   //Ex01
   yesNoDialog(){

      const snack = this.dialogService.openSnack_botao("alerta", "Fechar");

      let dialogRef$ = this.dialogService.confirmDialog(
        {
          title: "Title",
          message: "Messagem Messagem",
          confirmText: "Yes",
          cancelText: "No",
        }
      );

      dialogRef$.subscribe(result => {
        console.log("Dialog result: ", result);

        if(result){
          snack.dismiss();
        }

      });

   }

   // S/ Observable
   //Ex02
    yesNoDialog2(){
      let dialogRef = this.dialogService.confirmDialog2(
        {
          title: "Title",
          message: "Messagem Messagem",
          confirmText: "Yes",
          cancelText: "No",
        }
      );

      dialogRef.updateSize('300vw','300vw');

      dialogRef.afterClosed().subscribe(result => {
        console.log("Dialog result: ", result);
      });


      let snackBarRef = this.dialogService.openSnack_botao("SnackRef Exemplo","Fechar");

      snackBarRef.afterDismissed().subscribe(() => {
        console.log('The snackbar was dismissed');
      });

      snackBarRef.onAction().subscribe(() => {
        console.log('The snackbar action was triggered!');
      });

      //snackBarRef.dismiss();
   }


   confirmCancelDialog(){
      let dialogRef$ = this.dialogService.confirmDialog(
        {
          title: "Title",
          message: "Messagem Messagem",
          confirmText: "Confirm",
          cancelText: "Cancel",
        }
      );

      dialogRef$.subscribe(result => {
        console.log("Dialog result: ", result);
      });

   }
   yesNoSure(){
      let dialogRef$ = this.dialogService.confirmDialog(
        {
          title: "Title",
          message: "Messagem Messagem",
          confirmText: "Yes",
          cancelText: "No Sure",
        }
      );

      dialogRef$.subscribe(result => {
        console.log("Dialog result: ", result);
      });

   }

   alertDialog(){
      let dialogRef$ = this.dialogService.alertDialog(
        {
          message: "Messagem Messagem",
          buttonText: "OK",
        }
      );

      dialogRef$.subscribe(result => {
        console.log("Alert Dialog result: ", result);
      });

   }

   alertDialog2(){
      let dialogRef = this.dialogService.alertDialog2(
        {
          message: "Messagem Messagem",
          buttonText: "OK",
        }
      );

      dialogRef.updateSize('300vw','300vw');

      dialogRef.afterClosed().subscribe(result => {
        console.log("Dialog result: ", result);
      });

 }

   // S/ Observable

   //===================

   verificaValidTouched(campo: string){
     return !this.formItem?.get(campo)?.valid && (this.formItem?.get(campo)?.touched || this.formItem?.get(campo)?.dirty);
   }




   //formModouCanDeactive
  podeDesativar() {

    if(this.formItem)
      if(this.verificaPodeDesativarForm(this.formItem)) {

        if (confirm('Tem certeza que deseja sair dessa página?')) {
          return true;
        } else {
          return false;
        }
      }

    return true;
  }


  verificaPodeDesativarForm(formGroup: FormGroup): Boolean{
    let podeDesativar: Boolean = false;

    Object.keys(formGroup.controls).forEach(campo => {
      //console.log(campo);
      const controle = formGroup.get(campo);
      if (controle?.touched || controle?.dirty) {
        podeDesativar = true;
      }

      if(controle instanceof FormGroup){
        this.verificaPodeDesativarForm(controle);
      }
      if(controle instanceof FormArray){
        controle.controls.forEach(c => {
          if(c instanceof FormGroup){
            this.verificaPodeDesativarForm(c);
          }
        });
      }
    });

    return podeDesativar;
  }

    //METODOS GETs
    get getNomePt(): any {
      return this.formItem?.get('nomePt');
    }
    get getNomeIng(): any {
      return this.formItem?.get('nomeIng');
    }
    get getNomeFr(): any {
      return this.formItem?.get('nomeFr');
    }

    get getActivo(): any {
      return this.formItem?.get('activo');
    }
    get getFotoPath(): any {
      return this.formItem?.get('fotoPath');
    }
    get getDescPt(): any {
      return this.formItem?.get('descPt');
    }
    get getDescIng(): any {
      return this.formItem?.get('descIng');
    }
    get getDescFr(): any {
      return this.formItem?.get('descFr');
    }
    get getPreco(): any {
      return this.formItem?.get('preco');
    }
    get getQuantidade(): any {
      return this.formItem?.get('quantidade');
    }
    get getUnidadeMedidaEnum(): any {
      return this.formItem?.get('unidadeMedidaEnum');
    }
    get getIdUser(): any {
      return this.formItem?.get('idUser');
    }
    get getTipoItem(): any {
      return this.formItem?.get('tipoItem');
    }
    get getHotel(): any {
      return this.formItem?.get('hotel');
    }


}
