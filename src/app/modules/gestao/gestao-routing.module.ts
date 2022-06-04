import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GestaoComponent } from './gestao.component';

const routes: Routes = [

  { path: '', component: GestaoComponent ,
  children: [

    { path: 'tconjunto', loadChildren: () => import('../tipo-conjunto/tipo-conjunto.module').then(m => m.TipoConjuntoModule) },

    { path: 'conjunto', loadChildren: () => import('../conjunto/conjunto.module').then(m => m.ConjuntoModule) },

    { path: 'titem', loadChildren: () => import('../tipo-item/tipo-item.module').then(m => m.TipoItemModule) },

    { path: 'item', loadChildren: () => import('../item/item.module').then(m => m.ItemModule) },

    { path: 'consulta', loadChildren: () => import('../consulta/consulta.module').then(m => m.ConsultaModule) },

    { path: 'entidades', loadChildren: () => import('../admin/entidades/entidades.module').then(m => m.EntidadesModule) }

  ] },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GestaoRoutingModule { }
