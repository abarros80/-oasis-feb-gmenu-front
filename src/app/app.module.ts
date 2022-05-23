import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { MyCoreModule } from './my-core/my-core.module';

import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginModule } from './modules/login/login.module';
import { ComponentsModule } from './my-shared/modules/components/components.module';



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
    ComponentsModule

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
