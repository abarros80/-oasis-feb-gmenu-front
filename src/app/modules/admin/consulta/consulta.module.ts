import { NgModule } from '@angular/core';
import { WebSharedModule } from '../../../my-shared/modules/web-shared/web-shared.module';
import { MaterialSharedModule } from '../../../my-shared/modules/material-shared/material-shared.module';
import { ComponentsSharedModule } from '../../../my-shared/modules/components-shared/components-shared.module';



import { ConsultaRoutingModule } from './consulta-routing.module';
import { ConsultaComponent } from './consulta.component';



@NgModule({
  declarations: [
    ConsultaComponent
  ],
  imports: [
    WebSharedModule,
    MaterialSharedModule,
    ComponentsSharedModule,
    ConsultaRoutingModule
  ]
})
export class ConsultaModule { }
