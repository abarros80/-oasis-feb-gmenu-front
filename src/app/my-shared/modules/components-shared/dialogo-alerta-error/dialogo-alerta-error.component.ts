import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IAlertDialogData } from '../../../interfaces-shared/i-alert-dialog-data';


@Component({
  selector: 'app-dialogo-alerta-error',
  templateUrl: './dialogo-alerta-error.component.html',
  styleUrls: ['./dialogo-alerta-error.component.scss']
})
export class DialogoAlertaErrorComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: IAlertDialogData) { }

  ngOnInit(): void {
  }

}
