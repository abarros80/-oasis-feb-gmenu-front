import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SalinasSeaComponent } from './salinas-sea.component';

const routes: Routes = [{ path: '', component: SalinasSeaComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SalinasSeaRoutingModule { }
