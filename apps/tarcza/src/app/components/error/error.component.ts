import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-error-component',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public readonly data: {message: string},
              private dialogRef: MatDialogRef<ErrorComponent>) {}

  dialogClose(): void {
    this.dialogRef.close(true);
  }
}