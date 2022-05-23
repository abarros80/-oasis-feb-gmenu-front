import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TipoItemComponent } from './tipo-item.component';

const routes: Routes = [{ path: '', component: TipoItemComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TipoItemRoutingModule { }
