import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PaginaNaoEncontradoComponent } from './components/pagina-nao-encontrado/pagina-nao-encontrado.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { ApiCrudService } from './services/api-crud.service';
import { LoginModule } from './login/login.module';
import { LoginService } from './login/services/login.service';
import { HttpInterceptorService } from './services/http-interceptor.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MaterialSharedModule } from './shared/material-shared/material-shared.module';
import { WebSharedModule } from './shared/web-shared/web-shared.module';

@NgModule({
  declarations: [
    AppComponent,
    PaginaNaoEncontradoComponent,
    InicioComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    LoginModule,
    MaterialSharedModule,
    WebSharedModule
  ],
  providers: [
    ApiCrudService,
    LoginService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
