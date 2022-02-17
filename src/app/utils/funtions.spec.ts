import {
  checkDeathOrAlive,
  checkGameOver,
  fillMatrix,
  neighborsSum,
} from './functions';

describe('Functions', () => {
  it('should return the sum of all neighbors', () => {
    const result = neighborsSum(
      [
        [1, 0, 1],
        [0, 1, 0],
        [1, 0, 1],
      ],
      1,
      1
    );

    expect(result).toBe(4);
  });

  it('should fill matrix based on cell count', () => {
    let result = fillMatrix(4);
    expect(result.length).toBe(4);
    expect(result[0].length).toBe(4);
  });

  it('should return true if every cell is death(0) ', () => {
    let isGameOver = checkGameOver([
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
    ]);

    expect(isGameOver).toBeTruthy();
  });

  it('should return false if one cell is alive(1) ', () => {
    let isGameOver = checkGameOver([
      [0, 0, 0, 0, 1, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
    ]);

    expect(isGameOver).toBeFalsy();
  });

  describe('CheckDeathOrAlive', () => {
    it('should set 1 to current cell if its death but the sum of the neighbors is 3', () => {
      let newMatrix = checkDeathOrAlive([
        [1, 0, 1],
        [0, 0, 0],
        [0, 0, 1],
      ]);

      expect(newMatrix[1][1]).toBe(1);
    });

    it('should set ) to current cell if the sum of the neighbors is bigger than 4', () => {
      let newMatrix = checkDeathOrAlive([
        [1, 0, 1],
        [1, 0, 0],
        [1, 0, 1],
      ]);

      expect(newMatrix[1][1]).toBe(0);
    });

    it('should set ) to current cell if the sum of the neighbors is less than 3', () => {
      let newMatrix = checkDeathOrAlive([
        [0, 0, 1],
        [0, 0, 0],
        [0, 0, 1],
      ]);

      expect(newMatrix[1][1]).toBe(0);
    });

    it('should stay the same if the above tests are false', () => {
      let newMatrix = checkDeathOrAlive([
        [1, 0, 1],
        [0, 1, 0],
        [0, 0, 1],
      ]);

      expect(newMatrix[1][1]).toBe(1);
    });
  });
});
