import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, take, tap, delay } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

import { ApiCrudService } from '../../../../../my-core/services/api-crud.service';

import { ICardapio } from '../interfaces/i-cardapio';
import { IResponsePageableCardapio } from '../interfaces/i-response-pageable-cardapio';
import { IReqCardapio } from '../interfaces/i-req-cardapio';

@Injectable({
  providedIn: 'root'
})
export class CardapioCrudService extends  ApiCrudService<ICardapio> {

  constructor(protected override  http: HttpClient) {
    super(http, "cardapios");
  }

  // Update
  updateFromIReqHotel(record: IReqCardapio) {

    let url = `${super.getAPIURL}/${record.id}`;
    return this.http.put<ICardapio>(url, record, { 'headers': this.headers }).pipe(

        take(1), //depois da resposta ele faz unsubscribe automaticamente
        catchError(this.errorMgmt)
      );
  }

  // Create
  createFromIReqHotel(record: IReqCardapio) {
    let url = `${super.getAPIURL}`;
    return this.http.post(url, record,  {'headers': super.headers})
      .pipe(
        take(1), //depois da resposta ele faz unsubscribe automaticamente
        catchError(this.errorMgmt)
      );
  }

  findById(id: number): Observable<ICardapio> {

    let url = `${super.getAPIURL}/${id}`;
    return this.http.get<ICardapio>(url, {'headers': super.headers}).pipe(
      delay(2000),
      take(1),
      catchError(this.errorMgmt));
  }

  findAll(page: number, size: number, sort: string, ordem: string): Observable<IResponsePageableCardapio> {

    //http://localhost:8686/xxxxxx?page=0&size=2&sort=nome,asc

    let url = `${super.getAPIURL}?page=${page}&size=${size}&sort=${sort},${ordem}`;
    return this.http.get<IResponsePageableCardapio>(url, {'headers': super.headers}).pipe(
      delay(2000),
      take(1),
      catchError(this.errorMgmt));
  }

  //ACTIVO

  findByActivo(activo: boolean, page: number, size: number, sort: string, ordem: string): Observable<IResponsePageableCardapio> {
    let myactivo = activo? 1: 0;

    let url = `${super.getAPIURL}/search/findByActivo?activo=${myactivo}&page=${page}&size=${size}&sort=${sort},${ordem}`;
    return this.http.get<IResponsePageableCardapio>(url, {'headers': super.headers}).pipe(
      take(1),
      catchError(this.errorMgmt));

  }

  //HOTEL

  findByHotelId(hid: string, page: number, size: number, sort: string, ordem: string): Observable<IResponsePageableCardapio> {

    let url = `${super.getAPIURL}/search/findByHotelId?hid=${hid}&page=${page}&size=${size}&sort=${sort},${ordem}`;
    return this.http.get<IResponsePageableCardapio>(url, {'headers': super.headers}).pipe(
      take(1),
      catchError(this.errorMgmt));
  }

  findByActivoAndHotelId(activo: boolean, hid: string, page: number, size: number, sort: string, ordem: string): Observable<IResponsePageableCardapio> {
    let myactivo = activo? 1: 0;

    let url = `${super.getAPIURL}/search/findByActivoAndHotelId?activo=${myactivo}&hid=${hid}&page=${page}&size=${size}&sort=${sort},${ordem}`;
    return this.http.get<IResponsePageableCardapio>(url, {'headers': super.headers}).pipe(
      take(1),
      catchError(this.errorMgmt));
  }

  //USER
  findByHotelUsersId(uid: string, page: number, size: number, sort: string, ordem: string): Observable<IResponsePageableCardapio> {

    let url = `${super.getAPIURL}/search/findByHotelUsersId?uid=${uid}&page=${page}&size=${size}&sort=${sort},${ordem}`;
    return this.http.get<IResponsePageableCardapio>(url, {'headers': super.headers}).pipe(
      take(1),
      catchError(this.errorMgmt));
  }

