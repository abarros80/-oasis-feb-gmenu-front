import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SalinasSeaRoutingModule } from './salinas-sea-routing.module';
import { SalinasSeaComponent } from './salinas-sea.component';


@NgModule({
  declarations: [
    SalinasSeaComponent
  ],
  imports: [
    CommonModule,
    SalinasSeaRoutingModule
  ]
})
export class SalinasSeaModule { }
