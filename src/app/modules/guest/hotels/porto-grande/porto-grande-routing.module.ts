import { NgModule } from '@angular/core';
import { RouterModule, Routes, ExtraOptions  } from '@angular/router';
import { PortoGrandeComponent } from './porto-grande.component';

import { KalimbaComponent } from './kalimba/kalimba.component';
import { LobbyComponent } from './lobby/lobby.component';
import { RestauranteComponent } from './restaurante/restaurante.component';

const routerOptions: ExtraOptions = {
  scrollPositionRestoration: 'enabled',
  anchorScrolling: 'enabled',
  scrollOffset: [0, 64],
};

const routes: Routes = [
  { path: 'kalimba', component: KalimbaComponent },

  { path: 'lobby', component: LobbyComponent },

  { path: 'restaurante', component: RestauranteComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PortoGrandeRoutingModule { }
