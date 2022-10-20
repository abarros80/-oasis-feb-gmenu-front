import { Component, OnInit, Inject  } from '@angular/core';

import { Router } from '@angular/router';

import {  FormBuilder, FormArray, FormGroup, Validators } from '@angular/forms';

import {  MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { DialogService } from '../../../../../../../my-core/services/dialog.service';

import { LoginService } from '../../../../../../../my-core/services/login.service';
import { IIntervencao } from '../../../interfaces/i-intervencao';
import { IntervencaoCrudService } from '../../../services/intervencao-crud.service';
import { IHotel } from '../../../../hotel/interfaces/i-hotel';

@Component({
  selector: 'app-criaralterar',
  templateUrl: './criaralterar.component.html',
  styleUrls: ['./criaralterar.component.scss']
})
export class CriaralterarComponent implements OnInit {

  //DADOS DATA
  currentYear = new Date().getFullYear(); // Set the minimum to January 1st 1 years in the past (Y, M, D)
  minDate = new Date(this.currentYear - 1, 0, 1);
  maxDate = new Date();

  //DADOS HOTEIS
  disableHoteis = false;
  listHoteis: IHotel[] = [];
  hotelID:number | undefined;

  //DADOS AREAS
  disableAreas = false;
  listaAreas: IHotel[] = [];
  areaID:number | undefined;

  //DADOS ESPAÇOS
  disableEspacos = false;
  listaEspacos: IHotel[] = [];
  espacoID:number | undefined;

  //DADOS EQUIPAMENTOS
  disableEquipamentos = false;
  listaEquipamentos: IHotel[] = [];
  equipamentoID:number | undefined;

  //DADOS TECNICOS
  disableTecnicos = false;
  listaTecnicos: IHotel[] = [];
  tecnicoID:number | undefined;

  //DADOS TECNICOS
  disableAccoes = false;
  listaAccoes: IHotel[] = [];
  accaoID:number | undefined;

  //ID DO USER LOGADO
  readonly USERID = this.loginService.getLoggedInID();


  //VARIAVEIS para controlo
   submitted = false;
   erroMsg?: string;
   hasErroMsg: boolean = false;
   requestCompleto = false;
   accao: string = "Criar";

  //CRIAR FORMULARIO
  title = 'FormArray SetValue & PatchValue Example';

  intervencaoForm: FormGroup = this.fb.group({
    hotel: ['', [Validators.required]],
    area: ['', [Validators.required]],
    espaco: ['', [Validators.required]],
    equipamento: ['', [Validators.required]],
    tecnico: ['', [Validators.required]],
    dataHora: ['', [Validators.required]],
    accoes: this.fb.array([])
  });

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private intervencaoCrudService: IntervencaoCrudService,
    private dialogRef: MatDialogRef<CriaralterarComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IIntervencao,

    private loginService: LoginService,
    private dialogService: DialogService
  ) {}

  ngOnInit(): void {
    this.addAccao();
  }

  closeClick(): void {
    this.dialogRef.close();
   }

   //RESET FORMULARIO
   onCancel() {
     this.submitted = false;
    // this.formItem.reset(new TipoConjunto());
     console.log('onCancel')
   }


  /** Accoes */
  /*accoes(): FormArray {
    return this.intervencaoForm.get("accoes") as FormArray
  }
*/
  novaAccao(): FormGroup {
    return this.fb.group({
      accao: ['', [Validators.required]],
      duracao: ['', [Validators.required]],
      observacao: '',
    })
  }


  addAccao() {
    this.accoes.push(this.novaAccao());
  }


  removeAccao(accaoIndex: number) {
    this.accoes.removeAt(accaoIndex);
  }


  // GETTERS

  get hotel(): any {
    return this.intervencaoForm.get('hotel');
  }

  get area(): any {
    return this.intervencaoForm.get('area');
  }

  get espaco(): any {
    return this.intervencaoForm.get('espaco');
  }

  get equipamento(): any {
    return this.intervencaoForm.get('equipamento');
  }

  get tecnico(): any {
    return this.intervencaoForm.get('tecnico');
  }

  get dataHora(): any {
    return this.intervencaoForm.get('dataHora');
  }

  get accoes(): FormArray {
    return this.intervencaoForm.get('accoes') as FormArray
  }

  accaoIntervencao(indexAccao: number): any  {
    return this.accoes?.at(indexAccao).get('accao');
  }

  duracaoIntervencao(indexAccao: number): any  {
    return this.accoes?.at(indexAccao).get('duracao');
  }

  observacaoIntervencao(indexAccao: number): any  {
    return this.accoes?.at(indexAccao).get('observacao');
  }








  /*

  // Teachers
  teachers(): FormArray {
    return this.intervencaoForm.get("teachers") as FormArray
  }

  newTeacher(): FormGroup {
    return this.fb.group({
      name: '',
      batches: this.fb.array([])
    })
  }


  addTeacher() {
    this.teachers().push(this.newTeacher());
  }


  removeTeacher(ti: number) {
    this.teachers().removeAt(ti);
  }


  // batches

  batches(ti: number): FormArray {
    return this.teachers().at(ti).get("batches") as FormArray
  }


  newBatch(): FormGroup {
    return this.fb.group({
      name: '',
      students: this.fb.array([])
    })
  }

  addBatch(ti: number) {
    this.batches(ti).push(this.newBatch());
  }

  removeBatch(ti: number, bi: number) {
    this.batches(ti).removeAt(ti);
  }

  // students

  students(ti: number, bi: number): FormArray {
    return this.batches(ti).at(bi).get("students") as FormArray
  }

  newStudent(): FormGroup {
    return this.fb.group({
      name: '',
    })
  }

  addStudent(ti: number, bi: number) {
    this.students(ti, bi).push(this.newStudent());
  }

  removeStudent(ti: number, bi: number, si: number) {
    this.students(ti, bi).removeAt(si);
  }

  */

  onSubmit() {
    console.log(this.intervencaoForm.value);
  }

}
