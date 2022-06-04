import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, take, tap, delay } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

import { ApiCrudService } from '../../../../../my-core/services/api-crud.service';

import { ITitem } from '../interfaces/i-titem';
import { IResponsePageableTitem } from '../interfaces/i-response-pageable-titem';



@Injectable({
  providedIn: 'root'
})
export class TitemCrudService extends  ApiCrudService<ITitem> {

  constructor(protected override  http: HttpClient) {
    super(http, "restaurantes");
  }

  findById(id: number): Observable<ITitem> {

    let url = `${super.getAPIURL}/${id}`;
    return this.http.get<ITitem>(url, {headers: super.getheaders}).pipe(
      delay(2000),
      take(1),
      catchError(this.errorMgmt));
  }

  findAll(page: number, size: number, sort: string, ordem: string): Observable<IResponsePageableTitem> {

    //http://localhost:8686/xxxxxx?page=0&size=2&sort=nome,asc

    let url = `${super.getAPIURL}?page=${page}&size=${size}&sort=${sort},${ordem}`;
    return this.http.get<IResponsePageableTitem>(url, {headers: super.getheaders}).pipe(
      delay(2000),
      take(1),
      catchError(this.errorMgmt));
  }

  findByNomeIgnoreCaseOrderByNome(nome: string): Observable<ITitem> {

    let url = `${super.getAPIURL}/search/findByNomeIgnoreCaseOrderByNome?nome=${nome}`;
    return this.http.get<ITitem>(url, {headers: super.getheaders}).pipe(
      take(1),
      catchError(this.errorMgmt));
  }

  findByNomeContainingIgnoreCaseAndActivoOrderByNome(nome: string, activo: boolean, page: number, size: number, sort: string, ordem: string): Observable<IResponsePageableTitem> {

    let myactivo = activo? 1: 0;

    let url = `${super.getAPIURL}/search/findByNomeContainingIgnoreCaseAndActivoOrderByNome?nome=${nome}&activo=${myactivo}&page=${page}&size=${size}&sort=${sort},${ordem}`;
    return this.http.get<IResponsePageableTitem>(url, {headers: super.getheaders}).pipe(
      take(1),
      catchError(this.errorMgmt));
  }

  findByActivoOrderByNome(activo: boolean, page: number, size: number, sort: string, ordem: string): Observable<IResponsePageableTitem> {
    let myactivo = activo? 1: 0;

    let url = `${super.getAPIURL}/search/findByActivoOrderByNome?activo=${myactivo}&page=${page}&size=${size}&sort=${sort},${ordem}`;
    return this.http.get<IResponsePageableTitem>(url, {headers: super.getheaders}).pipe(
      take(1),
      catchError(this.errorMgmt));

  }

}
