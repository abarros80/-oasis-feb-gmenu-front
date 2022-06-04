import { Component, OnDestroy, OnInit } from '@angular/core';
import { MediaObserver, MediaChange } from '@angular/flex-layout'
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-restbaraa',
  templateUrl: './restbaraa.component.html',
  styleUrls: ['./restbaraa.component.scss']
})
export class RestbaraaComponent implements OnInit , OnDestroy {

  private mediaSub: Subscription
  public deviceXs: boolean = false;

  constructor(public mediaObserver: MediaObserver) {
    this.mediaSub = this.mediaObserver.media$.subscribe((result:MediaChange)=>{
      console.log(result.mqAlias);
      this.deviceXs = result.mqAlias === 'xs' ? true : false;

    });
   }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.mediaSub.unsubscribe();
  }

}
