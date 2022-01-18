class Balken {
    /**
     * @param canvas    Das canvas Element
     * @param width     Die Breite des Balkens (optional -> standard: 100)
     * @param height    Die Höhe des Balkens (optional -> standard: 20)
     * @param color     Die Farbe des Balkens (optional -> standard: #063bda)
     */
    constructor(canvas, width = 100, height = 20, color = "#063bda") {
        this.width = width;
        this.height = height;
        this.x = canvas.width / 2 - this.width / 2;
        this.y = canvas.height - this.height - 5;
        this.move = 5;
        this.color = color;
        this.ctx = canvas.getContext("2d");
        this.canvas = canvas;
        this.links = false;
        this.rechts = false;
    }

    //Zeichnet den balken in das Canvas
    zeichneBalken() {
        this.ctx.fillStyle = this.color;
        this.ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    //Berechnet, ob noch Platz zum Bewegen nach rechts verfügbar ist
    istAmEndeRechts() {
        return this.canvas.width - this.x - this.width > 0;
    }

    //Berechnet, ob noch Platz zum Bewegen nach Links verfügbar ist
    istAmEndeLinks() {
        return this.x > 0;
    }

    balkenBewegen() {
        //Wenn gedrückt
        document.addEventListener("keydown", (event) => {
            if (event.key === 'ArrowLeft') {
                this.links = true;
            } else if (event.key === "ArrowRight") {
                this.rechts = true;
            }
        });

        //Wenn losgelassen
        document.addEventListener("keyup", (event) => {
            if (event.key === "ArrowLeft") {
                this.links = false;
            } else if (event.key === "ArrowRight") {
                this.rechts = false;
            }
        });

        //Nach rechts oder links bewegen so lange es platz hat
        if (this.rechts && this.istAmEndeRechts()) {
            this.x += this.move;
        } else if (this.links && this.istAmEndeLinks()) {
            this.x -= this.move;
        }
    }

}