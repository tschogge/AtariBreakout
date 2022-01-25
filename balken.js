/**
 * @author      Gioele Petrillo, Laurin Kuster
 * @version     1.8
 * @description Hier wird der Balken definiert und seine Methoden, wie er sich verhalten muss. 25.01.2022
 */
class Balken {
    /**
     * @param canvas            Das canvas Element
     * @param width             Die Breite des Balkens (optional -> standard: 100)
     * @param height            Die Höhe des Balkens (optional -> standard: 20)
     * @param color             Die Farbe des Balkens (optional -> standard: #063bda)
     * @param punkte            Anzahl Punkte pro abgeschossenen Block (optional -> standard: 100)
     */
    constructor(canvas, width = 100, height = 20, color = "#063bda", punkte = 100) {
        this.width = width;
        this.height = height;
        this.punkte = punkte;
        this.x = canvas.width / 2 - this.width / 2;
        this.y = canvas.height - this.height - 5;
        this.move = 5;
        this.color = color;
        this.ctx = canvas.getContext("2d");
        this.canvas = canvas;
        this.links = false;
        this.rechts = false;
    }

    //Zeichnet den balken an den x und y koordinaten
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

    //Bewegt den balken nach rechts oder links, wenn die Pfeiltasten gedrückt werden
    balkenBewegen() {
        //Wenn gedrückt
        document.addEventListener("keydown", (event) => {
            if (event.key === 'ArrowLeft') {            //Pfeil links gedrückt
                this.links = true;
            } else if (event.key === "ArrowRight") {    //Pfeil rechts geklickt
                this.rechts = true;
            }
        });

        //Wenn losgelassen
        document.addEventListener("keyup", (event) => {
            if (event.key === "ArrowLeft") {            //Pfeil link losgelassen
                this.links = false;
            } else if (event.key === "ArrowRight") {    //Pfeil rechts losgelassen
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

    //Setzt den Balken zurück
    balkenZuruecksetzen() {
        this.x = this.canvas.width / 2 - this.width / 2;
        this.y = this.canvas.height - this.height - 5;
        this.zeichneBalken();
    }

    /**
     * erstellt herzen für Leben
     * @param life  Anzahl der Leben des benutzers
     */
    erstelleLeben(life) {
        let herz = new Image();
        herz.src = "herz.png";
        for (let i = 0; i < life; i++) {
            this.ctx.drawImage(herz, i * 25 + 5, 10, 20, 20);
        }
    }

    /**
     * Zeigt die anzahl Punkte an, die der Spieler gemacht hat. Ein block = 100 Punkte
     * @param bloecke       Anzahl getroffene Bloecke
     */
    zeigePunkte(bloecke) {
        this.ctx.beginPath();
        this.ctx.font = "15px Arial";
        this.ctx.fillText("Punkte: " + bloecke * this.punkte, this.canvas.width - 100, 25);
        this.ctx.fill();
    }

}