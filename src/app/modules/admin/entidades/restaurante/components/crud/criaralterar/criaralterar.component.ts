import { Component, OnInit, Inject  } from '@angular/core';

import { Router } from '@angular/router';

import { Observable, zip } from 'rxjs';

import {  FormBuilder, FormGroup, Validators } from '@angular/forms';

import {  MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { DialogService } from '../../../../../../../my-core/services/dialog.service';

import { HotelCrudService } from '../../../../hotel/services/hotel-crud.service';
import { IHotel } from '../../../../hotel/interfaces/i-hotel';

import { LoginService } from '../../../../../../../my-core/services/login.service';

import { IRestaurante } from '../../../interfaces/i-restaurante';
import { RestauranteCrudService } from '../../../services/restaurante-crud.service';
import { IReqRestaurante } from '../../../interfaces/i-req-restaurante';



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
  formRestaurante: FormGroup = this.formBuilder.group({});

  constructor(

    private formBuilder: FormBuilder,
    private router: Router,

    private dialogRef: MatDialogRef<CriaralterarComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IRestaurante,

    private loginService: LoginService,
    private dialogService: DialogService,

    private hotelCrudService: HotelCrudService,

    private restauranteCrudService: RestauranteCrudService,



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

    this.restauranteCrudService.findById(id).subscribe(
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
  preencherFormularioUpdateFromOBJ(obj: IRestaurante): void{

    console.log("CRIAR/ALTERAR - preencherFormularioUpdateFromOBJ");

    this.accao="Editar";
    this.updateFormFromOBJ(obj)

    console.log("COMPONENTE CRIAR/ALTERAR - ACCAO: ", this.accao);
    console.log("CRIAR/ALTERAR OBJ: ",obj);

  }

  //CRIAR FORMULARIO
  incializarForm(): void {
    this.formRestaurante = this.formBuilder.group({

      id: [null],

      activo: [true],

      idUser: [this.USERID, Validators.required],

      nome: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(40)]],

      numeroInterno: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(4)]],

      telefone: [null, [Validators.required, Validators.minLength(7), Validators.maxLength(11)]],

      imagemCapa: [null, [Validators.required, Validators.minLength(5), Validators.maxLength(300)]],

      horario: [null, [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],

      hotel: [{value: null,  disabled: this.disableHoteis}, Validators.required],



    });
  }

  //METODO AUX CARREGAR FORM COM DADOS DE OBJECTO
  updateFormFromOBJ(obj: IRestaurante): void{

    this.incializarForm();


    let link: any = obj._links ;


      let getHotelFromItem$: Observable<IHotel>  = this.hotelCrudService.getDataByURL(link.hotel.href);

      //Juntar os pedidos de forma a aguardar a conclusão dos mesmos
      const aguardarHotel = zip(
        getHotelFromItem$
      );

      aguardarHotel.subscribe(val => {

        this.formRestaurante?.patchValue({

          id: obj.id,

          activo: obj.activo,

          idUser: obj.log.idUserAlteracao,

          nome: obj.nome,

          numeroInterno: obj.numeroInterno,

          telefone: obj.telefone,

          imagemCapa: obj.imagemCapa,

          horario: obj.horario,

          hotel: val[0].id, //Val[1], corresponde a conclusão do segundo pedido, getHotelFromItem

          });

      });

  }


  onSubmit() {

    this.submitted = true;

     //FORM COM DADOS VALIDOS
     if(this.formRestaurante?.valid){


        //FAZER UPDATE  -------
        if(this.formRestaurante.value.id){


              console.log("ONSUBMIT UPDATE ");

              console.log("crearObjecto", this.crearObjectoFromFROM());

              this.restauranteCrudService.updateFromIReq(this.crearObjectoFromFROM()).subscribe(
                    success => {
                      console.log('UPDATE : sucesso', success);

                      this.hasErroMsg = false;

                      this.dialogService.openSnack_botao_tempo_css("Sucesso: Restaurante Editado", "X", 6000, "green-snackbar");


                      this.dialogRef.close("update");


                      this.redirectTo('/oa-admin/gestao/entidades/restaurante/listar');
                    },
                    error => {
                      this.hasErroMsg = true;
                      this.erroMsg = "UPDATE: Erro no Update Restaurante \n"+error;
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

              this.restauranteCrudService.createFromIReq(this.crearObjectoFromFROM()).subscribe(
                    success => {
                      console.log('CRIADO: sucesso');
                      this.hasErroMsg = false;

                      this.dialogService.openSnack_botao_tempo_css("Sucesso: Restaurante Criado", "X", 6000, "green-snackbar");

                      this.dialogRef.close("criar");

                      //this.router.navigate(['/oa-admin/gestao/entidades/hotel/listar']);

                      this.redirectTo('/oa-admin/gestao/entidades/restaurante/listar');

                    },
                    error => {
                      this.hasErroMsg = true;
                      this.erroMsg = "CRIADO: Erro no Create Item \n"+error;
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
crearObjectoFromFROM(): IReqRestaurante{
  //let API_URL = environment.API;
  return {

      "id": this.formRestaurante?.value.id,

      "nome": this.formRestaurante?.value.nome,

      "activo": this.formRestaurante?.value.activo,

      "idUser": this.formRestaurante?.value.idUser,

      "numeroInterno": this.formRestaurante?.value.numeroInterno,

      "telefone": this.formRestaurante?.value.telefone,

      "imagemCapa": this.formRestaurante?.value.imagemCapa,

      "horario": this.formRestaurante?.value.horario,

      "hotel": "/hotels/"+this.formRestaurante?.value.hotel,
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
get getNome(): any {
  return this.formRestaurante?.get('nome');
}

get getActivo(): any {
  return this.formRestaurante?.get('activo');
}

get getNumeroInterno(): any {
  return this.formRestaurante?.get('numeroInterno');
}

get getTelefone(): any {
  return this.formRestaurante?.get('telefone');
}

get getImagemCapa(): any {
  return this.formRestaurante?.get('imagemCapa');
}

get getHorario(): any {
  return this.formRestaurante?.get('horario');
}

get getHotel(): any {
  return this.formRestaurante?.get('hotel');
}





}
