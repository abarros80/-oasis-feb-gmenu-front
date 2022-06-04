import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { GuestComponent } from './guest.component';

import { RestbaraaComponent } from './components/restbaraa/restbaraa.component';
import { RestbarbbComponent } from './components/restbarbb/restbarbb.component';
import { RestbarccComponent } from './components/restbarcc/restbarcc.component';

const routes: Routes = [
  { path: '', component: GuestComponent },
  { path: 'panorama', component: RestbaraaComponent },
  { path: 'snack', component: RestbarbbComponent },
  { path: 'evento', component: RestbarccComponent },
  { path: 'portogrande', loadChildren: () => import('./hotels/porto-grande/porto-grande.module').then(m => m.PortoGrandeModule) },
  { path: 'praiamar', loadChildren: () => import('./hotels/praiamar/praiamar.module').then(m => m.PraiamarModule) },
  { path: 'belorizonte', loadChildren: () => import('./hotels/belorizonte/belorizonte.module').then(m => m.BelorizonteModule) },
  { path: 'salinassea', loadChildren: () => import('./hotels/salinas-sea/salinas-sea.module').then(m => m.SalinasSeaModule) }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GuestRoutingModule { }
