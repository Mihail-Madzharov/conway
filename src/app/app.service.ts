import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  filter,
  map,
  Observable,
  scan,
  Subject,
  switchMap,
  takeWhile,
  tap,
  timer,
  withLatestFrom,
} from 'rxjs';
import { Matrix } from './utils/types';
import {
  checkDeathOrAlive,
  checkGameOver,
  fillMatrix,
} from './utils/functions';

@Injectable({ providedIn: 'root' })
export class AppService {
  private start = new Subject<boolean>();

  public pauseGame$ = new BehaviorSubject<boolean>(false);

  private cellCount = new BehaviorSubject<number>(0);

  public matrix$: Observable<Matrix> = this.start.pipe(
    withLatestFrom(this.cellCount),
    tap(console.log),
    switchMap(([, cellCount]) =>
      timer(0, 500).pipe(
        withLatestFrom(this.pauseGame$),
        filter(([, pauseGame]) => !pauseGame),
        scan(
          ({ matrix }) => {
            const newArr = checkDeathOrAlive(matrix);

            const isGameOver = checkGameOver(newArr);

            return { matrix: newArr, isGameOver };
          },
          { matrix: fillMatrix(cellCount), isGameOver: false }
        )
      )
    ),
    takeWhile(({ isGameOver }) => !isGameOver),
    map(({ matrix }) => matrix)
  );

  public startGame() {
    this.start.next(true);
  }

  public resetGame() {
    this.start.next(true);
    this.pauseGame$.next(false);
  }

  public pauseGame() {
    this.pauseGame$.next(!this.pauseGame$.value);
  }

  public setCellCount(cellCount: number) {
    this.cellCount.next(cellCount);
  }
}
