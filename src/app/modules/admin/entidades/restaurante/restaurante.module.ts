import { NgModule } from '@angular/core';

import { WebSharedModule } from './../../../../my-shared/modules/web-shared/web-shared.module';
import { MaterialSharedModule } from './../../../../my-shared/modules/material-shared/material-shared.module';

import { ComponentsSharedModule } from './../../../../my-shared/modules/components-shared/components-shared.module';

import { RestauranteRoutingModule } from './restaurante-routing.module';

import { RestauranteCrudService } from './services/restaurante-crud.service';

import { RestauranteComponent } from './restaurante.component';
import { MainMenuComponent } from './components/main-menu/main-menu.component';
import { ListarComponent } from './components/crud/listar/listar.component';
import { ApagarComponent } from './components/crud/apagar/apagar.component';
import { CriaralterarComponent } from './components/crud/criaralterar/criaralterar.component';
import { DetalheComponent } from './components/crud/detalhe/detalhe.component';
import { GetHotelByUrlPipe } from './pipes/get-hotel-by-url.pipe';



@NgModule({
  declarations: [
    RestauranteComponent,
    MainMenuComponent,
    ListarComponent,
    ApagarComponent,
    CriaralterarComponent,
    DetalheComponent,
    GetHotelByUrlPipe
  ],
  imports: [
    WebSharedModule,
    MaterialSharedModule,
    ComponentsSharedModule,
    RestauranteRoutingModule
  ],
  providers: [
    RestauranteCrudService
  ]
})
export class RestauranteModule { }
