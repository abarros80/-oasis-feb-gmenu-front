import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-gestao',
  templateUrl: './gestao.component.html',
  styleUrls: ['./gestao.component.css']
})
export class GestaoComponent implements OnInit {

  username = sessionStorage.getItem("authenticatedUserName");

  constructor() { }

  ngOnInit(): void {
  }

}
