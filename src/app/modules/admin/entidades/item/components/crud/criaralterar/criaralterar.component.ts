import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ItemCrudService } from '../../../services/item-crud.service';

import { MatSnackBar } from '@angular/material/snack-bar';
import { IItem } from '../../../interfaces/i-item';
import { UnidadeMedidaEnum } from '../../../enums/unidade-medida-enum';
import { LoginService } from '../../../../../../../my-core/services/login.service';
import { HotelCrudService } from '../../../../hotel/services/hotel-crud.service';
import { TitemCrudService } from '../../../../titem/services/titem-crud.service';
import { IHotel } from '../../../../hotel/interfaces/i-hotel';
import { ITitem } from '../../../../titem/interfaces/i-titem';
import { IReqItem } from '../../../interfaces/i-req-item';


@Component({
  selector: 'app-criaralterar',
  templateUrl: './criaralterar.component.html',
  styleUrls: ['./criaralterar.component.scss']
})
export class CriaralterarComponent implements OnInit {

  disableHoteis = false;
  hoteis: IHotel[] = [];

  disableTipoItens = false;
  tipoItens: ITitem[] = [];

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
    private route: ActivatedRoute,
    private itemCrudService: ItemCrudService,
    private _snackBar: MatSnackBar,
    private loginService: LoginService,
    private hotelCrudService: HotelCrudService,
    private titemCrudService: TitemCrudService,
    private router: Router
  ) {}


   ngOnInit(): void {

     this.preencherFormulario();
     this.inicializarHoteis();
     this.inicializarTipoItens();

   }

   inicializarHoteis(): void{
    console.log("IDUSER: ", this.USERID);
    this.hotelCrudService.findByActivoAndUsersIdOrderByNome(true, Number(this.USERID)).subscribe(
      success => {
        this.hoteis = success._embedded.hoteis;
      },
      error => {
        this.hoteis = [];
      }
    );

   }

   inicializarTipoItens(): void{
    //let idhotel = this.formItem?.get('hotel')?.value;
    //if(idhotel != null){ }
    this.titemCrudService.findByActivoOrderByNomeLIST(true).subscribe(
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
       //console.log(params);
       const id = params['id'];
       if(id){
        this.preencherFormularioUpdate(id);
       }else{
         this.preencherFormularioCreate();
       }
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





   //INCIALIZAR FORM COM DADOS DE OBJECTO
   preencherFormularioCreate(): void {

    this.accao="Criar";
    console.log("ACCAO: ", this.accao);
    //this.novoItemReq?.fotoPath = "...";

    this.incializarFormItem();

   }


   //CARREGAR FORM COM DADOS DE OBJECTO
   preencherFormularioUpdate(id: number): void {

    const item$ = this.itemCrudService.getData(id);
    item$.subscribe(item => {
      console.log("CRIAR/ALTERAR ITEM: ",item);
      this.updateFormFromOBJ(item)
    });
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

  //METODO AUX CARREGAR FORM COM DADOS DE OBJECTO
  updateFormFromOBJ(item: IItem): void{

    this.incializarFormItem();

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
     tipoItem: 1, //fazer metodo para devolver ID ITEM
     hotel: 1, //fazer metodo para devolver ID HOTEL

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

   verificaValidTouched(campo: string){
     return !this.formItem?.get(campo)?.valid && (this.formItem?.get(campo)?.touched || this.formItem?.get(campo)?.dirty);
   }


}
