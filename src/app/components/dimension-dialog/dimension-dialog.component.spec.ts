import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef } from '@angular/material/dialog';

import { DimensionDialogComponent } from './dimension-dialog.component';

class MatDialogMock {
  close() {}
}
describe('DimensionDialogComponent', () => {
  let component: DimensionDialogComponent;
  let fixture: ComponentFixture<DimensionDialogComponent>;
  let matDialog: MatDialogMock;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DimensionDialogComponent],
      providers: [{ provide: MatDialogRef, useClass: MatDialogMock }],
    }).compileComponents();

    matDialog = TestBed.inject(MatDialogRef);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DimensionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call close onNoClick', () => {
    // Arrange
    let button = fixture.nativeElement.getElementsByClassName('button-wrapper')[0];

    let closeSpy = spyOn(matDialog, 'close');
    // Act
    button.click();

    // Assert
    expect(closeSpy).toHaveBeenCalled();
  });
});
