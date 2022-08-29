import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { IFormCanDesactivate } from '../../../../../my-shared/interfaces-shared/iform-can-desactivate';

@Injectable({
  providedIn: 'root'
})
export class ItemDesactivateGuard implements CanDeactivate<IFormCanDesactivate> {
  canDeactivate(
    component: IFormCanDesactivate,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      console.log('ItemDesactivateGuard: canDeactivate');


      //Verificar se o formulario mudou

      return component.podeDesativar();
  }

}
