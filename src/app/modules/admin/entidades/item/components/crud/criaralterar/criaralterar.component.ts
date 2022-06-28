import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';

import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

import { IReqItem } from '../../../interfaces/i-req-item';
import { ItemCrudService } from '../../../services/item-crud.service';

import { MatSnackBar } from '@angular/material/snack-bar';
import { IItem } from '../../../interfaces/i-item';
import { UnidadeMedidaEnum } from '../../../enums/unidade-medida-enum';
import { LoginService } from '../../../../../../../my-core/services/login.service';

interface Hotel {
  id: number;
  nome: string;
}

interface TipoItem {
  id: number;
  nome: string;
}


@Component({
  selector: 'app-criaralterar',
  templateUrl: './criaralterar.component.html',
  styleUrls: ['./criaralterar.component.scss']
})
export class CriaralterarComponent implements OnInit {


  disableHoteis = false;
  hoteisControl = new FormControl(null, Validators.required);
  hoteis: Hotel[] = [
    {id: 1, nome: 'Porto Grande'},
    {id: 2, nome: 'Praiamar'},
    {id: 3, nome: 'Belorizonte'},
    {id: 4, nome: 'Salinas Sea'},
  ];

  disableTipoItems = false;
  tipoItemsControl = new FormControl(null, Validators.required);
  tipoItems: TipoItem[] = [
    {id: 1, nome: 'Kalimba'},
    {id: 2, nome: 'Restaurante'},
    {id: 3, nome: 'Lobby'},
  ];

  // Make a variable reference to our Enum
  eUnidadesMedida = UnidadeMedidaEnum;


   //OBJECTO QUE REPRESENTA O FORMULARIO

   //private novoItemReq?: IReqItem ={...};

   readonly USERID = this.loginService.getLoggedInID();


   //VARIAVEIS para controlo
   submitted = false;
   erroMsg?: string;
   haErroMsg: boolean = false;
   requestCompleto = false;
   accao: string = "Criar";

   //CRIAR FORMULARIO
   formItem: FormGroup = this.formBuilder.group({});

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


   constructor(
     private formBuilder: FormBuilder,
     private route: ActivatedRoute,
     private router: Router,
     private itemCrudService: ItemCrudService,
     private _snackBar: MatSnackBar,
     private loginService: LoginService
   ) {}



   ngOnInit(): void {

     this.preencherFormulario();

   }

   preencherFormulario(): void {

     //LER DADOS URL: SABER ID e ACCAO
     this.route.params.subscribe((params: any) =>{

       console.log(params);
       const id = params['id'];

       if(id){
        this.preencherFormularioUpdate(id);
       }else{
         this.preencherFormularioCreate();
       }
     });

   }

   preencherFormularioCreate(): void {

    this.accao="Criar";
    console.log("ACCAO: ", this.accao);
    //this.novoItemReq?.fotoPath = "...";

    this.formItem = this.formBuilder.group({



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
      tipoItem: [null, Validators.required],
      hotel: [null, Validators.required],
    });


   }


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

  //CARREGAR FORM COM DADOS DE OBJECTO
  updateFormFromOBJ(item: IItem){
    //DADOS SINCRONOS
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
        /*
         console.log("crearObjecto", this.crearObjectoFromFROM());

         this.tipoconjuntoCrudService.createData(this.crearObjectoFromFROM()).subscribe(
           success => {
             this.haErroMsg = false;
             this.msgSnackBar("Tipo Conjunto criado");
             console.log('CRIADO TCONJUNTO: sucesso');
             this.router.navigate(['/oa-admin/gestao/tconjunto/listar']);
           },
           error => {
             this.haErroMsg = true;
             this.erroMsg = "CRIAR TCONJUNTO: Erro no Update Tipo Conjunto \n"+error;
             this.requestCompleto = false;
             console.log(this.erroMsg);
             alert(this.erroMsg);
           },

           () => {
             console.log('CRIAR TCONJUNTO: request completo');
             this.requestCompleto = true;
           }
         );

         */

         // Usar o método reset para limpar os controles na tela
         //this.formConjunto.reset(new TipoConjunto());

       }



     //FORM INVALIDO
     } else {

       this.haErroMsg = true;
       this.erroMsg = "formulario invalido";
       this.requestCompleto = false;
       console.log(this.erroMsg);

       //Quando o formulario não é valido obriga marcar os campos para aparecer o erro
       if(this.formItem)
        this.verificaValidacoesForm(this.formItem);
     }
   }



   //CRIAR OBJECTO COM OS DADOS DE FORMULARIO, S/ ID, PARA SER ENVIADO NO PEDIDO
   crearObjectoFromFROM(){
     //let API_URL = environment.API;
     return {
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
       "tipoItem": this.formItem?.value.tipoItem,
       "hotel": this.formItem?.value.hotel,
     }
   }

   //CRIAR OBJECTO COM OS DADOS DE FORMULARIO, C/ ID, PARA SER ENVIADO NO PEDIDO
   updateObjectoFromFORM(){
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
       "tipoItem": this.formItem?.value.tipoItem,
       "hotel": this.formItem?.value.hotel,
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
