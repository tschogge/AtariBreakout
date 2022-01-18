/**
 * @author Gioele Petrillo, Laurin Kuster
 * @
 */
function startSpiel() {
    //Der start knopf wird verborgen
    document.getElementById("startSpiel").style.display = "none";

    //Canvas wird erstellt
    /** @type{HTMLCanvasElement}*/
    let canvas = document.getElementById("theGame");
    let ctx = canvas.getContext("2d");

    //Das canvas wird angezeigt
    canvas.style.visibility = "visible";

    let balken = new Balken(canvas);
    let kreis = new Kreis(canvas, balken);
    kreis.life = 1;

    //Haupt loop
    function spielAktualisieren() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        balken.balkenBewegen();
        balken.zeichneBalken();

        //Wenn true zurückkommt, wird das Spiel beendet
        if (kreis.bewegeKreis()) {
            canvas.style.visibility = "hidden";

            return;
        }
        kreis.zeichneKreis();

        requestAnimationFrame(spielAktualisieren);
    }

    //Starte spiel
    spielAktualisieren();
}