class Kreis {
    /**
     * @param canvas            Das Canvas Element
     * @param balken            Das Balken Objekt
     * @param radius            Radius des Kreises (optional -> standard: 10)
     * @param color             Farbe des Kreises (optional -> standard: #ffdc2b)
     * @param geschwindigkeit   Wie schnell der Kreis maximal sich bewegen kann (optional -> standard: 3)
     * @param life              Anzahl Leben des Benutzers (optional -> standard: 3)
     * @param rechteck          Das Rechteck Objekt
     */
    constructor(canvas, balken, rechteck, radius = 10, color = "#ffdc2b", geschwindigkeit = 3, life = 3) {
        this.x = canvas.width / 2;
        this.radius = radius;
        this.y = canvas.height - balken.height - this.radius - 5;
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
        this.color = color;
        this.geschwindigkeit = geschwindigkeit;
        this.bekommeX(true, true);
        this.yBewegung = -this.geschwindigkeit;
        this.life = life;
        this.balken = balken;
        this.timeOut = 0;
        this.rechteck = rechteck;
    }

    //Zeichnet den Kreis
    zeichneKreis() {
        this.ctx.beginPath();
        this.ctx.fillStyle = this.color;
        this.ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
        this.ctx.fill();
        this.ctx.closePath();
    }

    //Bewegt den kreis im feld umher
    bewegeKreis() {
        this.timeOut = 0;
        //Wenn true, dann sind alle leben aufgebraucht
        if (this.trifftWand()) {
            return true;
        }

        //Bewege, wenn kein Timeout besteht
        if (this.timeOut === 0) {
            this.y += this.yBewegung;
            this.x += this.xBewegung;
        }
    }

    //Berechnet, ob der Kreis die Wand irgendwo berührt und ändert Richtung
    trifftWand() {
        if (this.x + this.radius >= this.canvas.width) {              //Wenn es an die rechte Wand kommt
            this.bekommeX(true, false);
        } else if (this.x <= 0) {                        //Wenn es an die Linke Wand kommt
            this.bekommeX(false, true);
        } else if (this.y >= this.canvas.height) {      //Wenn es an den Boden kommt
            this.yBewegung = -this.geschwindigkeit;
            this.life--;                                //Leben runterzählen
            this.kreisZuruecksetzen();
        } else if (this.y <= 0) {                         //Wenn es an das Dach kommt
            this.yBewegung = this.geschwindigkeit;
        } else if (this.y >= this.balken.y && this.x >= this.balken.x && this.x <= this.balken.x + this.balken.width) { //Wenn der Kreis das Brett berührt
            this.yBewegung = -this.geschwindigkeit;
        }

        //Wenn er kein leben mehr hat, wird true zurückgegeben
        if (this.life === 0) {
            return true;
        }
    }

    //Setzt den Ball zurück auf die Position und wartet
    kreisZuruecksetzen() {
        this.x = this.canvas.width / 2;
        this.y = this.canvas.height - this.balken.height - 5 - this.radius;
        this.bekommeX(true, true);
        this.timeOut = 2000;
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.rechteck.zeichneRechtecke();
        this.balken.balkenZuruecksetzen();
        this.zeichneKreis();
    }

    //Generiert werte, um verschieden nach x zu gehen
    bekommeX(minus, plus) {
        if (minus && !plus) {
            this.xBewegung = -3 * Math.random();
        } else if (plus && !minus) {
            this.xBewegung = 3 * Math.random();
        } else if (minus && plus) {
            this.xBewegung = 3 * (Math.random() * 2 - 1);
        }
    }
}