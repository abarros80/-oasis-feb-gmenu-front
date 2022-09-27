import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CriaralterarComponent } from '../crud/criaralterar/criaralterar.component';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.scss']
})
export class MainMenuComponent implements OnInit {

  constructor(
    private router: Router,
    private dialog: MatDialog) { }

  isPopupOpened = true;


  ngOnInit(): void {
  }

  criarEntety() {
    this.isPopupOpened = true;
    const dialogRef = this.dialog.open(CriaralterarComponent, {
      data: {},
      maxWidth: '70vw',
      maxHeight: '80vh',
      disableClose: true
    });


    dialogRef.afterClosed().subscribe(result => {
      this.isPopupOpened = false;
    });
  }


  navegarParaCriar(){
    this.router.navigate(["./oa-admin/gestao/entidades/titem/criar"])
  }

  navegarParaListar(){
    this.router.navigate(["./oa-admin/gestao/entidades/titem/listar"])
  }

}
