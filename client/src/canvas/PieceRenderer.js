export default class PieceRenderer {

  constructor(ctx) {
    this.ctx = ctx;
  }

  draw(piece, x, y, size) {
    const ctx = this.ctx;
    ctx.save();
    ctx.translate(x + size / 2, y + size / 2);
    ctx.rotate(piece.orientation * Math.PI / 2);

    switch (piece.type) {
      case "PHARAOH":
        this.drawPharaoh(piece, size);
        break;
      case "PYRAMID":
        this.drawPyramid(piece, size);
        break;
      case "SCARAB":
        this.drawScarab(piece, size);
        break;
      case "ANUBIS":
        this.drawAnubis(piece, size);
        break;
      case "SPHINX":
        this.drawSphinx(piece, size);
        break;
    }

    ctx.restore();
  }

  getBodyColor(owner) {
    return owner === "red" ? "#b8453b" : "#a9a9ad";
  }

  getAccentColor() {
    return "#c9a66b"; // gold/bronze
  }

  // Base square with nice bevel + shadow
  drawBase(size, color) {
    const ctx = this.ctx;
    const half = size * 0.45;
    const r = size * 0.08; // slight rounding

    ctx.fillStyle = color;
    ctx.strokeStyle = "#2a2118";
    ctx.lineWidth = size * 0.045;

    // Main body
    ctx.beginPath();
    ctx.roundRect(-half, -half, half * 2, half * 2, r);
    ctx.fill();
    ctx.stroke();

    // Inner highlight
    ctx.strokeStyle = "rgba(255,255,255,0.35)";
    ctx.lineWidth = size * 0.02;
    ctx.beginPath();
    ctx.roundRect(-half + size * 0.04, -half + size * 0.04, half * 2 - size * 0.08, half * 2 - size * 0.08, r * 0.6);
    ctx.stroke();
  }

  // Beautiful reflective mirror (used by Pyramid, Scarab, etc.)
  drawMirror(x1, y1, x2, y2, size) {
    const ctx = this.ctx;
    const lw = size * 0.085;

    // Dark frame
    ctx.lineCap = "round";
    ctx.lineWidth = lw;
    ctx.strokeStyle = "#1a3a5e";
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();

    // Bright blue mirror
    ctx.lineWidth = lw * 0.65;
    ctx.strokeStyle = "#1f9eff";
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();

    // Highlight
    ctx.lineWidth = lw * 0.25;
    ctx.strokeStyle = "rgba(255,255,255,0.9)";
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
  }

  drawPharaoh(piece, size) {
    this.drawBase(size, this.getBodyColor(piece.owner));

    const s = size * 0.38;
    const ctx = this.ctx;
    ctx.fillStyle = this.getAccentColor();
    ctx.strokeStyle = "#2a2118";
    ctx.lineWidth = size * 0.03;

    // Crown / Nemes headdress
    ctx.beginPath();
    ctx.moveTo(-s * 0.9, -s * 0.85);
    ctx.lineTo(s * 0.9, -s * 0.85);
    ctx.lineTo(s * 0.75, -s * 0.4);
    ctx.lineTo(-s * 0.75, -s * 0.4);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Head
    ctx.beginPath();
    ctx.arc(0, -s * 0.1, s * 0.45, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // Beard / details
    ctx.fillStyle = "#2a2118";
    ctx.beginPath();
    ctx.ellipse(0, s * 0.25, s * 0.18, s * 0.35, 0, 0, Math.PI * 2);
    ctx.fill();
  }

  drawPyramid(piece, size) {
    this.drawBase(size, this.getBodyColor(piece.owner));

    const ctx = this.ctx;
    const s = size * 0.48;

    // Right isosceles triangle
    ctx.fillStyle = "#d4b17f";
    ctx.strokeStyle = "#2a2118";
    ctx.lineWidth = size * 0.045;

    ctx.beginPath();
    ctx.moveTo(-s, s * 0.7);      // bottom left
    ctx.lineTo(s, s * 0.7);       // bottom right
    ctx.lineTo(-s, -s * 0.9);     // top (right angle at top-left-ish)
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Mirror on the hypotenuse (long diagonal)
    this.drawMirror(-s, -s * 0.85, s * 0.95, s * 0.65, size);
  }

  drawScarab(piece, size) {
    this.drawBase(size, this.getBodyColor(piece.owner));

    const ctx = this.ctx;
    const s = size * 0.42;

    // Open back body (U-shape / open at bottom)
    ctx.fillStyle = "#3a2f1e";
    ctx.strokeStyle = "#2a2118";
    ctx.lineWidth = size * 0.04;

    ctx.beginPath();
    ctx.ellipse(0, -s * 0.1, s * 0.85, s * 0.75, 0, Math.PI * 0.1, Math.PI * 1.9);
    ctx.fill();
    ctx.stroke();

    // Single mirror across the middle
    this.drawMirror(-s * 0.75, -s * 0.65, s * 0.75, s * 0.45, size);
  }

  drawAnubis(piece, size) {
    const ctx = this.ctx;

    this.drawBase(size, this.getBodyColor(piece.owner));

    // Shield
    ctx.beginPath();

    ctx.moveTo(0, -size * 0.34);
    ctx.lineTo(size * 0.28, -size * 0.08);
    ctx.lineTo(size * 0.20, size * 0.30);
    ctx.lineTo(0, size * 0.36);
    ctx.lineTo(-size * 0.20, size * 0.30);
    ctx.lineTo(-size * 0.28, -size * 0.08);

    ctx.closePath();

    ctx.fillStyle = "#2e2e32";
    ctx.fill();

    ctx.strokeStyle = "#d7d7d7";
    ctx.lineWidth = size * 0.03;
    ctx.stroke();

    // Protected face (laser blocker)
    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = size * 0.08;

    ctx.beginPath();
    ctx.moveTo(-size * 0.18, -size * 0.12);
    ctx.lineTo(size * 0.18, -size * 0.12);
    ctx.stroke();

    // Ankh

    ctx.strokeStyle = "#c9a84d";
    ctx.lineWidth = size * 0.04;
    ctx.lineCap = "round";

    // loop
    ctx.beginPath();
    ctx.arc(
      0,
      -size * 0.05,
      size * 0.08,
      0,
      Math.PI * 2
    );
    ctx.stroke();

    // stem
    ctx.beginPath();
    ctx.moveTo(0, size * 0.03);
    ctx.lineTo(0, size * 0.22);
    ctx.stroke();

    // crossbar
    ctx.beginPath();
    ctx.moveTo(-size * 0.09, size * 0.08);
    ctx.lineTo(size * 0.09, size * 0.08);
    ctx.stroke();
  }

  drawSphinx(piece, size) {

    const ctx = this.ctx;

    this.drawBase(size, this.getBodyColor(piece.owner));

    // Main body

    ctx.fillStyle = "#b98d45";
    ctx.strokeStyle = "#5f4822";
    ctx.lineWidth = size * 0.03;

    ctx.beginPath();

    ctx.roundRect(
      -size * 0.22,
      -size * 0.32,
      size * 0.44,
      size * 0.64,
      size * 0.04
    );

    ctx.fill();
    ctx.stroke();

    // Cannon

    ctx.beginPath();

    ctx.arc(
      0,
      0,
      size * 0.11,
      0,
      Math.PI * 2
    );

    ctx.fillStyle = "#111";
    ctx.fill();

    ctx.strokeStyle = "#8d6a2d";
    ctx.lineWidth = size * 0.05;
    ctx.stroke();

    // Laser barrel

    this.drawMirror(
      0,
      -size * 0.28,
      0,
      -size * 0.10,
      size
    );

    // Emitter glow

    ctx.shadowColor = "#4fc3ff";
    ctx.shadowBlur = size * 0.20;

    ctx.fillStyle = "#4fc3ff";

    ctx.beginPath();

    ctx.arc(
      0,
      -size * 0.28,
      size * 0.025,
      0,
      Math.PI * 2
    );

    ctx.fill();

    ctx.shadowBlur = 0;
  }
}