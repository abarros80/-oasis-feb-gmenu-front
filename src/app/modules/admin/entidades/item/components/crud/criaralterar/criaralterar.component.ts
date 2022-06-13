import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';

interface Hotel {
  id: number;
  nome: string;
}

interface Restaurante {
  id: number;
  nome: string;
}

interface Cardapio {
  id: number;
  nome: string;
}

@Component({
  selector: 'app-criaralterar',
  templateUrl: './criaralterar.component.html',
  styleUrls: ['./criaralterar.component.scss']
})
export class CriaralterarComponent implements OnInit {

  //VARIAVEIS para controlo
  submitted = false;
  erroMsg?: string;
  haErroMsg: boolean = false;
  requestCompleto = false;
  accao: string = "Criar";

  disableHoteis = false;
  hoteisControl = new FormControl(null, Validators.required);
  hoteis: Hotel[] = [
    {id: 1, nome: 'Porto Grande'},
    {id: 2, nome: 'Praiamar'},
    {id: 3, nome: 'Belorizonte'},
    {id: 4, nome: 'Salinas Sea'},
  ];

  disableRestaurantes = false;
  restaurantesControl = new FormControl(null, Validators.required);
  restaurantes: Restaurante[] = [
    {id: 1, nome: 'Kalimba'},
    {id: 2, nome: 'Restaurante'},
    {id: 3, nome: 'Lobby'},
  ];

  disableCardapios = false;
  cardapiosControl = new FormControl(null, Validators.required);
  cardapios: Cardapio[] = [
    {id: 1, nome: 'Tapas'},
    {id: 2, nome: 'Carnes'},
    {id: 3, nome: 'Peixes'},
    {id: 3, nome: 'Sobremesas'},
  ];

  nomePTControl = new FormControl(null, Validators.required);
  nomeINGControl = new FormControl(null, Validators.required);
  nomeFRControl = new FormControl(null, Validators.required);

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit(): void {}

}
