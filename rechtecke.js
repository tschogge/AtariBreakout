//Rechteck instanzieren
const rechteck = {
    reihen: 5,
    spalten: 6,
    breiteRechteck: 60,
    hoeheRechteck: 20,
    abstandLinks: 16,
    abstandRechts: 16,
    abstandRandOben: 40,
    abstandOben: 20,
    fillColor: "FFC300",
    strokeColor: "#C70039",
}


function erschaffeRechtecke() {
    //Array mit Rechtecken erstellen
    let rechtecke = [];
    //r für Reihe s für Spalten
    for (let r = 0; r < rechteck.reihen; r++) {
        rechtecke[r] = [];
        for (let s = 0; s < rechteck.spalten; s++) {
            rechtecke[r][s] = {
                //position der Rechtecke speichern; Abstand von Rechtecken nach Muster berechnen
                x: r * (rechteck.breiteRechteck + rechteck.abstandLinks) + rechteck.abstandLinks,
                y: s * (rechteck.hoeheRechteck + rechteck.abstandOben) + rechteck.abstandRandOben,
                //Status ob Rechteck noch ganz oder bereits kaputt ist
                status: true
            };


        }
    }
    return rechtecke;
}


function zeichneRechtecke(ctx, rechtecke) {
    //zuerst reihe auswählen
    for (let r = 0; r < rechteck.reihen; r++) {
        //dann spalte zeichnen
        for (let s = 0; s < rechteck.spalten; s++) {
            //wenn das Rechteck auf diesen Kordinaten nicht abgeschossen wurde
            if (rechtecke[r][s].status) {
                console.log("KEKW");
                ctx.fillStyle = rechteck.fillColor;
                ctx.fillRect(rechtecke[r][s].x, rechtecke[r][s].y, rechteck.breiteRechteck, rechteck.hoeheRechteck);
                ctx.strokeStyle = rechteck.strokeColor;
                ctx.strokeRect(rechtecke[r][s].x, rechtecke[r][s].y, rechteck.breiteRechteck, rechteck.hoeheRechteck);

            }
        }
    }

}