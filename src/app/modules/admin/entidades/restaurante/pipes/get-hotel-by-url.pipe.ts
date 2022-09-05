import { Pipe, PipeTransform } from '@angular/core';
import { Observable } from 'rxjs';
import { IHotel } from '../../hotel/interfaces/i-hotel';
import { HotelCrudService } from '../../hotel/services/hotel-crud.service';
import { IRestaurante } from '../interfaces/i-restaurante';

@Pipe({
  name: 'getHotelByUrl'
})
export class GetHotelByUrlPipe implements PipeTransform {

  constructor(

    private hotelCrudService: HotelCrudService
  ) { }

  transform(value: IRestaurante, ...args: unknown[]): Observable<IHotel> {
    let url: string = value._links.hotel.href;

    console.log("getNomeHotel url:",url);

    let nomeHotel: string = "";


    let devolveNomeHotel$: Observable<IHotel> = this.hotelCrudService.findDataByURL(url);

    return devolveNomeHotel$;

  }

}
