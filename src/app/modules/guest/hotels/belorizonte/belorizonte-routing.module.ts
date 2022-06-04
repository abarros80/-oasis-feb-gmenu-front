import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BelorizonteComponent } from './belorizonte.component';

const routes: Routes = [{ path: '', component: BelorizonteComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BelorizonteRoutingModule { }
