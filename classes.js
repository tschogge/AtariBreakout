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
    }

    //Zeichnet den balken in das Canvas
    zeichneBalken() {
        this.ctx.fillStyle = this.color;
        this.ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    initialisiereBalken() {
        let links = false;
        let rechts = false;

        //Wenn gedrückt
        document.addEventListener("keydown", (event) => {
            if (event.key === 'ArrowLeft') {
                links = true;
            } else if (event.key === "ArrowRight") {
                rechts = true;
            }
        });

        //Wenn losgelassen
        document.addEventListener("keyup", (event) => {
            if (event.key === "ArrowLeft") {
                links = false;
                console.log("Links");
            } else if (event.key === "ArrowRight") {
                rechts = false;
                console.log("rechts");
            }
        });

        if (rechts) {
            this.x += this.move;
        } else if (links) {
            this.x -= this.move;
        }
    }
}