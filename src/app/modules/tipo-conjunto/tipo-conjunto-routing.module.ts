import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TipoConjuntoComponent } from './tipo-conjunto.component';

import { ApagarComponent } from './components/crud/apagar/apagar.component';
import { CriaralterarComponent } from './components/crud/criaralterar/criaralterar.component';
import { ListarComponent } from './components/crud/listar/listar.component';
import { ResumeComponent } from './components/resume/resume.component';
import { ListarfilhosComponent } from './components/listarfilhos/listarfilhos.component';

const routes: Routes = [

  {
    path: '', component: TipoConjuntoComponent,
    children: [

      { path: 'listar', component: ListarComponent },

      { path: 'criar', component: CriaralterarComponent },

      { path: 'resume', component: ResumeComponent },

      { path: ':id/ver', component: CriaralterarComponent },

      { path: ':id/editar', component: CriaralterarComponent },

      { path: ':id/apagar', component: ApagarComponent },

      { path: ':id/filhos', component: ListarfilhosComponent }

  ]

}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TipoConjuntoRoutingModule { }
