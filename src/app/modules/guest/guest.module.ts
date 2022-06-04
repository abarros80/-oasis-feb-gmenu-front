import { NgModule } from '@angular/core';
import { WebSharedModule } from '../../my-shared/modules/web-shared/web-shared.module';
import { MaterialSharedModule } from '../../my-shared/modules/material-shared/material-shared.module';

import { GuestRoutingModule } from './guest-routing.module';

import { GuestComponent } from './guest.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { RestbaraaComponent } from './components/restbaraa/restbaraa.component';
import { RestbarbbComponent } from './components/restbarbb/restbarbb.component';
import { RestbarccComponent } from './components/restbarcc/restbarcc.component';



@NgModule({
  declarations: [
    GuestComponent,
    HeaderComponent,
    FooterComponent,
    RestbaraaComponent,
    RestbarbbComponent,
    RestbarccComponent
  ],
  imports: [
    WebSharedModule,
    MaterialSharedModule,
    GuestRoutingModule

  ]
})
export class GuestModule { }
