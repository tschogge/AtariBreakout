class Kreis {
    constructor(canvas, balken, radius = 10, color = "#ffdc2b", geschwindigkeit = 3, life = 3) {
        this.x = canvas.width / 2;
        this.radius = radius;
        this.y = canvas.height - balken.height - this.radius - 5;
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
        this.color = color;
        this.geschwindigkeit = geschwindigkeit;
        this.xBewegung = this.geschwindigkeit;
        this.yBewegung = -this.geschwindigkeit;
        this.life = life;
    }

    //Zeichnet den Kreis
    zeichneKreis() {
        this.ctx.fillStyle = this.color;
        this.ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
        this.ctx.fill();
    }

    //Bewegt den kreis im feld umher
    bewegeKreis() {
        this.trifftWand();

        //Bewege
        this.y += this.yBewegung;
        this.x += this.xBewegung;
    }

    //Berechnet, ob der Kreis die Wand irgendwo berührt und ändert Richtung
    trifftWand() {
        console.log(this.x + this.radius + " " + this.canvas.width);
        if (this.x + this.radius >= this.canvas.width) {              //Wenn es an die rechte Wand kommt
            this.xBewegung = -this.geschwindigkeit;
        } else if (this.x <= 0) {                        //Wenn es an die Linke Wand kommt
            this.xBewegung = this.geschwindigkeit;
        } else if (this.y >= this.canvas.height) {      //Wenn es an den Boden kommt
            this.yBewegung = -this.geschwindigkeit;
            this.life--;
        } else if (this.y <= 0) {                         //Wenn es an das Dach kommt
            this.yBewegung = this.geschwindigkeit;
        }
    }
}