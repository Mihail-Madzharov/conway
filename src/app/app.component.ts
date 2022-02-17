import { Component, OnInit } from '@angular/core';
import { Observable, share, take } from 'rxjs';

import { Matrix } from './utils/types';

import { MatDialog } from '@angular/material/dialog';
import { DimensionDialogComponent } from './components/dimension-dialog/dimension-dialog.component';
import { AppService } from './app.service';
import { CELL_WIDTH } from './utils/constants';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public matrix$: Observable<Matrix> = this.appService.matrix$;

  public pauseGame$: Observable<boolean> = this.appService.pauseGame$.pipe(
    share()
  );

  constructor(public dialog: MatDialog, private appService: AppService) {}

  ngOnInit(): void {
    const dialog = this.dialog.open(DimensionDialogComponent);

    dialog
      .afterClosed()
      .pipe(take(1))
      .subscribe(() => this.appService.startGame());

    this.appService.setCellCount(window.innerWidth / CELL_WIDTH);
  }

  onPauseClick() {
    this.appService.pauseGame();
  }

  onResetClick() {
    this.appService.resetGame();
  }
}
