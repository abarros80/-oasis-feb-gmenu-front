import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';

import { NgxChartsModule }from '@swimlane/ngx-charts';

import { NgChartsModule } from 'ng2-charts';





@NgModule({
  declarations: [],
  exports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    FlexLayoutModule,
    RouterModule,
    NgxChartsModule,
    NgChartsModule
  ]

})
export class WebSharedModule { }
