class Rechteck {
    constructor(canvas, reihen = 5, spalten = 6, abstandMitte = 5, abstandOben = 40, abstandRechts = 15, abstandLinks = 15, hoehe = 20, color = "#ff2c2c") {
        this.abstandOben = abstandOben;
        this.abstandRechts = abstandRechts;
        this.abstandLinks = abstandLinks;
        this.reihen = reihen;
        this.spalten = spalten;
        this.hoehe = hoehe + abstandMitte;
        this.color = color;
        this.canvas = canvas;
        this.abstandMitte = abstandMitte;
        this.ctx = canvas.getContext("2d");

        //Breite berechnen
        this.breite = (this.canvas.width - this.abstandRechts - this.abstandLinks) / this.spalten;
    }

    //Erstellt alle rechtecke
    erschaffeRechtecke() {
        /*
        Der ausgleich berechnet die kommazahlen, die verloren gehen beim Zeichnen und multipliziert sie, um die Rechtecke
        nach rechts zu verschieben. Somit sind die Rechtecke zentriert. Wenn das Resultat kleiner ist als null wird es
        positiv gemacht, damit es nicht nach links verschoben wird
        */
        let ausgleich = (Math.round(this.breite) - this.breite) * this.spalten;
        if (ausgleich < 0) {
            ausgleich *= -1;
        }
        console.log(ausgleich);

        //Array mit Rechtecken erstellen
        this.rechtecke = [];
        //r für Reihe s für Spalten
        for (let r = 0; r < this.reihen; r++) {
            this.rechtecke[r] = [];
            for (let s = 0; s < this.spalten; s++) {
                this.rechtecke[r][s] = {
                    //position der Rechtecke speichern; Abstand von Rechtecken nach Muster berechnen
                    x: s * (this.breite) + this.abstandLinks + ausgleich,
                    y: r * (this.hoehe) + this.abstandOben,
                    //Status ob Rechteck noch ganz oder bereits kaputt ist
                    status: true
                };
            }
        }
        console.log(this.rechtecke);
    }

    zeichneRechtecke() {
        //zuerst reihe auswählen
        for (let s = 0; s < this.spalten; s++) {
            //dann spalte zeichnen
            for (let r = 0; r < this.reihen; r++) {
                //wenn das Rechteck auf diesen Kordinaten nicht abgeschossen wurde
                if (this.rechtecke[r][s].status) {
                    this.ctx.fillStyle = this.color;
                    this.ctx.fillRect(this.rechtecke[r][s].x, this.rechtecke[r][s].y, this.breite - this.abstandMitte, this.hoehe - this.abstandMitte * 2);
                }
            }
        }
    }
}