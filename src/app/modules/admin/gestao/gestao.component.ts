import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-gestao',
  templateUrl: './gestao.component.html',
  styleUrls: ['./gestao.component.css']
})
export class GestaoComponent implements OnInit {

  username = sessionStorage.getItem("authenticatedUserName");

  @Input() sideNavOpened = true;

  constructor(private breakpointObserver: BreakpointObserver) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(){
    this.breakpointObserver.observe(['(max-width: 800px)']).subscribe(
      (res) => {
        console.log(res.matches)
        if(res.matches){
          this.sideNavOpened = false;
        }else{
          this.sideNavOpened = true;
        }

      }
    )

  }

  logSideNav(state: string){
    console.log(state);
  }

}
