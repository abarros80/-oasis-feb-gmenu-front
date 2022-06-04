import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, take, tap, delay } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

import { ApiCrudService } from '../../../../../my-core/services/api-crud.service';

import { IItem } from '../interfaces/i-item';
import { IResponsePageableItem } from '../interfaces/i-response-pageable-item';

@Injectable({
  providedIn: 'root'
})
export class ItemCrudService extends  ApiCrudService<IItem> {

  constructor(protected override  http: HttpClient) {
    super(http, "itens");
  }

  findById(id: number): Observable<IItem> {

    let url = `${super.getAPIURL}/${id}`;
    return this.http.get<IItem>(url, {headers: super.getheaders}).pipe(
      delay(2000),
      take(1),
      catchError(this.errorMgmt));
  }

  findAll(page: number, size: number, sort: string, ordem: string): Observable<IResponsePageableItem> {

    //http://localhost:8686/xxxxxx?page=0&size=2&sort=nome,asc

    let url = `${super.getAPIURL}?page=${page}&size=${size}&sort=${sort},${ordem}`;
    return this.http.get<IResponsePageableItem>(url, {headers: super.getheaders}).pipe(
      delay(2000),
      take(1),
      catchError(this.errorMgmt));
  }

  findByNomeIgnoreCaseOrderByNome(nome: string): Observable<IItem> {

    let url = `${super.getAPIURL}/search/findByNomeIgnoreCaseOrderByNome?nome=${nome}`;
    return this.http.get<IItem>(url, {headers: super.getheaders}).pipe(
      take(1),
      catchError(this.errorMgmt));
  }

  findByNomeContainingIgnoreCaseAndActivoOrderByNome(nome: string, activo: boolean, page: number, size: number, sort: string, ordem: string): Observable<IResponsePageableItem> {

    let myactivo = activo? 1: 0;

    let url = `${super.getAPIURL}/search/findByNomeContainingIgnoreCaseAndActivoOrderByNome?nome=${nome}&activo=${myactivo}&page=${page}&size=${size}&sort=${sort},${ordem}`;
    return this.http.get<IResponsePageableItem>(url, {headers: super.getheaders}).pipe(
      take(1),
      catchError(this.errorMgmt));
  }

  findByActivoOrderByNome(activo: boolean, page: number, size: number, sort: string, ordem: string): Observable<IResponsePageableItem> {
    let myactivo = activo? 1: 0;

    let url = `${super.getAPIURL}/search/findByActivoOrderByNome?activo=${myactivo}&page=${page}&size=${size}&sort=${sort},${ordem}`;
    return this.http.get<IResponsePageableItem>(url, {headers: super.getheaders}).pipe(
      take(1),
      catchError(this.errorMgmt));

  }

  //boolean itactivo, Long cid, boolean cactivo
  findByActivoAndItemCardapioCardapioIdAndItemCardapioCardapioActivo(itactivo: boolean, cid: number, cactivo: boolean): Observable<IResponsePageableItem> {
    let myitactivo = itactivo? 1: 0;
    let mycactivo = cactivo? 1: 0;

    let url = `${super.getAPIURL}/search/findByActivoAndItemCardapioCardapioIdAndItemCardapioCardapioActivo?itactivo=${myitactivo}&cid=${cid}&cactivo=${mycactivo}`;
    //console.log(url);
    return this.http.get<IResponsePageableItem>(url, {headers: super.getheaders}).pipe(
      take(1),
      catchError(this.errorMgmt));

  }

}
