import { NgModule } from '@angular/core';

import { WebSharedModule } from '../../my-shared/modules/web-shared/web-shared.module';
import { MaterialSharedModule } from '../../my-shared/modules/material-shared/material-shared.module';

import { GestaoRoutingModule } from './gestao-routing.module';
import { GestaoComponent } from './gestao.component';
import { LogoutComponent } from './components/logout/logout.component';



@NgModule({
  declarations: [
    GestaoComponent,
    LogoutComponent
  ],
  imports: [
    WebSharedModule,
    MaterialSharedModule,
    GestaoRoutingModule

  ]
})
export class GestaoModule { }
