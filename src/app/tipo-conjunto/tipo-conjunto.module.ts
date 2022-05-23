import { NgModule } from '@angular/core';

import { WebSharedModule } from '../shared/web-shared/web-shared.module';
import { MaterialSharedModule } from '../shared/material-shared/material-shared.module';


import { TipoConjuntoRoutingModule } from './tipo-conjunto-routing.module';

import { TipoConjuntoComponent } from './tipo-conjunto.component';
import { MainMenuComponent } from './components/main-menu/main-menu.component';
import { ListarComponent } from './components/crud/listar/listar.component';
import { ApagarComponent } from './components/crud/apagar/apagar.component';
import { CriaralterarComponent } from './components/crud/criaralterar/criaralterar.component';
import { DetalheComponent } from './components/crud/detalhe/detalhe.component';
import { ResumeComponent } from './components/resume/resume.component';

import { TipoConjuntoCrudService } from './services/tipo-conjunto-crud.service';
import { ListarfilhosComponent } from './components/listarfilhos/listarfilhos.component';




@NgModule({
  declarations: [
    TipoConjuntoComponent,
    MainMenuComponent,
    ListarComponent,
    ApagarComponent,
    CriaralterarComponent,
    DetalheComponent,
    ResumeComponent,
    ListarfilhosComponent
  ],
  imports: [
    TipoConjuntoRoutingModule,
    MaterialSharedModule,
    WebSharedModule

  ],
  providers: [
    TipoConjuntoCrudService
  ]
})
export class TipoConjuntoModule { }
