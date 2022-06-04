import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ItemComponent } from './item.component';

import { DetalheComponent } from './components/crud/detalhe/detalhe.component';
import { ApagarComponent } from './components/crud/apagar/apagar.component';
import { CriaralterarComponent } from './components/crud/criaralterar/criaralterar.component';
import { ListarComponent } from './components/crud/listar/listar.component';

const routes: Routes = [{ path: '', component: ItemComponent,
  children: [

      { path: 'listar', component: ListarComponent },

      { path: 'criar', component: CriaralterarComponent },

      { path: 'resume', component: ItemComponent },

      { path: ':id/ver', component: DetalheComponent },

      { path: ':id/editar', component: CriaralterarComponent },

      { path: ':id/apagar', component: ApagarComponent }
    ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ItemRoutingModule { }
