import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CardapioComponent } from './cardapio.component';

import { DetalheComponent } from './components/crud/detalhe/detalhe.component';
import { ApagarComponent } from './components/crud/apagar/apagar.component';
import { CriaralterarComponent } from './components/crud/criaralterar/criaralterar.component';
import { ListarComponent } from './components/crud/listar/listar.component';

const routes: Routes = [{ path: '', component: CardapioComponent,
children: [

  { path: 'listar', component: ListarComponent },

  { path: 'criar', component: CriaralterarComponent },

  { path: 'resume', component: CardapioComponent },

  { path: ':id/ver', component: DetalheComponent },

  { path: ':id/editar', component: CriaralterarComponent },

  { path: ':id/apagar', component: ApagarComponent }
] }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CardapioRoutingModule { }
