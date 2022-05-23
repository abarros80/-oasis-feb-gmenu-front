import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PaginaNaoEncontradoComponent } from './components/pagina-nao-encontrado/pagina-nao-encontrado.component';
import { InicioComponent } from './components/inicio/inicio.component';

const routes: Routes = [


  { path: 'guest', loadChildren: () => import('./guest/guest.module').then(m => m.GuestModule) },

  { path: 'oa-admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) },



  {
    path: '',
    redirectTo: '/guest',
    pathMatch: 'full'
  },

  { path: '**',component: PaginaNaoEncontradoComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
