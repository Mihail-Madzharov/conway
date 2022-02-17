import { Component } from '@angular/core';

import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dimension-dialog',
  templateUrl: './dimension-dialog.component.html',
  styleUrls: ['./dimension-dialog.component.scss'],
})
export class DimensionDialogComponent {
  constructor(public dialogRef: MatDialogRef<DimensionDialogComponent>) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
