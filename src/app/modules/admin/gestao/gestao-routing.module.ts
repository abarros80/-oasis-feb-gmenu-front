import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GestaoComponent } from './gestao.component';
import { AuthGuard } from '../../../my-core/guards/auth.guard';

const routes: Routes = [

  { path: '', component: GestaoComponent ,
  children: [

    { path: 'consulta', loadChildren: () => import('../consulta/consulta.module').then(m => m.ConsultaModule) },

    { path: 'entidades', loadChildren: () => import('../entidades/entidades.module').then(m => m.EntidadesModule), }

  ] },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GestaoRoutingModule { }
