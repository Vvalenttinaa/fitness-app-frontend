import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ShowMessageDialogComponent } from '../components/show-message-dialog/show-message-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class MessageDialogService {
  constructor(private dialog: MatDialog) { }

  showMessageDialog(title: string, message: string): void {
    this.dialog.open(ShowMessageDialogComponent, {
      width: '400px',
      data: { title: title, message: message }
    });
  }

}
