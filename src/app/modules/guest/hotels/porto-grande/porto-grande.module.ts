import { NgModule } from '@angular/core';
import { WebSharedModule } from '../../../../my-shared/modules/web-shared/web-shared.module';
import { MaterialSharedModule } from '../../../../my-shared/modules/material-shared/material-shared.module';

import { PortoGrandeRoutingModule } from './porto-grande-routing.module';

import { HotelModule } from '../../../admin/entidades/hotel/hotel.module';
import { RestauranteModule } from '../../../admin/entidades/restaurante/restaurante.module';
import { CardapioModule } from '../../../admin/entidades/cardapio/cardapio.module';
import { ItemModule } from '../../../admin/entidades/item/item.module';
import { TitemModule } from '../../../admin/entidades/titem/titem.module';

import { PortoGrandeComponent } from './porto-grande.component';
import { LobbyComponent } from './lobby/lobby.component';
import { KalimbaComponent } from './kalimba/kalimba.component';
import { RestauranteComponent } from './restaurante/restaurante.component';





@NgModule({
  declarations: [
    PortoGrandeComponent,
    LobbyComponent,
    KalimbaComponent,
    RestauranteComponent
  ],
  imports: [
    WebSharedModule,
    MaterialSharedModule,

    PortoGrandeRoutingModule,

    HotelModule,
    RestauranteModule,
    CardapioModule,
    ItemModule,
    TitemModule
  ]
})
export class PortoGrandeModule { }
