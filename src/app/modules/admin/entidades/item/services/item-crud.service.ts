import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, take, tap, delay } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

import { ApiCrudService } from '../../../../../my-core/services/api-crud.service';

import { IItem } from '../interfaces/i-item';
import { IResponsePageableItem } from '../interfaces/i-response-pageable-item';
import { IReqItem } from '../interfaces/i-req-item';


@Injectable({
  providedIn: 'root'
})
export class ItemCrudService extends  ApiCrudService<IItem> {

  constructor(protected override  http: HttpClient) {
    super(http, "itens");
  }

  // Update
  updateItemFromIReqItem(record: IReqItem) {

    let url = `${super.getAPIURL}/${record.id}`;
    return this.http.put<IItem>(url, record, { 'headers': this.headers }).pipe(

        take(1), //depois da resposta ele faz unsubscribe automaticamente
        catchError(this.errorMgmt)
      );
  }

  // Create
  createItemFromIReqItem(record: IReqItem) {
    let url = `${super.getAPIURL}`;
    return this.http.post(url, record,  {'headers': super.headers})
      .pipe(
        take(1), //depois da resposta ele faz unsubscribe automaticamente
        catchError(this.errorMgmt)
      );
  }

  findById(id: number): Observable<IItem> {
    let url = `${super.getAPIURL}/${id}`;
    return this.http.get<IItem>(url, {'headers': super.headers}).pipe(
      delay(2000),
      take(1),
      catchError(this.errorMgmt));
  }

  findAll(page: number, size: number, sort: string, ordem: string): Observable<IResponsePageableItem> {
    console.log("ItemCrudService - findAll");

    //http://localhost:8686/xxxxxx?page=0&size=2&sort=nome,asc

    let url = `${super.getAPIURL}?page=${page}&size=${size}&sort=${sort},${ordem}`;
    return this.http.get<IResponsePageableItem>(url, {'headers': super.headers}).pipe(
      delay(2000),
      take(1),
      catchError(this.errorMgmt));
  }

  findByNomePtIgnoreCaseOrderByNomePt(nome: string): Observable<IItem> {

    let url = `${super.getAPIURL}/search/findByNomePtIgnoreCaseOrderByNomePt?nome=${nome}`;
    return this.http.get<IItem>(url, {'headers': super.headers}).pipe(
      take(1),
      catchError(this.errorMgmt));
  }

  findByNomePtContainingIgnoreCaseAndActivoOrderByNomePt(nome: string, activo: boolean, page: number, size: number, sort: string, ordem: string): Observable<IResponsePageableItem> {

    let myactivo = activo? 1: 0;

    let url = `${super.getAPIURL}/search/findByNomePtContainingIgnoreCaseAndActivoOrderByNomePt?nome=${nome}&activo=${myactivo}&page=${page}&size=${size}&sort=${sort},${ordem}`;
    return this.http.get<IResponsePageableItem>(url, {'headers': super.headers}).pipe(
      take(1),
      catchError(this.errorMgmt));
  }

  findByActivoOrderByNomePt(activo: boolean, page: number, size: number, sort: string, ordem: string): Observable<IResponsePageableItem> {
    let myactivo = activo? 1: 0;

    let url = `${super.getAPIURL}/search/findByActivoOrderByNomePt?activo=${myactivo}&page=${page}&size=${size}&sort=${sort},${ordem}`;
    return this.http.get<IResponsePageableItem>(url, {'headers': super.headers}).pipe(
      take(1),
      catchError(this.errorMgmt));

  }

  //boolean itactivo, Long cid, boolean cactivo
  findByActivoAndItemCardapioCardapioIdAndItemCardapioCardapioActivo(itactivo: boolean, cid: number, cactivo: boolean): Observable<IResponsePageableItem> {
    let myitactivo = itactivo? 1: 0;
    let mycactivo = cactivo? 1: 0;

    let url = `${super.getAPIURL}/search/findByActivoAndItemCardapioCardapioIdAndItemCardapioCardapioActivo?itactivo=${myitactivo}&cid=${cid}&cactivo=${mycactivo}`;
    //console.log(url);
    return this.http.get<IResponsePageableItem>(url, {'headers': super.headers}).pipe(
      take(1),
      catchError(this.errorMgmt));

  }

}
