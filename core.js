/**
 * @author      Gioele Petrillo, Laurin Kuster
 * @version     1.4
 * @description Die Haupt Datei, die das Spiel laufen lässt. 25.01.2022
 */

//Wenn der nutzer auf den Einstellungen Text klickt
document.getElementById("einstellungenText").onclick = () => {
    //Verstecke Text und zeige Einstellungen an
    document.getElementById('gameSettings').style.display = 'inherit';
    document.getElementById("einstellungenText").style.display = 'none';
}

function startSpiel() {

    //HTML Objekte
    let einstellungen = document.getElementById("gameSettings");
    let startGame = document.getElementById("startSpiel");
    let lostGame = document.getElementById("lostGame");
    let wonGame = document.getElementById("wonGame");
    let gameData = document.getElementById("gameData");
    /** @type{HTMLCanvasElement}*/
    let canvas = document.getElementById("theGame");
    let ctx = canvas.getContext("2d");

    //Der Knopf und Text wird verborgen und das Canvas angezeigt
    startGame.style.display = "none";
    startGame.parentElement.style.display = "none";
    lostGame.style.display = "none";
    wonGame.style.display = "none";
    gameData.style.display = "none";
    canvas.style.display = "inline";

    let balken = new Balken(canvas);
    let rechteck = new Rechteck(canvas);
    let kreis = new Kreis(canvas, balken, rechteck);

    //Es wird geschaut, ob die einstellungen verändert wurden
    if (einstellungen.style.display === "inherit") {
        /** @type{HTMLFormElement}*/
        let einstellungenForm = document.getElementById("einstellungenForm");

        //Wenn etwas eingegeben wurde und gültig, dann annehmen
        if (einstellungenForm.elements['spalten'].value > 0 && einstellungenForm.elements['spalten'].value <= 15) { //Spalten
            rechteck.setSpalten(einstellungenForm.elements['spalten'].value);
        }
        if (einstellungenForm.elements['reihen'].value > 0 && einstellungenForm.elements['reihen'].value <= 15) { //Reihen
            rechteck.reihen = einstellungenForm.elements['reihen'].value;
        }
        if (einstellungenForm.elements['geschwindigkeit'].value !== 0) {
            if (einstellungenForm.elements['geschwindigkeit'].value === "2") {
                kreis.geschwindigkeit = 4;
                balken.move = 5;
            } else if (einstellungenForm.elements['geschwindigkeit'].value === "3") {
                kreis.geschwindigkeit = 6;
                balken.move = 8;
            } else if (einstellungenForm.elements['geschwindigkeit'].value === "4") {
                kreis.geschwindigkeit = 8;
                balken.move = 10;
            } else {
                kreis.geschwindigkeit = 2;
                balken.move = 5;
            }
            //Setze Bewegung am Anfang
            kreis.yBewegung = -kreis.geschwindigkeit;
        }
        if (einstellungenForm.elements['leben'].value.length !== 0 && einstellungenForm.elements['leben'].value > 0) {
            kreis.life = (einstellungenForm.elements['leben'].value);
            kreis.lifeOrig = kreis.life
        }
    }

    //Rechtecke werden erschaffen
    rechteck.erschaffeRechtecke();

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

            let multiplikator = 0;
            if (kreis.life <= 0) {
                multiplikator = 1;
            } else {
                multiplikator = kreis.life;
            }
            //Daten anzeigen
            gameData.innerHTML = "<tr>" +
                "<td>Punkte:</td>" +
                "<td>" + kreis.getroffen * balken.punkte * multiplikator + "</td>" +
                "</tr>" +
                "<tr>" +
                "<td>Blöcke getroffen:</td>" +
                "<td>" + kreis.getroffen + " / " + rechteck.spalten * rechteck.reihen + "</td>" +
                "</tr>" +
                "<tr>" +
                "<td>Leben übrig:</td>" +
                "<td>" + kreis.life + " / " + kreis.lifeOrig + "</td></tr>" +
                "<tr>" +
                "<td>Persöhnliche Leistung:</td>" +
                "<td>" + Math.round(((kreis.getroffen * balken.punkte * multiplikator) / (kreis.lifeOrig * rechteck.reihen * rechteck.spalten * balken.punkte) * 100)) + "%</td></tr>";
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