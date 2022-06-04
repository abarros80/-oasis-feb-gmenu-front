import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, take, tap, delay } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

import { ApiCrudService } from '../../../../../my-core/services/api-crud.service';

import { ICardapio } from '../interfaces/i-cardapio';
import { IResponsePageableCardapio } from '../interfaces/i-response-pageable-cardapio';

@Injectable({
  providedIn: 'root'
})
export class CardapioCrudService extends  ApiCrudService<ICardapio> {

  constructor(protected override  http: HttpClient) {
    super(http, "cardapios");
  }

  findById(id: number): Observable<ICardapio> {

    let url = `${super.getAPIURL}/${id}`;
    return this.http.get<ICardapio>(url, {headers: super.getheaders}).pipe(
      delay(2000),
      take(1),
      catchError(this.errorMgmt));
  }

  findAll(page: number, size: number, sort: string, ordem: string): Observable<IResponsePageableCardapio> {

    //http://localhost:8686/xxxxxx?page=0&size=2&sort=nome,asc

    let url = `${super.getAPIURL}?page=${page}&size=${size}&sort=${sort},${ordem}`;
    return this.http.get<IResponsePageableCardapio>(url, {headers: super.getheaders}).pipe(
      delay(2000),
      take(1),
      catchError(this.errorMgmt));
  }

  findByNomeIgnoreCaseOrderByNome(nome: string): Observable<ICardapio> {

    let url = `${super.getAPIURL}/search/findByNomeIgnoreCaseOrderByNome?nome=${nome}`;
    return this.http.get<ICardapio>(url, {headers: super.getheaders}).pipe(
      take(1),
      catchError(this.errorMgmt));
  }

  findByNomeContainingIgnoreCaseAndActivoOrderByNome(nome: string, activo: boolean, page: number, size: number, sort: string, ordem: string): Observable<IResponsePageableCardapio> {

    let myactivo = activo? 1: 0;

    let url = `${super.getAPIURL}/search/findByNomeContainingIgnoreCaseAndActivoOrderByNome?nome=${nome}&activo=${myactivo}&page=${page}&size=${size}&sort=${sort},${ordem}`;
    return this.http.get<IResponsePageableCardapio>(url, {headers: super.getheaders}).pipe(
      take(1),
      catchError(this.errorMgmt));
  }

  findByActivoOrderByNome(activo: boolean, page: number, size: number, sort: string, ordem: string): Observable<IResponsePageableCardapio> {
    let myactivo = activo? 1: 0;

    let url = `${super.getAPIURL}/search/findByActivoOrderByNome?activo=${myactivo}&page=${page}&size=${size}&sort=${sort},${ordem}`;
    return this.http.get<IResponsePageableCardapio>(url, {headers: super.getheaders}).pipe(
      take(1),
      catchError(this.errorMgmt));

  }

  //http://localhost:8686/cardapios/search/findByActivoAndRestauranteCardapioRestauranteIdAndRestauranteCardapioRestauranteActivo?activo=1&rid=1&ractivo=1
  findByActivoAndRestauranteCardapioRestauranteIdAndRestauranteCardapioRestauranteActivo(
    cactivo: boolean, rid: number, ractivo: boolean): Observable<IResponsePageableCardapio> {
    let mycactivo = cactivo? 1: 0;
    let myractivo = ractivo? 1: 0;

    let url = `${super.getAPIURL}/search/findByActivoAndRestauranteCardapioRestauranteIdAndRestauranteCardapioRestauranteActivo?activo=${mycactivo}&rid=${rid}&ractivo=${myractivo}`;
    return this.http.get<IResponsePageableCardapio>(url, {headers: super.getheaders}).pipe(
      take(1),
      catchError(this.errorMgmt));

  }

}
