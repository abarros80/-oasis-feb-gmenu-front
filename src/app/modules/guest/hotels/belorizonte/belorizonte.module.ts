import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BelorizonteRoutingModule } from './belorizonte-routing.module';
import { BelorizonteComponent } from './belorizonte.component';


@NgModule({
  declarations: [
    BelorizonteComponent
  ],
  imports: [
    CommonModule,
    BelorizonteRoutingModule
  ]
})
export class BelorizonteModule { }
