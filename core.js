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

    let life = 3;
    function spielAktualisieren() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        balken.balkenBewegen();
        balken.zeichneBalken();
        kreis.bewegeKreis();
        kreis.zeichneKreis();
        requestAnimationFrame(spielAktualisieren);
    }

    spielAktualisieren();
}