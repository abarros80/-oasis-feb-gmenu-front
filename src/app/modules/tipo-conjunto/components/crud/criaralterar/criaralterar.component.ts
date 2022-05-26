import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';

import { TipoConjunto } from './../../../models/tipo-conjunto';

import { TipoConjuntoCrudService } from '../../../services/tipo-conjunto-crud.service';


import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-criaralterar',
  templateUrl: './criaralterar.component.html',
  styleUrls: ['./criaralterar.component.css']
})
export class CriaralterarComponent implements OnInit {

  //OBJECTO QUE REPRESENTA O FORMULARIO
  novotipoconjunto = new TipoConjunto();

  //VARIAVEIS para controlo
  submitted = false;
  erroMsg?: string;
  haErroMsg: boolean = false;
  requestCompleto = false;
  accao: string = "Criar";

  //CRIAR FORMULARIO
  formConjunto: FormGroup = this.formBuilder.group({
    id: null,
    nome: [this.novotipoconjunto.nome, [Validators.required, Validators.minLength(3), Validators.maxLength(10)]],
    activo: [this.novotipoconjunto.activo],
    idUserCadastro: [this.novotipoconjunto.idUserCadastro, Validators.required]
  });

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private tipoconjuntoCrudService: TipoConjuntoCrudService,
    private _snackBar: MatSnackBar
  ) {}



  ngOnInit(): void {

    this.preencherFormularioUpdate();

  }

  preencherFormularioUpdate(): void {
    //LER DADOS URL: SABER ID e ACCAO
    this.route.params.subscribe((params: any) =>{
      console.log(params);
      const id = params['id'];
      if(id){
        const tipoconjunto$ = this.tipoconjuntoCrudService.getData(id);
        tipoconjunto$.subscribe(tipoconjunto => {
          console.log("CRIAR/ALTERAR TIPO CONJUNTO: ",tipoconjunto);
          this.updateFormFromOBJ(tipoconjunto)
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
      }else{
        this.accao="Criar";
        console.log("ACCAO: ", this.accao);
      }
    });
  }


  //METODOS GETs
  get getNome(): any {
    return this.formConjunto.get('nome');
  }

  get getActivo(): any {
    return this.formConjunto.get('activo');
  }

  get getUserCadastroId(): any {
    return this.formConjunto.get('userCadastro_id');
  }

  //ONSUBMIT
  onSubmit() {
    this.submitted = true;
    // aqui você pode implementar a logica para fazer seu formulário salvar
    console.log("ONSUBMIT TCONJUNTO -------", this.formConjunto.value);

    //FORM COM DADOS VALIDOS
    if(this.formConjunto.valid){

      //FAZER UPDATE TCONJUNTO -------
      if(this.formConjunto.value.id){

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

      //CRIAR TCONJUNTO ----------
      }else{
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
      this.verificaValidacoesForm(this.formConjunto);
    }
  }

  //CARREGAR FORM COM DADOS DE OBJECTO
  updateFormFromOBJ(tipoconjunto: TipoConjunto){
    //DADOS SINCRONOS
    this.formConjunto.patchValue({
      id: tipoconjunto.id,
      nome: tipoconjunto.nome,
      activo: tipoconjunto.activo,
      idUserCadastro: tipoconjunto.idUserCadastro
    });
  }

  //CRIAR OBJECTO COM OS DADOS DE FORMULARIO, S/ ID
  crearObjectoFromFROM(){
    //let API_URL = environment.API;
    return {
      "nome": this.formConjunto.value.nome,
      "idUserCadastro": this.novotipoconjunto.idUserCadastro,
      "activo": this.formConjunto.value.activo,
      "dataCadastro": "2022-05-17T16:55:27"
    }
  }

  //CRIAR OBJECTO COM OS DADOS DE FORMULARIO, C/ ID
  updateObjectoFromFORM(){
    //let API_URL = environment.API;
    return {
      "id": this.formConjunto.value.id,
      "nome": this.formConjunto.value.nome,
      "idUserCadastro": this.novotipoconjunto.idUserCadastro,
      "activo": this.formConjunto.value.activo,
      "dataCadastro": "2022-05-17T16:55:27"
    }
  }

  //RESET FORMULARIO
  onCancel() {
    this.submitted = false;
    this.formConjunto.reset(new TipoConjunto());
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
    return !this.formConjunto.get(campo)?.valid && (this.formConjunto.get(campo)?.touched || this.formConjunto.get(campo)?.dirty);
  }



}
