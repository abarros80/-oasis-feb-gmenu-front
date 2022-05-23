import { NgModule } from '@angular/core';

import { WebSharedModule } from '../shared/web-shared/web-shared.module';
import { MaterialSharedModule } from '../shared/material-shared/material-shared.module';



import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { MainHeaderComponent } from './components/header/main-header/main-header.component';
import { MainFooterComponent } from './components/footer/main-footer/main-footer.component';



@NgModule({
  declarations: [
    AdminComponent,
    MainHeaderComponent,
    MainFooterComponent,


  ],
  imports: [

    WebSharedModule,
    MaterialSharedModule,
    AdminRoutingModule,

  ]
})
export class AdminModule { }
