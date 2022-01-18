/**
 * @author Gioele Petrillo, Laurin Kuster
 * @
 */
function startSpiel() {
    //HTML Objekte
    let startGame = document.getElementById("startSpiel");
    let lostGame = document.getElementById("lostGame");

    //Der Knopf und Text wird verborgen
    startGame.style.display = "none";
    lostGame.style.display = "none";

    //Canvas wird erstellt
    /** @type{HTMLCanvasElement}*/
    let canvas = document.getElementById("theGame");
    let ctx = canvas.getContext("2d");

    //Das canvas wird angezeigt
    canvas.style.display = "inline";

    let balken = new Balken(canvas);
    let kreis = new Kreis(canvas, balken);
    let rechteck = new Rechteck(canvas);
    rechteck.erschaffeRechtecke();

    //Haupt loop
    function spielAktualisieren() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        balken.balkenBewegen();
        balken.zeichneBalken();
        rechteck.zeichneRechtecke();

        //Wenn true zurückkommt, wird das Spiel beendet
        if (kreis.bewegeKreis()) {
            canvas.style.display = "none";
            lostGame.style.display = "inline";
            startGame.style.display = "inline";
            startGame.innerHTML = "Neu Starten";
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