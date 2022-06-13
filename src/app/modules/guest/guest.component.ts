import { Component, OnDestroy, OnInit } from '@angular/core';
import { MediaObserver, MediaChange } from '@angular/flex-layout'
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-guest',
  templateUrl: './guest.component.html',
  styleUrls: ['./guest.component.css']
})
export class GuestComponent implements OnInit, OnDestroy {

  private mediaSub: Subscription
  public deviceXs: boolean = false;

  constructor(public mediaObserver: MediaObserver,
    private activatedRoute: ActivatedRoute) {
    this.mediaSub = this.mediaObserver.media$.subscribe((result:MediaChange)=>{
      //console.log(result.mqAlias);
      this.deviceXs = result.mqAlias === 'xs' ? true : false;

    });
   }

  ngOnInit(): void {
    this.activatedRoute.fragment.subscribe((value) => {
      console.log(value);
      this.jumTo(value);
    });
  }

  jumTo(section: any){
    document.getElementById(section)?.scrollIntoView({behavior: 'smooth'});

  }

  ngOnDestroy(): void {
    this.mediaSub.unsubscribe();
  }

}
