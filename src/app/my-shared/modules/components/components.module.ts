import { NgModule } from '@angular/core';

import { InicioComponent } from './inicio/inicio.component';
import { PaginaNaoEncontradoComponent } from './pagina-nao-encontrado/pagina-nao-encontrado.component';
import { WebSharedModule } from '../web-shared/web-shared.module';
import { MaterialSharedModule } from '../material-shared/material-shared.module';




@NgModule({
  declarations: [
    PaginaNaoEncontradoComponent,
    InicioComponent

  ],
  imports: [
    WebSharedModule,
    MaterialSharedModule
  ],
  exports: [
    PaginaNaoEncontradoComponent,
    InicioComponent
  ]

})
export class ComponentsModule { }
