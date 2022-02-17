import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';

import { BehaviorSubject, of } from 'rxjs';
import { AppComponent } from './app.component';
import { AppService } from './app.service';
import { CELL_WIDTH } from './utils/constants';
import { Matrix } from './utils/types';

class AppServiceMock {
  pauseGame$ = new BehaviorSubject(true);
  matrix$ = new BehaviorSubject<Matrix>([[]]);

  startGame() {}
  setCellCount(num: number) {}
  resetGame() {}
  pauseGame() {}
}

class AfterClosedResult {
  afterClosed() {
    return of('');
  }
}

class MatDialogMock {
  afterClosedResult = new AfterClosedResult();

  open() {
    return this.afterClosedResult;
  }
}

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let appServiceMock: AppServiceMock;
  let app: AppComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        { provide: MatDialog, useClass: MatDialogMock },
        { provide: AppService, useClass: AppServiceMock },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [AppComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    appServiceMock = TestBed.inject<AppServiceMock>(AppService as any);
    app = fixture.componentInstance;
  });

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  describe('OnInit', () => {
    it('should call startGame after dialog close', () => {
      // Arrange
      let startGameSpy = spyOn(appServiceMock, 'startGame');
      const app = fixture.componentInstance;

      // Act
      app.ngOnInit();

      // Assert
      expect(startGameSpy).toHaveBeenCalled();
    });

    it('should call setCellCount', () => {
      // Arrange
      let setCellCount = spyOn(appServiceMock, 'setCellCount');

      // Act
      app.ngOnInit();

      // Assert
      expect(setCellCount).toHaveBeenCalledWith(window.innerWidth / CELL_WIDTH);
    });
  });

  describe('Buttons', () => {
    let buttons: any;
    beforeEach(() => {
      buttons = fixture.nativeElement.getElementsByTagName('button');
    });
    it('first button should be restart', () => {
      expect(buttons[0].innerHTML).toContain('restart_alt');
    });
    it('second button should be play_arrow when game is paused', () => {
      // Arrange
      fixture.detectChanges();
      appServiceMock.pauseGame$.next(true);
      fixture.detectChanges();

      expect(buttons[1].innerHTML).toContain('play_arrow');
    });
    it('second button should be pause when game is paused', () => {
      // Arrange
      fixture.detectChanges();
      appServiceMock.pauseGame$.next(false);
      fixture.detectChanges();

      expect(buttons[1].innerHTML).toContain('pause');
    });

    it('should call reset onResetClick', () => {
      // Arrange
      let resetButton = buttons[0];
      let resetGameSpy = spyOn(appServiceMock, 'resetGame');

      // Act
      resetButton.click();

      // Assert
      expect(resetGameSpy).toHaveBeenCalled();
    });

    it('should call pauseGame onPauseClick', () => {
      // Arrange
      let pauseButton = buttons[1];
      let pauseGameSpy = spyOn(appServiceMock, 'pauseGame');
      // Act
      pauseButton.click();
      // Assert
      expect(pauseGameSpy).toHaveBeenCalled();
    });
  });

  it('should have cells if there is matrix data', () => {
    // Arrange
    appServiceMock.matrix$.next([[0, 1, 0]]);
    fixture.detectChanges();

    // Act
    let cell = fixture.nativeElement.getElementsByClassName('cell');

    // Assert
    expect(cell).toBeTruthy();
    expect(cell.length).toBe(3);
    expect(cell[0].classList[1]).toEqual('alive');
  });
});
