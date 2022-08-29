import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginService } from './login.service';



@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor {

  constructor(private loginService: LoginService) {
    console.log("HttpInterceptorService - Criado ==========================");
  }



  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {


    console.log("Intercept - USER_NAME_SESSION_ATTRIBUTE_NAME : ", sessionStorage.getItem("authenticatedUserName"));
    console.log("Intercept - USER_PASSWD_SESSION_ATTRIBUTE_NAME : ", sessionStorage.getItem("authenticatedUserPWD"));
    console.log("Intercept - isUserLoggedIn : ", this.loginService.isUserLoggedIn() );
    console.log("Intercept - HttpRequest: ", req);


    //CASO USUARIO ESTIVER LOGADO (VARIAVEL NA SESSAO DO WINDOWS) E O PEDIDO NAO FOR SIGNIN, INTERCEPTAR!!!!
    if (this.loginService.isUserLoggedIn() && req.url.indexOf('signin') === -1) {

      console.log("Intercept - PEDIDO FOI INTERCEPTADO E HEADER ALTERADO!!!!!");
        const authReq = req.clone({
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'responseType': 'text',
                'Access-Control-Allow-Origin':'*',
                'Authorization': `Basic ${window.btoa(sessionStorage.getItem("authenticatedUserName") + ":" + sessionStorage.getItem("authenticatedUserPWD"))}`
            })
        });

        return next.handle(authReq);

    } else {
      console.log("Intercept - PEDIDO FOI INTERCEPTADO E HEADER NÂO ALTERADO!!!!!");
        return next.handle(req);
    }


  }
}
