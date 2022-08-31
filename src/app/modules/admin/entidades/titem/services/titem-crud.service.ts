import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, take, tap, delay } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

import { ApiCrudService } from '../../../../../my-core/services/api-crud.service';

import { ITitem } from '../interfaces/i-titem';
import { IResponsePageableTitem } from '../interfaces/i-response-pageable-titem';
import { IReqTitem } from '../interfaces/i-req-titem';



@Injectable({
  providedIn: 'root'
})
export class TitemCrudService extends  ApiCrudService<ITitem> {

  constructor(protected override  http: HttpClient) {
    super(http, "tipoitens");
  }

  // Update
  updateItemFromIReqHotel(record: IReqTitem) {

    let url = `${super.getAPIURL}/${record.id}`;
    return this.http.put<ITitem>(url, record, { 'headers': this.headers }).pipe(

        take(1), //depois da resposta ele faz unsubscribe automaticamente
        catchError(this.errorMgmt)
      );
  }

  // Create
  createHotelFromIReqHotel(record: IReqTitem) {
    let url = `${super.getAPIURL}`;
    return this.http.post(url, record,  {'headers': super.headers})
      .pipe(
        take(1), //depois da resposta ele faz unsubscribe automaticamente
        catchError(this.errorMgmt)
      );
  }

  findById(id: number): Observable<ITitem> {

    let url = `${super.getAPIURL}/${id}`;
    return this.http.get<ITitem>(url, {'headers': super.headers}).pipe(
      delay(2000),
      take(1),
      catchError(this.errorMgmt));
  }

  findAll(page: number, size: number, sort: string, ordem: string): Observable<IResponsePageableTitem> {

    //http://localhost:8686/xxxxxx?page=0&size=2&sort=nome,asc

    let url = `${super.getAPIURL}?page=${page}&size=${size}&sort=${sort},${ordem}`;
    return this.http.get<IResponsePageableTitem>(url, {'headers': super.headers}).pipe(
      delay(2000),
      take(1),
      catchError(this.errorMgmt));
  }

  findByNomeIgnoreCase(nome: string): Observable<ITitem> {

    let url = `${super.getAPIURL}/search/findByNomeIgnoreCase?nome=${nome}`;
    return this.http.get<ITitem>(url, {'headers': super.headers}).pipe(
      take(1),
      catchError(this.errorMgmt));
  }

  findByNomeIgnoreCaseAndActivo(nome: string, activo: boolean): Observable<ITitem> {

    let myactivo = activo? 1: 0;

    let url = `${super.getAPIURL}/search/findByNomeIgnoreCaseAndActivo?nome=${nome}&activo=${myactivo}`;
    return this.http.get<ITitem>(url, {'headers': super.headers}).pipe(
      take(1),
      catchError(this.errorMgmt));
  }

  findByActivoOrderByNomeLIST(activo: boolean): Observable<IResponsePageableTitem> {
    let myactivo = activo? 1: 0;

    let url = `${super.getAPIURL}/search/findByActivoOrderByNome?activo=${myactivo}`;
    return this.http.get<IResponsePageableTitem>(url, {'headers': super.headers}).pipe(
      take(1),
      catchError(this.errorMgmt));

  }

}
