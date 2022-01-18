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

    function spielAktualisieren() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        balken.balkenBewegen();
        balken.zeichneBalken();
        requestAnimationFrame(spielAktualisieren);
    }

    spielAktualisieren();
}