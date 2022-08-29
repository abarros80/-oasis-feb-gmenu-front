import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DialogoConfirmacaoComponent } from '../../my-shared/modules/components-shared/dialogo-confirmacao/dialogo-confirmacao.component';
import { IConfirmDialogData } from '../../my-shared/interfaces-shared/i-confirm-dialog-data';
import { Observable } from 'rxjs';
import { DialogoAlertaComponent } from '../../my-shared/modules/components-shared/dialogo-alerta/dialogo-alerta.component';
import { IAlertDialogData } from '../../my-shared/interfaces-shared/i-alert-dialog-data';
import { DialogoAlertaErrorComponent } from '../../my-shared/modules/components-shared/dialogo-alerta-error/dialogo-alerta-error.component';
import { DialogoAlertaWarnComponent } from '../../my-shared/modules/components-shared/dialogo-alerta-warn/dialogo-alerta-warn.component';


@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(
    private dialog: MatDialog,
    private snackBar: MatSnackBar

    ) { }



    //DIALOGOS CONFIRMACAO
    confirmDialog(data: IConfirmDialogData): Observable<boolean>{
      return this.dialog.open(DialogoConfirmacaoComponent, {
        data,
        width: '400px',
        disableClose: true
      }).afterClosed();
    }

    confirmDialog2(data: IConfirmDialogData) {
      return this.dialog.open(DialogoConfirmacaoComponent, {
        data,
        disableClose: true
      })
    }

    //DIALOGOS ALERTA
    alertDialog(data: IAlertDialogData): Observable<boolean> {
      this.openSnack_botao("alerta", "Fechar");
      return this.dialog.open(DialogoAlertaComponent,{
        data,
        width: '400px',
        disableClose: true
      }).afterClosed();
    }

    alertDialog2(data: IAlertDialogData) {

      this.openSnack_botao_tempo("alerta", "", 2000);

      return this.dialog.open(DialogoAlertaComponent,{
        data,
        disableClose: true
      });

    }

    alertDialogError(data: IAlertDialogData) {

      return this.dialog.open(DialogoAlertaErrorComponent,{
        data,
        disableClose: true
      });

    }

    alertDialogWarn(data: IAlertDialogData) {

      return this.dialog.open(DialogoAlertaWarnComponent,{
        data,
        disableClose: true
      });

    }

    alertDialogInfo(data: IAlertDialogData) {

      return this.dialog.open(DialogoAlertaComponent,{
        data,
        disableClose: true
      });

    }

    //SNACK BAR
    openSnack(msg: string){
      return this.snackBar.open(msg);
    }

    openSnack_botao(msg: string, botname: string){
      return this.snackBar.open(msg, botname, {
        horizontalPosition: 'right',
        verticalPosition: 'top',
      });
    }

    openSnack_botao_tempo(msg: string, botname: string, tempo: number){
      this.snackBar.open(msg, botname, {
        duration: tempo,
        horizontalPosition: 'right',
        verticalPosition: 'top',

      });
    }

    openSnack_botao_css(msg: string, botname: string, css: string){
      return this.snackBar.open(msg, botname, {
        horizontalPosition: 'right',
        verticalPosition: 'top',
        panelClass: [css]

      });
    }

    openSnack_botao_tempo_css(msg: string, botname: string, tempo: number, css: string){
      this.snackBar.open(msg, botname, {
        duration: tempo,
        horizontalPosition: 'right',
        verticalPosition: 'top',
        panelClass: [css]

      });
    }

}
