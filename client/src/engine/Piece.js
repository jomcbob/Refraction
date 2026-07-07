export default class Piece {
    constructor(type, owner, orientation = 0) {
        this.type = type;
        this.owner = owner;

        // 0=N
        // 1=E
        // 2=S
        // 3=W
        this.orientation = orientation;
    }

    rotateClockwise() {
        this.orientation = (this.orientation + 1) % 4;
    }

    rotateCounterClockwise() {
        this.orientation = (this.orientation + 3) % 4;
    }
}

export class Pharaoh extends Piece {
    constructor(owner, orientation) {
        super("PHARAOH", owner, orientation);
    }
}

export class Pyramid extends Piece {
    constructor(owner, orientation) {
        super("PYRAMID", owner, orientation);
    }
}

export class Scarab extends Piece {
    constructor(owner, orientation) {
        super("SCARAB", owner, orientation);
    }
}

export class Anubis extends Piece {
    constructor(owner, orientation) {
        super("ANUBIS", owner, orientation);
    }
}

export class Sphinx extends Piece {
    constructor(owner, orientation) {
        super("SPHINX", owner, orientation);
    }
}