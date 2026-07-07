import {
  BOARD_ROWS,
  BOARD_COLS,
  LIGHT_TILE,
  DARK_TILE,
} from "../../../shared/Constants"
import PieceRenderer from "./PieceRenderer";

export default class BoardRenderer {

  constructor(ctx) {
    this.ctx = ctx
    this.pieceRenderer = new PieceRenderer(ctx);
  }

  draw(board) {
    const { ctx } = this;

    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    this.tileSize = Math.min(
      ctx.canvas.width / BOARD_COLS,
      ctx.canvas.height / BOARD_ROWS
    );

    this.boardWidth = this.tileSize * BOARD_COLS;
    this.boardHeight = this.tileSize * BOARD_ROWS;

    this.offsetX = (ctx.canvas.width - this.boardWidth) / 2;
    this.offsetY = (ctx.canvas.height - this.boardHeight) / 2;

    this.drawBoard();
    this.drawGrid();
    this.drawPieces(board);
  }

  drawPieces(board) {

    for (let row = 0; row < BOARD_ROWS; row++) {

        for (let col = 0; col < BOARD_COLS; col++) {

            const piece = board.getPiece(row, col);

            if (!piece) {
                continue;
            }


            this.pieceRenderer.draw(
                piece,
                this.offsetX + col * this.tileSize,
                this.offsetY + row * this.tileSize,
                this.tileSize
            );

        }
    }

}

  drawBoard() {

    const ctx = this.ctx

    for (let row = 0; row < BOARD_ROWS; row++) {

      for (let col = 0; col < BOARD_COLS; col++) {

        ctx.fillStyle =
          (row + col) % 2 === 0
            ? LIGHT_TILE
            : DARK_TILE;

        ctx.fillRect(
          this.offsetX + col * this.tileSize,
          this.offsetY + row * this.tileSize,
          this.tileSize,
          this.tileSize
        );
      }

    }

  }

  drawGrid() {

    const ctx = this.ctx

    ctx.strokeStyle = "#333"

    for (let row = 0; row <= BOARD_ROWS; row++) {

      ctx.beginPath()

      ctx.moveTo(
        this.offsetX,
        this.offsetY + row * this.tileSize
      );

      ctx.lineTo(
        this.offsetX + this.boardWidth,
        this.offsetY + row * this.tileSize
      );

      ctx.stroke()

    }

    for (let col = 0; col <= BOARD_COLS; col++) {

      ctx.beginPath()

      ctx.moveTo(
        this.offsetX + col * this.tileSize,
        this.offsetY
      );

      ctx.lineTo(
        this.offsetX + col * this.tileSize,
        this.offsetY + this.boardHeight
      );

      ctx.stroke()

    }

  }

}