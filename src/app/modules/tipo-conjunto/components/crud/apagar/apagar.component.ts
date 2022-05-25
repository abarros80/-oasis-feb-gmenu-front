import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';

import { TipoConjunto } from './../../../models/tipo-conjunto';

import { TipoConjuntoCrudService } from '../../../services/tipo-conjunto-crud.service';


import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MatSnackBar } from '@angular/material/snack-bar';
import { DialogoConfirmacaoComponent } from '../../../../../my-shared/modules/components-shared/dialogo-confirmacao/dialogo-confirmacao.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-apagar',
  templateUrl: './apagar.component.html',
  styleUrls: ['./apagar.component.css']
})
export class ApagarComponent implements OnInit {

  //OBJECTO QUE REPRESENTA O FORMULARIO
  novotipoconjunto = new TipoConjunto();

  //VARIAVEIS para controlo
  submitted = false;
  erroMsg?: string;
  haErroMsg: boolean = false;
  requestCompleto = false;
  accao: string = "Apagar";

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
    private _snackBar: MatSnackBar,
    public matdialog: MatDialog
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
          console.log("tipoconjunto: ",tipoconjunto);
          this.updateFormFromOBJ(tipoconjunto)
        });
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
    console.log(this.formConjunto.value);

    //FORM COM DADOS VALIDOS
    if(this.formConjunto.valid){

      //FAZER UPDATE TCONJUNTO -------
      if(this.formConjunto.value.id){

        const dialogoReferencia = this.matdialog.open(DialogoConfirmacaoComponent);

        dialogoReferencia.afterClosed().subscribe(resposta => {
          console.log("valor resposta: ", resposta);
          if(resposta){
            this.tipoconjuntoCrudService.deleteData(Number(this.formConjunto.value.id)).subscribe(
              () => {
                this.msgSnackBar("Tipo Conjunto apagado");
                this.router.navigate(['/oa-admin/gestao/tconjunto/listar']);
              },
              error => {
                alert("Erro ao apagar Tipo Conjunto \n"+error);
              },
              () => console.log('request completo')
            );

          }

        });

        //if (confirm("Confirma remoção do item "+this.formConjunto.value.nome+"??")) {}
      }

    //FORM INVALIDO
    } else {
      console.log("formulario invalido");
      this.msgSnackBar("formulario invalido");

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


  //POP MENSAGEM
  msgSnackBar(mensagem: string) {
    this._snackBar.open(mensagem, 'Ok', {
      horizontalPosition: 'end',
      verticalPosition: 'top',
      duration: 3000
    });
  }



}
