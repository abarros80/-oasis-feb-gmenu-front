import { NgModule } from '@angular/core';

import { InicioComponent } from './inicio/inicio.component';
import { PaginaNaoEncontradoComponent } from './pagina-nao-encontrado/pagina-nao-encontrado.component';
import { WebSharedModule } from '../web-shared/web-shared.module';
import { MaterialSharedModule } from '../material-shared/material-shared.module';
import { DialogoConfirmacaoComponent } from './dialogo-confirmacao/dialogo-confirmacao.component';




@NgModule({
  declarations: [
    PaginaNaoEncontradoComponent,
    InicioComponent,
    DialogoConfirmacaoComponent

  ],
  imports: [
    WebSharedModule,
    MaterialSharedModule,
    MaterialSharedModule
  ],
  exports: [
    PaginaNaoEncontradoComponent,
    InicioComponent,
    DialogoConfirmacaoComponent
  ],
  entryComponents: [DialogoConfirmacaoComponent]

})
export class ComponentsSharedModule { }
