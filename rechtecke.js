const rechteck = {
    reihen: 5,
    spalten: 6,
    breiteRechteck: 60,
    hoeheRechteck: 20,
    abstandLinks: 20,
    abstandRechts: 20,
    abstandRandOben: 40,
    abstandOben: 20,
    fillColor: "FFC300",
    strokeColor: "#C70039",
}
let rechtecke = [];
function erschaffeRechtecke() {


    //r für Reihe s für Spalten
    for (let r = 0; r < rechteck.reihen; r++) {
        rechtecke[r] = [];
        for (let s = 0; s < rechteck.spalten; s++) {
            rechtecke[r][s] = {
                x: r * (rechteck.breiteRechteck + rechteck.abstandLinks) + rechteck.abstandLinks,
                y: s * (rechteck.hoeheRechteck + rechteck.abstandOben) + rechteck.abstandRandOben,
                //Status ob Rechteck noch ganz oder bereits kaputt ist
                status: true
            };


        }
    }
}
erschaffeRechtecke();

function zeichneRechtecke() {
    for (let r = 0; r < rechteck.reihen; r++) {
        for (let s = 0; rechteck.spalten; s++) {
            if (rechteck[r][s].status) {
                ctx.fillStyle = rechteck.fillColor;
                ctx.fillRect(rechtecke[r][s].x, rechtecke[r][s].y, rechteck.breiteRechteck, rechteck.hoeheRechteck);

                ctx.strokeStyle = rechteck.strokeColor;
                ctx.strokeRect(rechtecke[r][s].x, rechtecke[r][s].y, rechteck.breiteRechteck, rechteck.hoeheRechteck);

            }
        }
    }

}