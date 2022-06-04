import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PraiamarRoutingModule } from './praiamar-routing.module';
import { PraiamarComponent } from './praiamar.component';


@NgModule({
  declarations: [
    PraiamarComponent
  ],
  imports: [
    CommonModule,
    PraiamarRoutingModule
  ]
})
export class PraiamarModule { }
