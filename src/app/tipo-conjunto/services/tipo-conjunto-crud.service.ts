import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, take, tap, delay } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

import { ApiCrudService } from './../../services/api-crud.service';
import { TipoConjunto } from '../models/tipo-conjunto';

@Injectable({
  providedIn: 'root'
})
export class TipoConjuntoCrudService  extends  ApiCrudService<TipoConjunto>{

  constructor(protected override  http: HttpClient) {
    super(http, "tipoconjuntos");
  }


  findByNomeIgnoreCaseOrderByNome(nome: string): Observable<TipoConjunto> {

    let url = `${super.getAPIURL}/search/findByNomeIgnoreCaseOrderByNome?nome=${nome}`;
    return this.http.get<TipoConjunto>(url, {headers: super.getheaders}).pipe(
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
