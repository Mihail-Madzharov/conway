import { Matrix } from './types';

export function neighborsSum(arr: number[][], i: number, j: number) {
  let sum = 0;
  let rowLen = Math.min(i + 1, arr[0].length - 1);
  let colLen = Math.min(j + 1, arr[1].length - 1);
  let rowIdx = Math.max(0, i - 1);
  let colIdx = Math.max(0, j - 1);

  for (let index = rowIdx; index <= rowLen; index++) {
    for (let colIndex = colIdx; colIndex <= colLen; colIndex++) {
      sum += arr[index][colIndex];
    }
  }

  return sum - arr[i][j];
}

export function fillMatrix(cellCount: number) {
  let matrix: Matrix = [[]];
  for (let index = 0; index < cellCount; index++) {
    matrix[index] = [];
    for (let j = 0; j < cellCount; j++) {
      matrix[index].push(Math.random() > 0.5 ? 1 : 0);
    }
  }
  return matrix;
}

export function checkGameOver(fArr: Matrix) {
  let result = true;
  for (let i = 0; i < fArr.length; i++) {
    result &&= fArr[i].every((el) => el === 0);
  }
  return result;
}

export function checkDeathOrAlive(matrix: Matrix) {
  let newArr: Matrix = [[]];

  for (let index = 0; index < matrix.length; index++) {
    newArr[index] = [];
    for (let j = 0; j < matrix.length; j++) {
      const sum = neighborsSum(matrix, index, j);
      if (matrix[index][j] == 0 && sum == 3) {
        newArr[index][j] = 1;
      } else if (sum > 4 || sum < 3) {
        newArr[index][j] = 0;
      } else {
        newArr[index][j] = matrix[index][j];
      }
    }
  }
  return newArr;
}
