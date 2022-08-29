import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IConfirmDialogData } from '../../../interfaces-shared/i-confirm-dialog-data';

@Component({
  selector: 'app-dialogo-confirmacao',
  templateUrl: './dialogo-confirmacao.component.html',
  styleUrls: ['./dialogo-confirmacao.component.scss']
})
export class DialogoConfirmacaoComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: IConfirmDialogData) { }

  ngOnInit(): void {
  }

}
