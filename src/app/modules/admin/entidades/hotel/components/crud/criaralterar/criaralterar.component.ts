import { Component, OnInit, Inject  } from '@angular/core';

import { Router } from '@angular/router';

import {  FormBuilder, FormGroup, Validators } from '@angular/forms';

import {  MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


import { LoginService } from '../../../../../../../my-core/services/login.service';
import { HotelCrudService } from '../../../../hotel/services/hotel-crud.service';

import { DialogService } from '../../../../../../../my-core/services/dialog.service';


import { IHotel } from '../../../../hotel/interfaces/i-hotel';

import { IReqHotel } from '../../../interfaces/i-req-hotel';


@Component({
  selector: 'app-criaralterar',
  templateUrl: './criaralterar.component.html',
  styleUrls: ['./criaralterar.component.scss']
})
export class CriaralterarComponent implements OnInit {

  //ID DO USER LOGADO
  readonly USERID = this.loginService.getLoggedInID();


  //VARIAVEIS para controlo
   submitted = false;
   erroMsg?: string;
   hasErroMsg: boolean = false;
   requestCompleto = false;
   accao: string = "Criar";

  //CRIAR FORMULARIO
  formHotel: FormGroup = this.formBuilder.group({});

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private hotelCrudService: HotelCrudService,
    private dialogRef: MatDialogRef<CriaralterarComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IHotel,

    private loginService: LoginService,
    private dialogService: DialogService
  ) {}


   ngOnInit(): void {
        console.log("COMPONENTE CRIAR/ALTERAR: ngOnInit ===============================");
        this.preencherFormulario();
   }




   preencherFormulario(): void {
    let id = this.data.id;

    if(id){
      //this.preencherFormularioUpdate(id); // com dados do pedido http
      this.preencherFormularioUpdateFromOBJ(this.data); //com dados da tabela
     }else{
       this.preencherFormularioCreate();
     }

   }


   //INCIALIZAR FORM
   preencherFormularioCreate(): void {

    this.accao="Criar";
    console.log("COMPONENTE CRIAR/ALTERAR - ACCAO: ", this.accao);
    //this.novoItemReq?.fotoPath = "...";

    this.incializarForm();

   }


   //CARREGAR FORM COM DADOS DE OBJECTO, usar ID
   preencherFormularioUpdate(id: number): void {

    console.log("CRIAR/ALTERAR - preencherFormularioUpdate");

    this.accao="Editar";

    this.hotelCrudService.findById(id).subscribe(
      obj => {
        console.log("CRIAR/ALTERAR HOTEL: ",obj);
        this.updateFormFromOBJ(obj)
      },
      error => {
        alert(error);
      }
    );

  }

  //CARREGAR FORM COM DADOS DE OBJECTO, usar OBJECTO
  preencherFormularioUpdateFromOBJ(obj: IHotel): void{

    console.log("CRIAR/ALTERAR - preencherFormularioUpdateFromOBJ");

    this.accao="Editar";
    this.updateFormFromOBJ(obj)

    console.log("COMPONENTE CRIAR/ALTERAR - ACCAO: ", this.accao);
    console.log("CRIAR/ALTERAR OBJ: ",obj);

  }


  //CRIAR FORMULARIO
  incializarForm(): void {
    this.formHotel = this.formBuilder.group({

      id: [null],
      nome: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(10)]],
      activo: [false],
      email: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(10)]],
      telefone: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(10)]],
      imagemLogo: ["..."],
      idUser: [this.USERID, Validators.required],

    });
  }

  //METODO AUX CARREGAR FORM COM DADOS DE OBJECTO
  updateFormFromOBJ(obj: IHotel): void{

    this.incializarForm();

    this.formHotel?.patchValue({

      id: obj.id,
      nome: obj.nome,
      activo: obj.activo,
      email: obj.email,
      telefone: obj.telefone,
      imagemLogo: obj.imagemLogo,
      idUser: obj.log.idUserAlteracao,

      });

  }




  onSubmit() {

    this.submitted = true;

     //FORM COM DADOS VALIDOS
     if(this.formHotel?.valid){


        //FAZER UPDATE  -------
        if(this.formHotel.value.id){


              console.log("ONSUBMIT UPDATE HOTEL");

              console.log("crearObjecto", this.crearObjectoFromFROM());

              this.hotelCrudService.updateItemFromIReqHotel(this.crearObjectoFromFROM()).subscribe(
                    success => {
                      console.log('UPDATE HOTEL: sucesso', success);
                      this.hasErroMsg = false;

                      this.dialogService.openSnack_botao_tempo("Hotel update", "X", 6000);

                      this.dialogRef.close("update");

                      //this.router.navigate(['/oa-admin/gestao/entidades/hotel/listar']);

                      this.redirectTo('/oa-admin/gestao/entidades/hotel/listar');
                    },
                    error => {
                      this.hasErroMsg = true;
                      this.erroMsg = "UPDATE HOTEL: Erro no Update Hotel \n"+error;
                      this.requestCompleto = false;
                      console.log(this.erroMsg);



                      this.dialogService.alertDialogError(
                        {
                          message: error,
                          buttonText: "Sair",
                        }
                      );


                    },

                    () => {
                      console.log('UPDATE HOTEL: request completo');
                      this.requestCompleto = true;
                    }
              );


        //CRIAR  ----------
        }else{



              console.log("ONSUBMIT CREATE HOTEL");

              console.log("crearObjecto", this.crearObjectoFromFROM());

              this.hotelCrudService.createHotelFromIReqHotel(this.crearObjectoFromFROM()).subscribe(
                    success => {
                      console.log('CRIADO HOTEL: sucesso');
                      this.hasErroMsg = false;

                      this.dialogService.openSnack_botao_tempo("Hotel criado", "X", 6000);

                      this.dialogRef.close("criar");

                      //this.router.navigate(['/oa-admin/gestao/entidades/hotel/listar']);

                      this.redirectTo('/oa-admin/gestao/entidades/hotel/listar');

                    },
                    error => {
                      this.hasErroMsg = true;
                      this.erroMsg = "CRIADO ITEM: Erro no Create Item \n"+error;
                      this.requestCompleto = false;
                      console.log(this.erroMsg);



                      this.dialogService.alertDialogError(
                        {
                          message: error,
                          buttonText: "Sair",
                        }
                      );


                    },

                    () => {
                      console.log('CRIAR ITEM: request completo');
                      this.requestCompleto = true;
                    }
              );



        }


     //FORM INVALIDO
     } else {

          this.hasErroMsg = true;
          this.erroMsg = "formulario invalido";
          this.requestCompleto = false;
          console.log(this.erroMsg);

          this.dialogService.alertDialogError(
            {
              message: this.erroMsg,
              buttonText: "Sair",
            }
          );
     }

  }


  //CRIAR OBJECTO COM OS DADOS DE FORMULARIO, S/ ID, PARA SER ENVIADO NO PEDIDO
  crearObjectoFromFROM(): IReqHotel{
    //let API_URL = environment.API;
    return {

        "id": this.formHotel?.value.id,

        "nome": this.formHotel?.value.nome,

        "email": this.formHotel?.value.email,
        "telefone": this.formHotel?.value.telefone,

        "activo": this.formHotel?.value.activo,

        "imagemLogo": this.formHotel?.value.imagemLogo,

        "idUser": this.formHotel?.value.idUser
    }
  }

  redirectTo(uri:string){
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
    this.router.navigate([uri]));
  }



  closeClick(): void {
    this.dialogRef.close();
   }

/*

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


  */


    //METODOS GETs
    get getNome(): any {
      return this.formHotel?.get('nome');
    }

    get getActivo(): any {
      return this.formHotel?.get('activo');
    }
    get getEmail(): any {
      return this.formHotel?.get('email');
    }
    get getTelefone(): any {
      return this.formHotel?.get('telefone');
    }
    get getImagemLogo(): any {
      return this.formHotel?.get('imagemLogo');
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


}
