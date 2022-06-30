import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, take, tap, delay } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

import { ApiCrudService } from '../../../../../my-core/services/api-crud.service';

import { IResponsePageableHotel } from '../interfaces/i-response-pageable-hotel';
import { IHotel } from '../interfaces/i-hotel';

@Injectable({
  providedIn: 'root'
})
export class HotelCrudService  extends  ApiCrudService<IHotel> {

  constructor(protected override  http: HttpClient) {
    super(http, "hoteis");
  }

  findById(id: number): Observable<IHotel> {

    let url = `${super.getAPIURL}/${id}`;
    return this.http.get<IHotel>(url, {headers: super.getheaders}).pipe(
      delay(2000),
      take(1),
      catchError(this.errorMgmt));
  }

  findAll(page: number, size: number, sort: string, ordem: string): Observable<IResponsePageableHotel> {

    //http://localhost:8686/xxxxxx?page=0&size=2&sort=nome,asc

    let url = `${super.getAPIURL}?page=${page}&size=${size}&sort=${sort},${ordem}`;
    return this.http.get<IResponsePageableHotel>(url, {headers: super.getheaders}).pipe(
      delay(2000),
      take(1),
      catchError(this.errorMgmt));
  }

  findByNomeIgnoreCaseOrderByNome(nome: string): Observable<IHotel> {

    let url = `${super.getAPIURL}/search/findByNomeIgnoreCaseOrderByNome?nome=${nome}`;
    return this.http.get<IHotel>(url, {headers: super.getheaders}).pipe(
      take(1),
      catchError(this.errorMgmt));
  }

  findByNomeContainingIgnoreCaseAndActivoOrderByNome(nome: string, activo: boolean, page: number, size: number, sort: string, ordem: string): Observable<IResponsePageableHotel> {

    let myactivo = activo? 1: 0;

    let url = `${super.getAPIURL}/search/findByNomeContainingIgnoreCaseAndActivoOrderByNome?nome=${nome}&activo=${myactivo}&page=${page}&size=${size}&sort=${sort},${ordem}`;
    return this.http.get<IResponsePageableHotel>(url, {headers: super.getheaders}).pipe(
      take(1),
      catchError(this.errorMgmt));
  }

  findByActivoOrderByNomePAGE(activo: boolean, page: number, size: number, sort: string, ordem: string): Observable<IResponsePageableHotel> {
    let myactivo = activo? 1: 0;

    let url = `${super.getAPIURL}/search/findByActivoOrderByNome?activo=${myactivo}&page=${page}&size=${size}&sort=${sort},${ordem}`;
    return this.http.get<IResponsePageableHotel>(url, {headers: super.getheaders}).pipe(
      take(1),
      catchError(this.errorMgmt));

  }

  findByActivoOrderByNomeLIST(activo: boolean): Observable<IResponsePageableHotel> {
    let myactivo = activo? 1: 0;

    let url = `${super.getAPIURL}/search/findByActivoOrderByNome?activo=${myactivo}`;
    return this.http.get<IResponsePageableHotel>(url, {headers: super.getheaders}).pipe(
      take(1),
      catchError(this.errorMgmt));

  }

  findByActivoAndUsersIdOrderByNome(activo: boolean, id: number): Observable<IResponsePageableHotel> {
    let myactivo = activo? 1: 0;

    let url = `${super.getAPIURL}/search/findByActivoAndUsersIdOrderByNome?activo=${myactivo}&id=${id}`;
    return this.http.get<IResponsePageableHotel>(url, {headers: super.getheaders}).pipe(
      take(1),
      catchError(this.errorMgmt));

  }

}
