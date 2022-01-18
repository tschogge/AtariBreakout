function startSpiel() {
    //Der start knopf wird verborgen
    document.getElementById("startSpiel").style.display = "none";

    //Canvas wird erstellt
    /** @type{HTMLCanvasElement}*/
    let canvas = document.getElementById("theGame");
    let ctx = canvas.getContext("2d");

    //Das canvas wird angezeigt
    canvas.style.visibility = "visible";

    rechteckZeichnen(ctx, 50, 10);
}

function rechteckZeichnen(ctx, x, y) {
    ctx.fillStyle = "#c71515";
    ctx.fillRect(x, y, 70, 30);

}

function balkenZeichnen(ctx, x, y) {
    const balkenHoehe = 20;
    const balkenBreite = 100;

}