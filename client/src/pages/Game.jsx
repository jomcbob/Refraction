import { useEffect, useRef } from "react"
import Board from "../engine/Board"
import BoardRenderer from "../canvas/BoardRenderer"

export default function Game() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const board = new Board();
    const renderer = new BoardRenderer(ctx);

    function render() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      renderer.draw(board);
    }

    function handleClick(event) {
      const rect = canvas.getBoundingClientRect();

      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      // Ignore clicks outside the board
      if (
        x < renderer.offsetX ||
        x >= renderer.offsetX + renderer.boardWidth ||
        y < renderer.offsetY ||
        y >= renderer.offsetY + renderer.boardHeight
      ) {
        return;
      }

       const col = Math.floor(
        (x - renderer.offsetX) / renderer.tileSize
      );

       const row = Math.floor(
        (y - renderer.offsetY) / renderer.tileSize
      );

      board.selectedSquare.col = col
      board.selectedSquare.row = row

      // console.log("Clicked:", board.selectedSquare);
      console.log("Clicked:", board.grid[row][col]);
    }

    render();

    window.addEventListener("resize", render);
    canvas.addEventListener("click", handleClick);

    return () => {
      window.removeEventListener("resize", render);
      canvas.removeEventListener("click", handleClick);
    };
  }, []);

  return <canvas ref={canvasRef} />;
}