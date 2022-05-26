import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, take, tap, delay } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

import { ApiCrudService } from '../../../my-core/services/api-crud.service';
import { TipoConjunto } from '../models/tipo-conjunto';
import { ResponsePageableTipoConjunto } from '../interfaces/response-pageable-tipo-conjunto';

@Injectable()
export class TipoConjuntoCrudService  extends  ApiCrudService<TipoConjunto>{

  constructor(protected override  http: HttpClient) {
    super(http, "tipoconjuntos");
  }

  findAll(page: number, size: number, sort: string, ordem: string): Observable<ResponsePageableTipoConjunto> {

    //http://localhost:8686/tipoconjuntos?page=0&size=2&sort=nome,asc

    let url = `${super.getAPIURL}?page=${page}&size=${size}&sort=${sort},${ordem}`;
    return this.http.get<ResponsePageableTipoConjunto>(url, {headers: super.getheaders}).pipe(
      delay(2000),
      take(1),
      catchError(this.errorMgmt));
  }

  findByNomeIgnoreCaseOrderByNome(nome: string): Observable<TipoConjunto> {

    let url = `${super.getAPIURL}/search/findByNomeIgnoreCaseOrderByNome?nome=${nome}`;
    return this.http.get<TipoConjunto>(url, {headers: super.getheaders}).pipe(
      take(1),
      catchError(this.errorMgmt));
  }


  findByNomeContainingIgnoreCaseAndActivoOrderByNome(nome: string, activo: boolean, page: number, size: number, sort: string, ordem: string): Observable<ResponsePageableTipoConjunto> {

    let myactivo = activo? 1: 0;

    let url = `${super.getAPIURL}/search/findByNomeContainingIgnoreCaseAndActivoOrderByNome?nome=${nome}&activo=${myactivo}&page=${page}&size=${size}&sort=${sort},${ordem}`;
    return this.http.get<ResponsePageableTipoConjunto>(url, {headers: super.getheaders}).pipe(
      take(1),
      catchError(this.errorMgmt));
  }


  findByActivoOrderByNome(activo: boolean, page: number, size: number, sort: string, ordem: string): Observable<ResponsePageableTipoConjunto> {
    let myactivo = activo? 1: 0;

    let url = `${super.getAPIURL}/search/findByActivoOrderByNome?activo=${myactivo}&page=${page}&size=${size}&sort=${sort},${ordem}`;
    return this.http.get<ResponsePageableTipoConjunto>(url, {headers: super.getheaders}).pipe(
      take(1),
      catchError(this.errorMgmt));

  }

  findByTipoConjuntoId(id: number): Observable<TipoConjunto> {

    let url = `${super.getAPIURL}/search/findByTipoConjuntoId?id=${id}`;
    return this.http.get<TipoConjunto>(url, {headers: super.getheaders}).pipe(
      take(1),
      catchError(this.errorMgmt));
  }

}
