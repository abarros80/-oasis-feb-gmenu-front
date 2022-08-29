import { NgModule } from '@angular/core';

import { WebSharedModule } from '../../../my-shared/modules/web-shared/web-shared.module';
import { MaterialSharedModule } from '../../../my-shared/modules/material-shared/material-shared.module';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';



@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    WebSharedModule,
    MaterialSharedModule,
    LoginRoutingModule,

  ]
})
export class LoginModule { }