  //HOTEl e RESTAURANTE
  findByActivoAndHotelIdAndRestauranteCardapioRestauranteId(activo: boolean, hid: string, rid: string, page: number, size: number, sort: string, ordem: string): Observable<IResponsePageableCardapio> {
    let myactivo = activo? 1: 0;

    let url = `${super.getAPIURL}/search/findByActivoAndHotelIdAndRestauranteCardapioRestauranteId?activo=${myactivo}&hid=${hid}&rid=${rid}&page=${page}&size=${size}&sort=${sort},${ordem}`;
    return this.http.get<IResponsePageableCardapio>(url, {'headers': super.headers}).pipe(
      take(1),
      catchError(this.errorMgmt));
  }

  findByHotelIdAndRestauranteCardapioRestauranteId(hid: string, rid: string, page: number, size: number, sort: string, ordem: string): Observable<IResponsePageableCardapio> {

    let url = `${super.getAPIURL}/search/findByHotelIdAndRestauranteCardapioRestauranteId?hid=${hid}&rid=${rid}&page=${page}&size=${size}&sort=${sort},${ordem}`;
    return this.http.get<IResponsePageableCardapio>(url, {'headers': super.headers}).pipe(
      take(1),
      catchError(this.errorMgmt));
  }



  //CODIGO_REDUZIDO
  findByCodigoReduzidoContainingIgnoreCaseAndActivo(codigo: string, activo: boolean, page: number, size: number, sort: string, ordem: string): Observable<IResponsePageableCardapio> {
    let myactivo = activo? 1: 0;
    let url = `${super.getAPIURL}/search/findByCodigoReduzidoContainingIgnoreCaseAndActivo?codigo=${codigo}&activo=${myactivo}&page=${page}&size=${size}&sort=${sort},${ordem}`;
    return this.http.get<IResponsePageableCardapio>(url, {'headers': super.headers}).pipe(
      take(1),
      catchError(this.errorMgmt));
  }

  findByCodigoReduzidoContainingIgnoreCaseAndActivoAndHotelIdAndRestauranteCardapioRestauranteId(codigo: string, activo: boolean, hid: string, rid: string, page: number, size: number, sort: string, ordem: string): Observable<IResponsePageableCardapio> {
    let myactivo = activo? 1: 0;
    let url = `${super.getAPIURL}/search/findByCodigoReduzidoContainingIgnoreCaseAndActivoAndHotelIdAndRestauranteCardapioRestauranteId?codigo=${codigo}&activo=${myactivo}&hid=${hid}&rid=${rid}&page=${page}&size=${size}&sort=${sort},${ordem}`;
    return this.http.get<IResponsePageableCardapio>(url, {'headers': super.headers}).pipe(
      take(1),
      catchError(this.errorMgmt));
  }

  //NOME_PT
  findByNomePtContainingIgnoreCaseAndActivo(nome: string, activo: boolean, page: number, size: number, sort: string, ordem: string): Observable<IResponsePageableCardapio> {

    let myactivo = activo? 1: 0;

    let url = `${super.getAPIURL}/search/findByNomePtContainingIgnoreCaseAndActivo?nome=${nome}&activo=${myactivo}&page=${page}&size=${size}&sort=${sort},${ordem}`;
    return this.http.get<IResponsePageableCardapio>(url, {'headers': super.headers}).pipe(
      take(1),
      catchError(this.errorMgmt));
  }

  findByNomePtContainingIgnoreCaseAndActivoAndHotelIdAndRestauranteCardapioRestauranteId(nome: string, activo: boolean, hid: string, rid: string, page: number, size: number, sort: string, ordem: string): Observable<IResponsePageableCardapio> {

    let myactivo = activo? 1: 0;

    let url = `${super.getAPIURL}/search/findByNomePtContainingIgnoreCaseAndActivoAndHotelIdAndRestauranteCardapioRestauranteId?nome=${nome}&activo=${myactivo}&hid=${hid}&rid=${rid}&page=${page}&size=${size}&sort=${sort},${ordem}`;
    return this.http.get<IResponsePageableCardapio>(url, {'headers': super.headers}).pipe(
      take(1),
      catchError(this.errorMgmt));
  }

