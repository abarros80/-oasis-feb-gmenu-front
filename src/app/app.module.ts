import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { MyCoreModule } from './my-core/my-core.module';

import { FormsModule } from '@angular/forms';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginModule } from './modules/admin/login/login.module';
import { ComponentsSharedModule } from './my-shared/modules/components-shared/components-shared.module';






@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    MyCoreModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,

    LoginModule,
    ComponentsSharedModule

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
