import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, take, tap, delay } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

import { ApiCrudService } from '../../../../../my-core/services/api-crud.service';

import { IUser } from '../interfaces/i-user';
import { IResponsePageableUser } from '../interfaces/i-response-pageable-user';

@Injectable({
  providedIn: 'root'
})
export class UserCrudService extends  ApiCrudService<IUser> {

  constructor(protected override  http: HttpClient) {
    super(http, "users");
  }

  findById(id: number): Observable<IUser> {
    let url = `${super.getAPIURL}/${id}`;
    return this.http.get<IUser>(url, {headers: super.getheaders}).pipe(
      delay(2000),
      take(1),
      catchError(this.errorMgmt));
  }


  findByUsername(username: string): Observable<IUser> {

    let url = `${super.getAPIURL}/search/findByUsername?username=${username}`;

    return this.http.get<IUser>(url, {headers: super.getheaders}).pipe(
      take(1),
      catchError(this.errorMgmt));

  }

  //------------------------------


  findAll(page: number, size: number, sort: string, ordem: string): Observable<IResponsePageableUser> {

    //http://localhost:8686/xxxxxx?page=0&size=2&sort=nome,asc

    let url = `${super.getAPIURL}?page=${page}&size=${size}&sort=${sort},${ordem}`;
    return this.http.get<IResponsePageableUser>(url, {headers: super.getheaders}).pipe(
      delay(2000),
      take(1),
      catchError(this.errorMgmt));
  }

  findByNomeIgnoreCaseOrderByNome(nome: string): Observable<IUser> {

    let url = `${super.getAPIURL}/search/findByNomeIgnoreCaseOrderByNome?nome=${nome}`;
    return this.http.get<IUser>(url, {headers: super.getheaders}).pipe(
      take(1),
      catchError(this.errorMgmt));
  }

  findByNomeContainingIgnoreCaseAndActivoOrderByNome(nome: string, activo: boolean, page: number, size: number, sort: string, ordem: string): Observable<IResponsePageableUser> {

    let myactivo = activo? 1: 0;

    let url = `${super.getAPIURL}/search/findByNomeContainingIgnoreCaseAndActivoOrderByNome?nome=${nome}&activo=${myactivo}&page=${page}&size=${size}&sort=${sort},${ordem}`;
    return this.http.get<IResponsePageableUser>(url, {headers: super.getheaders}).pipe(
      take(1),
      catchError(this.errorMgmt));
  }

  findByActivoOrderByNome(activo: boolean, page: number, size: number, sort: string, ordem: string): Observable<IResponsePageableUser> {
    let myactivo = activo? 1: 0;

    let url = `${super.getAPIURL}/search/findByActivoOrderByNome?activo=${myactivo}&page=${page}&size=${size}&sort=${sort},${ordem}`;
    return this.http.get<IResponsePageableUser>(url, {headers: super.getheaders}).pipe(
      take(1),
      catchError(this.errorMgmt));

  }

  //boolean itactivo, Long cid, boolean cactivo
  findByActivoAndItemCardapioCardapioIdAndItemCardapioCardapioActivo(itactivo: boolean, cid: number, cactivo: boolean): Observable<IResponsePageableUser> {
    let myitactivo = itactivo? 1: 0;
    let mycactivo = cactivo? 1: 0;

    let url = `${super.getAPIURL}/search/findByActivoAndItemCardapioCardapioIdAndItemCardapioCardapioActivo?itactivo=${myitactivo}&cid=${cid}&cactivo=${mycactivo}`;
    //console.log(url);
    return this.http.get<IResponsePageableUser>(url, {headers: super.getheaders}).pipe(
      take(1),
      catchError(this.errorMgmt));

  }
}
