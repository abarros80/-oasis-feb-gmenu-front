import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map, take, tap, delay } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

import { environment } from 'src/environments/environment.prod';
import { Login } from '../../my-shared/models/login';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin':'*',
    'responseType': 'text'
  })
};

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  //headers = new HttpHeaders().set('Content-Type', 'application/json');


  USER_ID_SESSION_ATTRIBUTE_NAME = 'authenticatedUserID'
  USER_NAME_SESSION_ATTRIBUTE_NAME = 'authenticatedUserName'
  USER_PASSWD_SESSION_ATTRIBUTE_NAME = 'authenticatedUserPWD'

  public username: String | null  = "";
  public password: String | null  = "";

  private  API_URL: String;

  constructor(
    private http: HttpClient,
    private router: Router
  ) {

      this.API_URL = environment.API+"auth/";
      console.log("LoginService: API_URL: "+this.API_URL);

  }


  login(obj: Login) {
    let url = `${this.API_URL}`+"signin";

    this.username = obj.usernameOrEmail;
    this.password = obj.password;

    //console.log("OBJ: "+ obj);
    return this.http.post(url, obj, httpOptions)
      .pipe(
        take(1), //depois da resposta ele faz unsubscribe automaticamente
        catchError(this.errorMgmt)
      );
  }

  // Error handling
  errorMgmt(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }

  createBasicAuthToken(username: String, password: String) {
    return 'Basic ' + window.btoa(username + ":" + password)
  }

  registerSuccessfulLogin(userid:number, username: string, password: string) {
    sessionStorage.setItem(this.USER_ID_SESSION_ATTRIBUTE_NAME, userid+"");
    sessionStorage.setItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME, username);
    sessionStorage.setItem(this.USER_PASSWD_SESSION_ATTRIBUTE_NAME, password)

  }

  logout() {
    sessionStorage.removeItem(this.USER_ID_SESSION_ATTRIBUTE_NAME);
    sessionStorage.removeItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME);
    sessionStorage.removeItem(this.USER_PASSWD_SESSION_ATTRIBUTE_NAME);
    this.username = null;
    this.password = null;
    this.router.navigate(['/oa-admin/login']);
  }

  isUserLoggedIn() {
    let user = sessionStorage.getItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME)
    if (user === null || user == "") return false
    return true
  }

  getLoggedInUserName() {
    let user = sessionStorage.getItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME)
    if (user === null) return ''
    return user
  }
  getLoggedInID() {
    let id = sessionStorage.getItem(this.USER_ID_SESSION_ATTRIBUTE_NAME)
    if (id === null) return ''
    return id
  }

}
