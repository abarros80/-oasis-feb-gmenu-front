
import { NgModule, Optional, SkipSelf } from '@angular/core';


import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpInterceptorService } from './services/http-interceptor.service';
import { ApiCrudService } from './services/api-crud.service';
import { LoginService } from './services/login.service';
import { AuthGuard } from './guards/auth.guard';
import { DialogService } from './services/dialog.service';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { PaginatorPtIntl } from './services/paginator-pt-intl';
import { OaPdfService } from './services/oa-pdf.service';
import { OaFileUploadService } from './services/oa-file-upload.service';
import { OaExelService } from './services/oa-exel.service';
import { MAT_DATE_LOCALE } from '@angular/material/core';





@NgModule({
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },

    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true
    },
    {
      provide: MatPaginatorIntl,
      useClass: PaginatorPtIntl
    },
    ApiCrudService,
    LoginService,
    DialogService,
    AuthGuard,
    OaPdfService,
    OaFileUploadService,
    OaExelService

  ]
})
export class MyCoreModule {


  constructor(@Optional() @SkipSelf() parentModule: MyCoreModule) {
    if (parentModule) {
      throw new Error(
        'CoreModule is already loaded. Import it in the AppModule only'
      );
    }
  }

 }
