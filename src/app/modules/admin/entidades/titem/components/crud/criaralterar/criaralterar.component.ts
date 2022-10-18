import { Component, OnInit, Inject  } from '@angular/core';

import { Router } from '@angular/router';

import {  FormBuilder, FormGroup, Validators } from '@angular/forms';

import {  MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { DialogService } from '../../../../../../../my-core/services/dialog.service';

import { LoginService } from '../../../../../../../my-core/services/login.service';



import { TitemCrudService } from '../../../services/titem-crud.service';
import { ITitem } from '../../../interfaces/i-titem';
import { IReqTitem } from '../../../interfaces/i-req-titem';

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
    formTitem: FormGroup = this.formBuilder.group({});

    constructor(
      private formBuilder: FormBuilder,
      private router: Router,
      private titemCrudService: TitemCrudService,
      private dialogRef: MatDialogRef<CriaralterarComponent>,
      @Inject(MAT_DIALOG_DATA) public data: ITitem,

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

  this.titemCrudService.findById(id).subscribe(
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
preencherFormularioUpdateFromOBJ(obj: ITitem): void{

  console.log("CRIAR/ALTERAR - preencherFormularioUpdateFromOBJ");

  this.accao="Editar";
  this.updateFormFromOBJ(obj)

  console.log("COMPONENTE CRIAR/ALTERAR - ACCAO: ", this.accao);
  console.log("CRIAR/ALTERAR OBJ: ",obj);

}


//CRIAR FORMULARIO
incializarForm(): void {
  this.formTitem = this.formBuilder.group({

    id: [null],
    nome: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
    activo: [true],
    idUser: [this.USERID, Validators.required],

  });
}

//METODO AUX CARREGAR FORM COM DADOS DE OBJECTO
updateFormFromOBJ(obj: ITitem): void{

  this.incializarForm();

  this.formTitem?.patchValue({

    id: obj.id,
    nome: obj.nome,
    activo: obj.activo,
    idUser: obj.log.idUserAlteracao,

    });

}




onSubmit() {

  this.submitted = true;

   //FORM COM DADOS VALIDOS
   if(this.formTitem?.valid){


      //FAZER UPDATE  -------
      if(this.formTitem.value.id){


            console.log("ONSUBMIT UPDATE ");

            console.log("crearObjecto", this.crearObjectoFromFROM());

            this.titemCrudService.updateFromIReq(this.crearObjectoFromFROM()).subscribe(
                  success => {
                    console.log('UPDATE : sucesso', success);
                    this.hasErroMsg = false;

                    //this.dialogService.openSnack_botao_tempo_css("T. Item criado", "X", 6000, "green-snackbar");

                    this.dialogService.openSnack_botao_tempo_css("Sucesso: T. Item Editado", "X", 6000, "green-snackbar");


                    this.dialogRef.close("update");


                    this.redirectTo('/oa-admin/gestao/entidades/titem/listar');
                  },
                  error => {
                    this.hasErroMsg = true;
                    this.erroMsg = "UPDATE: Erro no Update T. Item \n"+error;
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

            this.titemCrudService.createFromIReq(this.crearObjectoFromFROM()).subscribe(
                  success => {
                    console.log('CRIADO: sucesso');
                    this.hasErroMsg = false;

                    this.dialogService.openSnack_botao_tempo_css("Sucesso: T. Item Criado", "X", 6000, "green-snackbar");

                    this.dialogRef.close("criar");

                    //this.router.navigate(['/oa-admin/gestao/entidades/hotel/listar']);

                    this.redirectTo('/oa-admin/gestao/entidades/titem/listar');

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


//CRIAR OBJECTO COM OS DADOS DE FORMULARIO, S/ ID, PARA SER ENVIADO NO PEDIDO
crearObjectoFromFROM(): IReqTitem{
  //let API_URL = environment.API;
  return {

      "id": this.formTitem?.value.id,

      "nome": this.formTitem?.value.nome,

      "activo": this.formTitem?.value.activo,

      "idUser": this.formTitem?.value.idUser
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
  return this.formTitem?.get('nome');
}

get getActivo(): any {
  return this.formTitem?.get('activo');
}


}
