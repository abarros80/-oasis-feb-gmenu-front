import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, take, tap, delay } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

import { ApiCrudService } from '../../../../../my-core/services/api-crud.service';

import { IRestaurante } from '../interfaces/i-restaurante';
import { IResponsePageableRestaurante } from '../interfaces/i-response-pageable-restaurante';
import { IReqRestaurante } from '../interfaces/i-req-restaurante';

@Injectable({
  providedIn: 'root'
})
export class RestauranteCrudService extends  ApiCrudService<IRestaurante> {

  constructor(protected override  http: HttpClient) {
    super(http, "restaurantes");
  }

  // Update
  updateItemFromIReqHotel(record: IReqRestaurante) {

    let url = `${super.getAPIURL}/${record.id}`;
    return this.http.put<IRestaurante>(url, record, { 'headers': this.headers }).pipe(

        take(1), //depois da resposta ele faz unsubscribe automaticamente
        catchError(this.errorMgmt)
      );
  }

  // Create
  createHotelFromIReqHotel(record: IReqRestaurante) {
    let url = `${super.getAPIURL}`;
    return this.http.post(url, record,  {'headers': super.headers})
      .pipe(
        take(1), //depois da resposta ele faz unsubscribe automaticamente
        catchError(this.errorMgmt)
      );
  }

  findById(id: number): Observable<IRestaurante> {

    let url = `${super.getAPIURL}/${id}`;
    return this.http.get<IRestaurante>(url, {'headers': super.headers}).pipe(
      delay(2000),
      take(1),
      catchError(this.errorMgmt));
  }

  findAll(page: number, size: number, sort: string, ordem: string): Observable<IResponsePageableRestaurante> {

    //http://localhost:8686/xxxxxx?page=0&size=2&sort=nome,asc

    let url = `${super.getAPIURL}?page=${page}&size=${size}&sort=${sort},${ordem}`;
    return this.http.get<IResponsePageableRestaurante>(url, {'headers': super.headers}).pipe(
      delay(2000),
      take(1),
      catchError(this.errorMgmt));
  }

  findByActivoOrderByNome(activo: boolean, page: number, size: number, sort: string, ordem: string): Observable<IResponsePageableRestaurante> {
    let myactivo = activo? 1: 0;

    let url = `${super.getAPIURL}/search/findByActivoOrderByNome?activo=${myactivo}&page=${page}&size=${size}&sort=${sort},${ordem}`;
    return this.http.get<IResponsePageableRestaurante>(url, {'headers': super.headers}).pipe(
      take(1),
      catchError(this.errorMgmt));

  }



  findByNomeIgnoreCase(nome: string): Observable<IRestaurante> {

    let url = `${super.getAPIURL}/search/findByNomeIgnoreCase?nome=${nome}`;
    return this.http.get<IRestaurante>(url, {'headers': super.headers}).pipe(
      take(1),
      catchError(this.errorMgmt));
  }

  findByNomeContainingIgnoreCaseAndActivoOrderByNome(nome: string, activo: boolean, page: number, size: number, sort: string, ordem: string): Observable<IResponsePageableRestaurante> {

    let myactivo = activo? 1: 0;

    let url = `${super.getAPIURL}/search/findByNomeContainingIgnoreCaseAndActivoOrderByNome?nome=${nome}&activo=${myactivo}&page=${page}&size=${size}&sort=${sort},${ordem}`;
    return this.http.get<IResponsePageableRestaurante>(url, {'headers': super.headers}).pipe(
      take(1),
      catchError(this.errorMgmt));
  }

  findByTelefoneIgnoreCase(telefone: string): Observable<IRestaurante> {

    let url = `${super.getAPIURL}/search/findByTelefoneIgnoreCase?telefone=${telefone}`;
    return this.http.get<IRestaurante>(url, {'headers': super.headers}).pipe(
      take(1),
      catchError(this.errorMgmt));
  }

  findByTelefoneContainingIgnoreCaseAndActivoOrderByTelefone(telefone: string, activo: boolean, page: number, size: number, sort: string, ordem: string): Observable<IResponsePageableRestaurante> {

    let myactivo = activo? 1: 0;

    let url = `${super.getAPIURL}/search/findByTelefoneContainingIgnoreCaseAndActivoOrderByTelefone?telefone=${telefone}&activo=${myactivo}&page=${page}&size=${size}&sort=${sort},${ordem}`;
    return this.http.get<IResponsePageableRestaurante>(url, {'headers': super.headers}).pipe(
      take(1),
      catchError(this.errorMgmt));
  }


  findByNumeroInternoIgnoreCase(num: string): Observable<IRestaurante> {

    let url = `${super.getAPIURL}/search/findByNumeroInternoIgnoreCase?num=${num}`;
    return this.http.get<IRestaurante>(url, {'headers': super.headers}).pipe(
      take(1),
      catchError(this.errorMgmt));
  }

  findByNumeroInternoContainingIgnoreCaseAndActivoOrderByNumeroInterno(num: string, activo: boolean, page: number, size: number, sort: string, ordem: string): Observable<IResponsePageableRestaurante> {

    let myactivo = activo? 1: 0;

    let url = `${super.getAPIURL}/search/findByNumeroInternoContainingIgnoreCaseAndActivoOrderByNumeroInterno?num=${num}&activo=${myactivo}&page=${page}&size=${size}&sort=${sort},${ordem}`;
    return this.http.get<IResponsePageableRestaurante>(url, {'headers': super.headers}).pipe(
      take(1),
      catchError(this.errorMgmt));
  }


  findByHorarioContainingIgnoreCaseAndActivoOrderByHorario(horario: string, activo: boolean, page: number, size: number, sort: string, ordem: string): Observable<IResponsePageableRestaurante> {

    let myactivo = activo? 1: 0;

    let url = `${super.getAPIURL}/search/findByHorarioContainingIgnoreCaseAndActivoOrderByHorario?horario=${horario}&activo=${myactivo}&page=${page}&size=${size}&sort=${sort},${ordem}`;
    return this.http.get<IResponsePageableRestaurante>(url, {'headers': super.headers}).pipe(
      take(1),
      catchError(this.errorMgmt));
  }





  findByIdAndActivoAndHotelIdAndActivo(rid: number, ractivo: boolean, hid: number, hactivo: boolean): Observable<IRestaurante>{

    //http://localhost:8686/restaurantes/search/findByIdAndActivoAndHotelIdAndActivo?rid=1&ra=1&hid=1&ha=1

    let myractivo = ractivo? 1: 0;
    let myhactivo = hactivo? 1: 0;

    let url = `${super.getAPIURL}/search/findByIdAndActivoAndHotelIdAndActivo?rid=${rid}&ra=${myractivo}&hid=${hid}&ha=${myhactivo}`;
    return this.http.get<IRestaurante>(url, {'headers': super.headers}).pipe(
      take(1),
      catchError(this.errorMgmt));

  }

}
