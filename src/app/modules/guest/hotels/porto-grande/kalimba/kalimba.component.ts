import { Component, OnDestroy, OnInit } from '@angular/core';
import { MediaObserver, MediaChange } from '@angular/flex-layout'
import { Subscription } from 'rxjs';
import { HotelCrudService } from '../../../../admin/entidades/hotel/services/hotel-crud.service';
import { IHotel } from '../../../../admin/entidades/hotel/interfaces/i-hotel';

import { RestauranteCrudService } from '../../../../admin/entidades/restaurante/services/restaurante-crud.service';
import { IRestaurante } from '../../../../admin/entidades/restaurante/interfaces/i-restaurante';

import { CardapioCrudService } from '../../../../admin/entidades/cardapio/services/cardapio-crud.service';
import { IResponsePageableCardapio } from '../../../../admin/entidades/cardapio/interfaces/i-response-pageable-cardapio';
import { ICardapio } from '../../../../admin/entidades/cardapio/interfaces/i-cardapio';
import { IItem } from '../../../../admin/entidades/item/interfaces/i-item';
import { ItemCrudService } from '../../../../admin/entidades/item/services/item-crud.service';
import { IResponsePageableItem } from '../../../../admin/entidades/item/interfaces/i-response-pageable-item';


@Component({
  selector: 'app-kalimba',
  templateUrl: './kalimba.component.html',
  styleUrls: ['./kalimba.component.scss']
})
export class KalimbaComponent implements OnInit , OnDestroy {


  //DADOS INICIAIS, consoante hotel e restaurante
  private readonly const_hotelID: number = 1;
  private readonly const_hotelACTIVO: boolean = true;
  private readonly const_restauranteID: number = 1;
  private readonly const_restauranteACTIVO: boolean = true;





  public mediaSub: Subscription
  public deviceXs: boolean = false;

  //DADOS HOTEL
  public hotelNome?: string;
  public hotelTelefone?: string;
  public hotelEmail?: string;
  public hotelActivo?: boolean;
  public hotelImagemLogo?: string;

  //DADOS RESTAURANTE
  public restNome?: string;
  public restHorario?: string;
  public restTelefone?: string;
  public restNumInterno?: string;
  public restImagemCapa?: string;
  public restCardapio?: {nome:string; itens: any[]}[];

  //Lista Cardapios
  public listCardapios: ICardapio[] = [];

  //Lista Cardapios e Itens
  public listCardapiosItens: {cardapio: ICardapio,  listaitens: IItem[]}[] = [];



  constructor(
    public mediaObserver: MediaObserver,
    private hotelCrudService: HotelCrudService,
    private restauranteCrudService: RestauranteCrudService,
    private cardapioCrudService: CardapioCrudService,
    private itemCrudService: ItemCrudService

    ) {
    this.mediaSub = this.mediaObserver.media$.subscribe((result:MediaChange)=>{
      console.log(result.mqAlias);
      this.deviceXs = result.mqAlias === 'xs' ? true : false;

    });
   }

  ngOnInit(): void {


    //HOTEL
    this.hotelCrudService.findById(this.const_hotelID).subscribe(
      (data: IHotel) => {
        console.log('Foi lido os seguintes dados, hotel: ', data.nome);
       this.hotelNome = data.nome;
       this.hotelTelefone = data.telefone;
       this.hotelEmail = data.email;
       this.hotelImagemLogo = data.imagemLogo;
       this.hotelActivo = data.activo;
      },
      error => {
        console.error('ERROR: ', error);
        //alert(`erro: ${this.erroMsg}`);
      },
      () => { console.error("Recebeu dados do hotel");}
    );

    //RESTAURANTE
    this.restauranteCrudService.findByIdAndActivoAndHotelIdAndActivo(this.const_restauranteID, this.const_restauranteACTIVO, this.const_hotelID, this.const_hotelACTIVO).subscribe(
      (data: IRestaurante) => {
        console.log('Foi lido os seguintes dados, hotel: ', data.nome);
       this.restNome = data.nome;
       this.restNumInterno = data.numeroInterno;
       this.restHorario = data.horario;
       this.restImagemCapa = data.imagemCapa;

      },
      error => {
        console.error('ERROR: ', error);
        //alert(`erro: ${this.erroMsg}`);
      },
      () => { console.error("Recebeu dados do Restaurante");}
    );

    //CARDAPIO
    this.cardapioCrudService.findByActivoAndRestauranteCardapioRestauranteIdAndRestauranteCardapioRestauranteActivo(true, this.const_restauranteID, this.const_restauranteACTIVO).subscribe(
      (data: IResponsePageableCardapio) => {
      // this.listCardapios = data._embedded.cardapios;
       console.log("listCardapios: ",data._embedded.cardapios);
        for (let mycardapio of data._embedded.cardapios) {
          this.itemCrudService.findByActivoAndItemCardapioCardapioIdAndItemCardapioCardapioActivo(true, mycardapio.id, true).subscribe(
            (data: IResponsePageableItem) => {
              //ITENS
              if(data._embedded.itens.length > 0){
                this.listCardapios.push(mycardapio);
                this.listCardapiosItens.push({cardapio: mycardapio, listaitens: data._embedded.itens});

              }
            },
            error => {
              console.error('ERROR: ', error);
              //alert(`erro: ${this.erroMsg}`);
            },
            () => { console.log("listCardapiosItens: ",this.listCardapiosItens);}
          );
        }
      },
      error => {
        console.error('ERROR: ', error);
        //alert(`erro: ${this.erroMsg}`);
      },
      () => { console.log("Recebeu dados do Restaurante");}
    );

  }

  ngOnDestroy(): void {
    this.mediaSub.unsubscribe();
  }



}
