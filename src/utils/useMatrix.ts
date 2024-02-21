import { useReducer } from "react";

export enum ACTIONS {
  TOGGLE_CELL = 'TOGGLE_CELL',
  UPDATE_MATRIX = 'UPDATE_MATRIX'
}


export type Coord = {
  x: number,
  y: number
}

export type Action = {
  type: 'TOGGLE_CELL',
  payload: Coord
} | {
  type: 'UPDATE_MATRIX'
}

const getNeighbors = (matrix: number[][]) => (rowIndex: number, colIndex: number) => {
  let neighbors = 0
  for (let row = rowIndex - 1; row <= rowIndex + 1; row++) {
    for (let col = colIndex - 1; col <= colIndex + 1; col++) {
      if (row >= 0 && row < matrix.length && col >= 0 && col < matrix[row].length) {
        if (row !== rowIndex || col !== colIndex) {
          neighbors += matrix[row][col]
        }
      }
    }
  }
  return neighbors
}

const matrixReducer = (state: number[][], action: Action) => {
  switch (action.type) {
    case 'TOGGLE_CELL':
      return state.map((row, rowIndex) =>
        row.map((cell, cellIndex) =>
          rowIndex === action.payload.x && cellIndex === action.payload.y
            ? (cell === 0 ? 1 : 0)
            : cell
        )
      );
    case 'UPDATE_MATRIX':
      return state.map((row, rowIndex) =>
        row.map((cell, cellIndex) => {
          const neighbors = getNeighbors(state)(rowIndex, cellIndex);
          if (cell === 0 && neighbors === 3) {
            return 1;
          } else if (cell === 1 && (neighbors < 2 || neighbors > 3)) {
            return 0;
          } else {
            return cell;
          }
        })
      );
    default:
      return state;
  }
}

const useMatrix = (x: number, y: number) => useReducer(matrixReducer, Array.from({ length: y }, () => Array.from({ length: x }, () => 0)))

export default useMatrix