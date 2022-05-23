import { NgModule } from '@angular/core';

import { WebSharedModule } from '../shared/web-shared/web-shared.module';
import { MaterialSharedModule } from '../shared/material-shared/material-shared.module';



import { ConjuntoRoutingModule } from './conjunto-routing.module';

import { ConjuntoComponent } from './conjunto.component';
import { MainMenuComponent } from './components/main-menu/main-menu.component';
import { ListarComponent } from './components/crud/listar/listar.component';
import { ApagarComponent } from './components/crud/apagar/apagar.component';
import { CriaralterarComponent } from './components/crud/criaralterar/criaralterar.component';
import { DetalheComponent } from './components/crud/detalhe/detalhe.component';
import { ResumeComponent } from './components/resume/resume.component';


import { ConjuntoCrudService } from './services/conjunto-crud.service';



@NgModule({
  declarations: [
    ConjuntoComponent,
    MainMenuComponent,
    ListarComponent,
    ApagarComponent,
    CriaralterarComponent,
    DetalheComponent,
    ResumeComponent
  ],
  imports: [
    WebSharedModule,
    MaterialSharedModule,
    ConjuntoRoutingModule
  ],
  providers: [
    ConjuntoCrudService
  ]
})
export class ConjuntoModule { }
