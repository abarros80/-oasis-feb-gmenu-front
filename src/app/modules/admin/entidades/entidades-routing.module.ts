import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EntidadesComponent } from './entidades.component';

const routes: Routes = [
  { path: '', component: EntidadesComponent },
  { path: 'hotel', loadChildren: () => import('./hotel/hotel.module').then(m => m.HotelModule) },
  { path: 'item', loadChildren: () => import('./item/item.module').then(m => m.ItemModule) },
  { path: 'restaurante', loadChildren: () => import('./restaurante/restaurante.module').then(m => m.RestauranteModule) },
  { path: 'cardapio', loadChildren: () => import('./cardapio/cardapio.module').then(m => m.CardapioModule) },
  { path: 'titem', loadChildren: () => import('./titem/titem.module').then(m => m.TitemModule) }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EntidadesRoutingModule { }
