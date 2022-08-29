import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IAlertDialogData } from '../../../interfaces-shared/i-alert-dialog-data';

@Component({
  selector: 'app-dialogo-alerta',
  templateUrl: './dialogo-alerta.component.html',
  styleUrls: ['./dialogo-alerta.component.scss']
})
export class DialogoAlertaComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: IAlertDialogData) { }

  ngOnInit(): void {
  }


}
