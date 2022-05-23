import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConjuntoComponent } from './conjunto.component';

import { ApagarComponent } from './components/crud/apagar/apagar.component';
import { CriaralterarComponent } from './components/crud/criaralterar/criaralterar.component';
import { ListarComponent } from './components/crud/listar/listar.component';
import { ResumeComponent } from './components/resume/resume.component';

const routes: Routes = [

  {
    path: '', component: ConjuntoComponent,
    children: [

      { path: 'listar', component: ListarComponent },

      { path: 'apagar', component: ApagarComponent },

      { path: 'criar', component: CriaralterarComponent },

      { path: 'resume', component: ResumeComponent },

      { path: ':id/ver', component: CriaralterarComponent },

      { path: ':id/editar', component: CriaralterarComponent }

  ]

}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConjuntoRoutingModule { }
