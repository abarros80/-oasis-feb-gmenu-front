import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';

import { Conjunto } from './../../../models/conjunto';

import { ConjuntoCrudService } from '../../../services/conjunto-crud.service';


import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';


import {ErrorStateMatcher} from '@angular/material/core';

@Component({
  selector: 'app-criaralterar',
  templateUrl: './criaralterar.component.html',
  styleUrls: ['./criaralterar.component.css']
})
export class CriaralterarComponent implements OnInit {

  novoconjunto = new Conjunto();



  //VARIAVEIS para controlo
  submitted = false;
  erroMsg?: string;
  haErroMsg: boolean = false;
  requestCompleto = false;
  accao: string = "Criar";

  titleAlert: string = 'This field is required';

  //CRIAR FORMULARIO
  formConjunto: FormGroup = this.formBuilder.group({
    id: null,
    nome: [this.novoconjunto.nome, [Validators.required, Validators.minLength(3), Validators.maxLength(10)]],
    activo: [this.novoconjunto.activo],
    ordem: [this.novoconjunto.ordem, Validators.required],

    tipoConjunto_id: [this.novoconjunto.tipoConjunto_id, Validators.required],
    pai_id: [this.novoconjunto.pai_id, Validators.required],
    userCadastro_id: [this.novoconjunto.userCadastro_id, Validators.required],

    descPt: [this.novoconjunto.descPt, [Validators.required, Validators.minLength(3), Validators.maxLength(10)]],
    descIng: [this.novoconjunto.descIng, [Validators.required, Validators.minLength(3), Validators.maxLength(10)]],
    descFr: [this.novoconjunto.descFr, [Validators.required, Validators.minLength(3), Validators.maxLength(10)]],

    fotoPath: [this.novoconjunto.fotoPath, [Validators.required, Validators.minLength(3), Validators.maxLength(10)]]

  });

  constructor(
    private formBuilder: FormBuilder,
    private conjuntoCrudService: ConjuntoCrudService,
    private route: ActivatedRoute
  ) {}

  onSubmit() {
   console.log('form data is ', this.formConjunto.value);
  }

  ngOnInit(): void {
  }

  get getNome(): any {
    return this.formConjunto.get('nome');
  }

  get getActivo(): any {
    return this.formConjunto.get('activo');
  }

  get getOrdem(): any {
    return this.formConjunto.get('ordem');
  }

  get getTipoConjuntoId(): any {
    return this.formConjunto.get('tipoConjunto_id');
  }

  get getPaiId(): any {
    return this.formConjunto.get('pai_id');
  }

  get getUserCadastroId(): any {
    return this.formConjunto.get('userCadastro_id');
  }

  get getDescPt(): any {
    return this.formConjunto.get('descPt');
  }

  get getDescIng(): any {
    return this.formConjunto.get('descIng');
  }

  get getDescFr(): any {
    return this.formConjunto.get('descFr');
  }

  get getFotoPath(): any {
    return this.formConjunto.get('fotoPath');
  }

}