  //NOME_ING
  findByNomeIngContainingIgnoreCaseAndActivo(nome: string, activo: boolean, page: number, size: number, sort: string, ordem: string): Observable<IResponsePageableCardapio> {

    let myactivo = activo? 1: 0;

    let url = `${super.getAPIURL}/search/findByNomeIngContainingIgnoreCaseAndActivo?nome=${nome}&activo=${myactivo}&page=${page}&size=${size}&sort=${sort},${ordem}`;
    return this.http.get<IResponsePageableCardapio>(url, {'headers': super.headers}).pipe(
      take(1),
      catchError(this.errorMgmt));
  }

  findByNomeIngContainingIgnoreCaseAndActivoAndHotelIdAndRestauranteCardapioRestauranteId(nome: string, activo: boolean, hid: string, rid: string, page: number, size: number, sort: string, ordem: string): Observable<IResponsePageableCardapio> {

    let myactivo = activo? 1: 0;

    let url = `${super.getAPIURL}/search/findByNomeIngContainingIgnoreCaseAndActivoAndHotelIdAndRestauranteCardapioRestauranteId?nome=${nome}&activo=${myactivo}&hid=${hid}&rid=${rid}&page=${page}&size=${size}&sort=${sort},${ordem}`;
    return this.http.get<IResponsePageableCardapio>(url, {'headers': super.headers}).pipe(
      take(1),
      catchError(this.errorMgmt));
  }

  //NOME_FR
  findByNomeFrContainingIgnoreCaseAndActivo(nome: string, activo: boolean, page: number, size: number, sort: string, ordem: string): Observable<IResponsePageableCardapio> {

    let myactivo = activo? 1: 0;

    let url = `${super.getAPIURL}/search/findByNomeFrContainingIgnoreCaseAndActivo?nome=${nome}&activo=${myactivo}&page=${page}&size=${size}&sort=${sort},${ordem}`;
    return this.http.get<IResponsePageableCardapio>(url, {'headers': super.headers}).pipe(
      take(1),
      catchError(this.errorMgmt));
  }

  findByNomeFrContainingIgnoreCaseAndActivoAndHotelIdAndRestauranteCardapioRestauranteId(nome: string, activo: boolean, hid: string, rid: string, page: number, size: number, sort: string, ordem: string): Observable<IResponsePageableCardapio> {

    let myactivo = activo? 1: 0;

    let url = `${super.getAPIURL}/search/findByNomeFrContainingIgnoreCaseAndActivoAndHotelIdAndRestauranteCardapioRestauranteId?nome=${nome}&activo=${myactivo}&hid=${hid}&rid=${rid}&page=${page}&size=${size}&sort=${sort},${ordem}`;
    return this.http.get<IResponsePageableCardapio>(url, {'headers': super.headers}).pipe(
      take(1),
      catchError(this.errorMgmt));
  }



  //http://localhost:8686/cardapios/search/findByActivoAndRestauranteCardapioRestauranteIdAndRestauranteCardapioRestauranteActivo?activo=1&rid=1&ractivo=1
  findByActivoAndRestauranteCardapioRestauranteIdAndRestauranteCardapioRestauranteActivo(
    cactivo: boolean, rid: number, ractivo: boolean): Observable<IResponsePageableCardapio> {
    let mycactivo = cactivo? 1: 0;
    let myractivo = ractivo? 1: 0;

    let url = `${super.getAPIURL}/search/findByActivoAndRestauranteCardapioRestauranteIdAndRestauranteCardapioRestauranteActivo?activo=${mycactivo}&rid=${rid}&ractivo=${myractivo}`;
    return this.http.get<IResponsePageableCardapio>(url, {'headers': super.headers}).pipe(
      take(1),
      catchError(this.errorMgmt));

  }

}
