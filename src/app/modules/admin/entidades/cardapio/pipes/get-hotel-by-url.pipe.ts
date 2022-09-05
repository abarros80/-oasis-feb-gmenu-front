
import { Pipe, PipeTransform } from '@angular/core';
import { Observable } from 'rxjs';
import { IHotel } from '../../hotel/interfaces/i-hotel';
import { HotelCrudService } from '../../hotel/services/hotel-crud.service';
import { ICardapio } from './../interfaces/i-cardapio';


@Pipe({
  name: 'getHotelByUrl'
})
export class GetHotelByUrlPipe implements PipeTransform {

  constructor(

    private hotelCrudService: HotelCrudService
  ) { }

  transform(value: ICardapio, ...args: unknown[]): Observable<IHotel> {
    let url: string = value._links.hotel.href;

    console.log("getNomeHotel url:",url);

    let devolveNomeHotel$: Observable<IHotel> = this.hotelCrudService.findDataByURL(url);

    return devolveNomeHotel$;

  }

}
