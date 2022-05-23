import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, take, tap, delay } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

import { ApiCrudService } from '../../services/api-crud.service';
import { Conjunto } from '../models/conjunto';

@Injectable({
  providedIn: 'root'
})
export class ConjuntoCrudService extends  ApiCrudService<Conjunto>{

  constructor(protected override  http: HttpClient) {
    super(http, "conjuntos");
  }


  findByNomeIgnoreCaseOrderByNome(nome: string): Observable<Conjunto> {

    let url = `${super.getAPIURL}/search/findByNomeIgnoreCaseOrderByNome?nome=${nome}`;
    return this.http.get<Conjunto>(url, {headers: super.getheaders}).pipe(
      take(1),
      catchError(this.errorMgmt));
  }



}
