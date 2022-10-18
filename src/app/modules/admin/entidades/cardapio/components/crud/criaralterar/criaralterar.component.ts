import { Component, OnInit, Inject  } from '@angular/core';

import { Router } from '@angular/router';

import { Observable, zip } from 'rxjs';

import {  FormBuilder, FormGroup, Validators } from '@angular/forms';

import {  MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { DialogService } from '../../../../../../../my-core/services/dialog.service';

import { HotelCrudService } from '../../../../hotel/services/hotel-crud.service';
import { IHotel } from '../../../../hotel/interfaces/i-hotel';

import { LoginService } from '../../../../../../../my-core/services/login.service';

import { ICardapio } from '../../../interfaces/i-cardapio';
import { CardapioCrudService } from '../../../services/cardapio-crud.service';
import { IReqCardapio } from '../../../interfaces/i-req-cardapio';


@Component({
  selector: 'app-criaralterar',
  templateUrl: './criaralterar.component.html',
  styleUrls: ['./criaralterar.component.scss']
})
export class CriaralterarComponent implements OnInit {

    //DADOS HOTEIS
    disableHoteis = false;
    hoteis: IHotel[] = [];
    hotelID:number | undefined;

    //ID DO USER LOGADO
    readonly USERID = this.loginService.getLoggedInID();


    //VARIAVEIS para controlo
    submitted = false;
    erroMsg?: string;
    hasErroMsg: boolean = false;
    requestCompleto = false;
    accao: string = "Criar";

    //CRIAR FORMULARIO
    formCardapio: FormGroup = this.formBuilder.group({});

  constructor(

    private formBuilder: FormBuilder,
    private router: Router,

    private dialogRef: MatDialogRef<CriaralterarComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ICardapio,

    private loginService: LoginService,
    private dialogService: DialogService,

    private hotelCrudService: HotelCrudService,

    private cardapioCrudService: CardapioCrudService


  ) { }

  ngOnInit(): void {
    console.log("COMPONENTE CRIAR/ALTERAR: ngOnInit ===============================");
    this.preencherFormulario();
    this.inicializarHoteis();
  }

  preencherFormulario(): void {
    let id = this.data.id;

    if(id){
      //FORMULARIO COM DADOS PARA UPDATE
      this.preencherFormularioUpdateFromOBJ(this.data); //com dados da tabela
     }else{
      //CRIAR
      //FORMULARIO SEM DADOS
       this.preencherFormularioCreate();
     }

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

  //INCIALIZAR FORM CRIAR
  preencherFormularioCreate(): void {

    this.accao="Criar";

    console.log("COMPONENTE CRIAR/ALTERAR - ACCAO: ", this.accao);

    this.incializarForm();

  }


  //CARREGAR FORM COM DADOS DE OBJECTO, usar ID
  preencherFormularioUpdate(id: number): void {

    console.log("CRIAR/ALTERAR - preencherFormularioUpdate");

    this.accao="Editar";

    this.cardapioCrudService.findById(id).subscribe(
      obj => {
        console.log("CRIAR/ALTERAR: ",obj);
        this.updateFormFromOBJ(obj)
      },
      error => {
        alert(error);
      }
    );

  }

  //CARREGAR FORM COM DADOS DE OBJECTO, usar OBJECTO
  preencherFormularioUpdateFromOBJ(obj: ICardapio): void{

    console.log("CRIAR/ALTERAR - preencherFormularioUpdateFromOBJ");

    this.accao="Editar";
    this.updateFormFromOBJ(obj)

    console.log("COMPONENTE CRIAR/ALTERAR - ACCAO: ", this.accao);
    console.log("CRIAR/ALTERAR OBJ: ",obj);

  }

  //CRIAR FORMULARIO
  incializarForm(): void {
    this.formCardapio = this.formBuilder.group({

      id: [null],

      activo: [true],

      idUser: [this.USERID, Validators.required],

      nomePt: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],

      nomeIng: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],

      nomeFr: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],

      codigoReduzido: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(4)]],

      imagemPath: [null, [Validators.required, Validators.minLength(5), Validators.maxLength(300)]],

      hotel: [{value: null,  disabled: this.disableHoteis}, Validators.required],

    });
  }

  //METODO AUX CARREGAR FORM COM DADOS DE OBJECTO
  updateFormFromOBJ(obj: ICardapio): void{

    this.incializarForm();


    let link: any = obj._links ;


      let getHotelFromItem$: Observable<IHotel>  = this.hotelCrudService.getDataByURL(link.hotel.href);

      //Juntar os pedidos de forma a aguardar a conclusão dos mesmos
      const aguardarHotel = zip(
        getHotelFromItem$
      );

      aguardarHotel.subscribe(val => {

        this.formCardapio?.patchValue({

          id: obj.id,

          activo: obj.activo,

          idUser: obj.log.idUserAlteracao,

          nomePt: obj.nomePt,

          nomeIng: obj.nomeIng,

          nomeFr: obj.nomeFr,

          codigoReduzido: obj.codigoReduzido,

          imagemPath: obj.imagem,


          hotel: val[0].id, //Val[1], corresponde a conclusão do segundo pedido, getHotelFromItem

          });

      });

  }

  onSubmit() {

    this.submitted = true;

     //FORM COM DADOS VALIDOS
     if(this.formCardapio?.valid){


        //FAZER UPDATE  -------
        if(this.formCardapio.value.id){


              console.log("ONSUBMIT UPDATE ");

              console.log("crearObjecto", this.crearObjectoFromFROM());

              this.cardapioCrudService.updateFromIReq(this.crearObjectoFromFROM()).subscribe(
                    success => {
                      console.log('UPDATE : sucesso', success);

                      this.hasErroMsg = false;

                      this.dialogService.openSnack_botao_tempo_css("Sucesso: Cardapio Editado", "X", 6000, "green-snackbar");


                      this.dialogRef.close("update");


                      this.redirectTo('/oa-admin/gestao/entidades/cardapio/listar');
                    },
                    error => {
                      this.hasErroMsg = true;
                      this.erroMsg = "UPDATE: Erro no Update Cardapio \n"+error;
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
                      console.log('UPDATE: request completo');
                      this.requestCompleto = true;
                    }
              );


        //CRIAR  ----------
        }else{



              console.log("ONSUBMIT CREATE");

              console.log("crearObjecto", this.crearObjectoFromFROM());

              this.cardapioCrudService.createFromIReq(this.crearObjectoFromFROM()).subscribe(
                    success => {
                      console.log('CRIADO: sucesso');
                      this.hasErroMsg = false;

                      this.dialogService.openSnack_botao_tempo_css("Sucesso: Cardapio Criado", "X", 6000, "green-snackbar");

                      this.dialogRef.close("criar");

                      this.redirectTo('/oa-admin/gestao/entidades/cardapio/listar');

                    },
                    error => {
                      this.hasErroMsg = true;
                      this.erroMsg = "CRIADO: Erro no Create Cardapio \n"+error;
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
                      console.log('CRIAR: request completo');
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

  //CRIAR OBJECTO COM OS DADOS DE FORMULARIO, PARA SER ENVIADO NO PEDIDO
crearObjectoFromFROM(): IReqCardapio{
  //let API_URL = environment.API;
  return {

      "id": this.formCardapio?.value.id,

      "activo": this.formCardapio?.value.activo,

      "idUser": this.formCardapio?.value.idUser,

      "nomePt": this.formCardapio?.value.nomePt,

      "nomeIng": this.formCardapio?.value.nomeIng,

      "nomeFr": this.formCardapio?.value.nomeFr,

      "codigoReduzido": this.formCardapio?.value.codigoReduzido,

      "imagem": this.formCardapio?.value.imagemPath,

      "hotel": "/hotels/"+this.formCardapio?.value.hotel,
  }
}

redirectTo(uri:string){
  this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
  this.router.navigate([uri]));
}

closeClick(): void {
  this.dialogRef.close();
}

//METODOS GETs
get getNomePt(): any {
  return this.formCardapio?.get('nomePt');
}

get getNomeIng(): any {
  return this.formCardapio?.get('nomeIng');
}

get getNomeFr(): any {
  return this.formCardapio?.get('nomeFr');
}

get getCodigoReduzido(): any {
  return this.formCardapio?.get('codigoReduzido');
}

get getImagemPath(): any {
  return this.formCardapio?.get('imagemPath');
}

get getActivo(): any {
  return this.formCardapio?.get('activo');
}

get getHotel(): any {
  return this.formCardapio?.get('hotel');
}



}
