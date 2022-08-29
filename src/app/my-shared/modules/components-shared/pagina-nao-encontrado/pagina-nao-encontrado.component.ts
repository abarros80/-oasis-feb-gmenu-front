import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-pagina-nao-encontrado',
  templateUrl: './pagina-nao-encontrado.component.html',
  styleUrls: ['./pagina-nao-encontrado.component.css']
})
export class PaginaNaoEncontradoComponent implements OnInit {

  constructor(private location: Location) { }

  ngOnInit(): void {
  }

  voltar() {
    this.location.back(); // <-- go back to previous location on cancel
  }

}
