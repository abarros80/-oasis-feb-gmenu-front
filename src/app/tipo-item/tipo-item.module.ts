import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TipoItemRoutingModule } from './tipo-item-routing.module';
import { TipoItemComponent } from './tipo-item.component';


@NgModule({
  declarations: [
    TipoItemComponent
  ],
  imports: [
    CommonModule,
    TipoItemRoutingModule
  ]
})
export class TipoItemModule { }
