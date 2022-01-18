class Rechteck {
    constructor(canvas, abstandMitte = 5, abstandOben = 40, abstandRechts = 15, abstandLinks = 15, reihen = 5, spalten = 6, hoehe = 20, color = "#ff2c2c") {
        this.abstandOben = abstandOben;
        this.abstandRechts = abstandRechts;
        this.abstandLinks = abstandLinks;
        this.reihen = reihen;
        this.spalten = spalten;
        this.hoehe = hoehe;
        this.color = color;
        this.canvas = canvas;
        this.abstandMitte = abstandMitte;
        this.ctx = canvas.getContext("2d");

        //Breite berechnen
        this.breite = (this.canvas.width - this.abstandRechts - this.abstandLinks) / this.spalten;
    }

    //Erstellt alle rechtecke
    erschaffeRechtecke() {
        //Array mit Rechtecken erstellen
        this.rechtecke = [];
        //r für Reihe s für Spalten
        for (let r = 0; r < this.reihen; r++) {
            this.rechtecke[r] = [];
            for (let s = 0; s < this.spalten; s++) {
                this.rechtecke[r][s] = {
                    //position der Rechtecke speichern; Abstand von Rechtecken nach Muster berechnen
                    x: r * (this.breite) + this.abstandLinks,
                    y: s * (this.hoehe) + this.abstandOben,
                    //Status ob Rechteck noch ganz oder bereits kaputt ist
                    status: true
                };
            }
        }
    }

    zeichneRechtecke() {
        //zuerst reihe auswählen
        for (let r = 0; r < this.reihen; r++) {
            //dann spalte zeichnen
            for (let s = 0; s < this.spalten; s++) {
                //wenn das Rechteck auf diesen Kordinaten nicht abgeschossen wurde
                if (this.rechtecke[r][s].status) {
                    this.ctx.fillStyle = this.color;
                    this.ctx.fillRect(this.rechtecke[r][s].x, this.rechtecke[r][s].y, this.breite - this.abstandMitte, this.hoehe - this.abstandMitte);

                }
            }
        }
    }
}