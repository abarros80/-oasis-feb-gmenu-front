import { NgModule } from '@angular/core';

import { WebSharedModule } from '../shared/web-shared/web-shared.module';
import { MaterialSharedModule } from '../shared/material-shared/material-shared.module';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';

import { LoginService } from './services/login.service';


@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    WebSharedModule,
    MaterialSharedModule,
    LoginRoutingModule,

  ],
  providers: [
    LoginService
  ]
})
export class LoginModule { }
