import { BOARD_ROWS, BOARD_COLS } from "../../../shared/Constants";
import {
  Pharaoh,
  Pyramid,
  Scarab,
  Anubis,
  Sphinx
} from "./Piece";

export default class Board {

  constructor() {

    this.grid = [];
    this.selectedSquare = {
      row: null,
      col: null,
    }

    for (let row = 0; row < BOARD_ROWS; row++) {

      this.grid[row] = [];

      for (let col = 0; col < BOARD_COLS; col++) {
        this.grid[row][col] = null;
      }
    }


    // Test pieces
    this.setPiece(
      0,
      0,
      new Sphinx("red", 1)
    );

    this.setPiece(
      1,
      2,
      new Pyramid("red", 0)
    );

    this.setPiece(
      3,
      5,
      new Scarab("blue", 2)
    );

    this.setPiece(
      6,
      7,
      new Anubis("blue", 3)
    );

    this.setPiece(
      7,
      9,
      new Pharaoh("blue", 0)
    );
  }

  getPiece(row, col) {
    return this.grid[row][col];
  }


  setPiece(row, col, piece) {
    this.grid[row][col] = piece;
  }


  removePiece(row, col) {
    this.grid[row][col] = null;
  }

}