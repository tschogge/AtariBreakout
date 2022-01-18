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
    balken.zeichneBalken();
    balken.initialisiereBalken();
}