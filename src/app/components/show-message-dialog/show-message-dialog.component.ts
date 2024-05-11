import { Component, Inject } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule } from '@angular/material/dialog';


@Component({
  selector: 'app-show-message-dialog',
  standalone: true,
  imports: [MatDialogModule, MatButton],
  templateUrl: './show-message-dialog.component.html',
  styleUrl: './show-message-dialog.component.css'
})
export class ShowMessageDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, matDialog: MatDialog) { }
}
