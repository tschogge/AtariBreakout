/**
 * @author Gioele Petrillo, Laurin Kuster
 * @
 */
function startSpiel() {
    //HTML Objekte
    let startGame = document.getElementById("startSpiel");
    let lostGame = document.getElementById("lostGame");
    let wonGame = document.getElementById("wonGame");
    let gameData = document.getElementById("gameData");

    //Der Knopf und Text wird verborgen
    startGame.style.display = "none";
    startGame.parentElement.style.display = "none";
    lostGame.style.display = "none";
    wonGame.style.display = "none";
    gameData.style.display = "none";

    //Canvas wird erstellt
    /** @type{HTMLCanvasElement}*/
    let canvas = document.getElementById("theGame");
    let ctx = canvas.getContext("2d");

    //Das canvas wird angezeigt
    canvas.style.display = "inline";

    let balken = new Balken(canvas);
    let rechteck = new Rechteck(canvas, 1, 1);
    let kreis = new Kreis(canvas, balken, rechteck);
    rechteck.erschaffeRechtecke(); //Rechtecke werden erschaffen

    //Haupt loop
    function spielAktualisieren() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        balken.balkenBewegen();
        balken.zeichneBalken();
        rechteck.zeichneRechtecke();
        balken.erstelleLeben(kreis.life);
        balken.zeigePunkte(kreis.getroffen);

        //Wenn true zurückkommt, wird das Spiel beendet
        if (kreis.bewegeKreis()) {
            canvas.style.display = "none";
            startGame.parentElement.style.display = "block";
            startGame.style.display = "inline";
            startGame.innerHTML = "Neu Starten";
            gameData.style.display = "inline";

            //Wenn der Spieler alle abgeschossen hat, gewinnt er sonst verliert er
            if (kreis.getroffen === rechteck.spalten * rechteck.reihen) {
                wonGame.style.display = "inline";
            } else {
                lostGame.style.display = "inline";
            }

            //Daten anzeigen
            gameData.innerHTML = "<tr>" +
                "<td>Punkte:</td>" +
                "<td>" + kreis.getroffen * balken.punkte + "</td>" +
                "</tr>" +
                "<tr>" +
                "<td>Blöcke getroffen:</td>" +
                "<td>" + kreis.getroffen + " / " + rechteck.spalten * rechteck.reihen + "</td>" +
                "</tr>" +
                "<tr>" +
                "<td>Leben übrig:</td>" +
                "<td>" + kreis.life + " / " + kreis.lifeOrig + "</td></tr>";
            return;
        }
        kreis.zeichneKreis();

        setTimeout(() => {
            requestAnimationFrame((actualTime) => {
                spielAktualisieren();
            });
        }, kreis.timeOut);
    }

    //Starte spiel
    spielAktualisieren();
}