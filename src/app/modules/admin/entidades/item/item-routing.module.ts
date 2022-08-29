import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ItemComponent } from './item.component';

import { DetalheComponent } from './components/crud/detalhe/detalhe.component';
import { ApagarComponent } from './components/crud/apagar/apagar.component';
import { CriaralterarComponent } from './components/crud/criaralterar/criaralterar.component';
import { ListarComponent } from './components/crud/listar/listar.component';
import { ItemGuard } from './guards/item.guard';
import { ItemDesactivateGuard } from './guards/item-desactivate.guard';

const routes: Routes = [{ path: '', component: ItemComponent,
  canActivateChild: [ItemGuard],
  children: [

      { path: 'listar', component: ListarComponent },

      {
        path: 'criar', component: CriaralterarComponent,
        canDeactivate: [ItemDesactivateGuard]
      },

      { path: 'resume', component: ItemComponent },

      { path: ':id/ver', component: DetalheComponent },

      {
        path: ':id/editar', component: CriaralterarComponent,
        canDeactivate: [ItemDesactivateGuard]
      },

      { path: ':id/apagar', component: ApagarComponent }

    ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ItemRoutingModule { }
