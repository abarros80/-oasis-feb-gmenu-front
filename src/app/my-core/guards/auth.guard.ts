import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../services/login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {


  constructor(
    private loginService: LoginService,
    private router: Router
    ) {
    console.log("AuthGuard - Criado");
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.verificarAcesso();
  }

  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.verificarAcesso();
  }


  private verificarAcesso() {

    if (this.loginService.isUserLoggedIn()) {
      console.log("AuthGuard: verificarAcesso TRUE");
      return true;
    } else {

      this.router.navigate(['/oa-admin/login']);
      console.log("AuthGuard: verificarAcesso FALSE");
      return false;
    }

  }
}
