import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PraiamarComponent } from './praiamar.component';

const routes: Routes = [{ path: '', component: PraiamarComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PraiamarRoutingModule { }
