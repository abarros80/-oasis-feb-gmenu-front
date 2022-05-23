import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginService } from '../login/services/login.service';


@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor {

  constructor(private authenticationService: LoginService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {


    let aaaa: boolean = this.authenticationService.isUserLoggedIn();
    sessionStorage.getItem("authenticatedUser")

    //console.log("Intercept isUserLoggedIn? : ", aaaa);
    //console.log("Intercept isUserLoggedIn - USER_NAME_SESSION_ATTRIBUTE_NAME : ", sessionStorage.getItem("authenticatedUser"));
    //console.log("Intercept isUserLoggedIn - USER_PASSWD_SESSION_ATTRIBUTE_NAME : ", sessionStorage.getItem("authenticatedUserPWD"));


      if (this.authenticationService.isUserLoggedIn() && req.url.indexOf('basicauth') === -1) {
          const authReq = req.clone({
              headers: new HttpHeaders({
                  'Content-Type': 'application/json',
                  'responseType': 'text',
                  'Authorization': `Basic ${window.btoa(sessionStorage.getItem("authenticatedUser") + ":" + sessionStorage.getItem("authenticatedUserPWD"))}`
                  //'Authorization': `Basic ${window.btoa(this.authenticationService.username + ":" + this.authenticationService.password)}`
              })
          });

          console.log("username: ",this.authenticationService.username);
          console.log("password: ",this.authenticationService.password);

          return next.handle(authReq);
      } else {
          return next.handle(req);
      }
  }
}
