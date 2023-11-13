const game = {

    dados: [],

    seleccionados: [],

    cantJugadores: 2,

    turno:  0,

    tiros: 0,

    tirosTotales: 0,

    puntos: {
        "1": [],
        "2": [],
        "3": [],
        "4": [],
        "5": [],
        "6": [],
        "E": [],
        "F": [],
        "P": [],
        "G": [],
        "D": [],
        "T": []

    },

    dadosize: 100
};

const atQuarter = game.dadosize * 0.25;

const atHalf = game.dadosize * 0.5;

const at3Quarter = game.dadosize * 0.75;

const radius = game.dadosize * 0.1;


document.addEventListener('deviceready', onDeviceReady, false);

initGame();

function iniPuntaje (queJuego){

    const puntaje = [];

    for (let i = 0; i < game.cantJugadores; i++) {

        puntaje.push(queJuego === "T" ? 0 : -1);
    }

    return puntaje;
 
}


function nroAlAzar (min, max){

    return Math.floor(Math.random() * (max - min + 1) + min);
}

function mostrarDados(){

    const cont = document.getElementById("dados");

    cont.innerHTML = null;

    for (let i = 0; i< 5; i++){

      cont.appendChild(mostrarDado(i, game.dados[i]));
    }

}

const mostrarDado = (i, numero) => {

    let dado = document.createElement("canvas");

    dado.classList.add ("dado");

    dado.setAttribute("data-pos", "" + i);

    dado.setAttribute("width", "" + game.dadosize);

    dado.setAttribute("height", "" + game.dadosize);

    dado.style.borderRadius = (game.dadosize / 100) + "em";

    dado.style.margin = (game.dadosize / 200) + "em";

    dibujarDado(dado, numero);

    dado.onclick = () => { seleccionar(dado); }

    return dado;
};

function mostrarTurnos(){

    document.querySelector("#tiros span").innerHTML = game.tiros;

}


function seleccionar(dado){
    
    const i = Number(dado.getAttribute("data-pos"));

    game.seleccionados[i] = !game.seleccionados[i];

        if (game.seleccionados[i]) {

            dado.classList.add("seleccionado");

        } else {

            dado.classList.remove("seleccionado");

        }
}

function dibujarTablaPuntos (){

    const trEncabezado = document.querySelector("#puntajes thead tr");

    trEncabezado.innerHTML = "<th>Juego</th>";

    for (let i = 0; i < game.cantJugadores; i++){

        const thJugador = document.createElement("th");
       
        thJugador.innerHTML = "J" + (i + 1);

        trEncabezado.appendChild(thJugador);

    }

    const tbody = document.querySelector("#puntajes tbody");

    tbody.innerHTML = null;

    ["1", "2", "3", "4", "5", "6", "E", "F", "P", "G", "D", "T"].forEach(key => {

        const trJuego = document.createElement("tr");
        
        const tdJuego = document.createElement("td");

        tdJuego.innerHTML = key;

        trJuego.appendChild(tdJuego);

        for (let i = 0; i < game.cantJugadores; i++) {

            const tdJugador = document.createElement("td");

            const puntajeJuego = game.puntos[key][i];

            tdJugador.innerHTML = puntajeJuego === -1 ? "-" : puntajeJuego === 0 ? "X" : puntajeJuego;

            trJuego.appendChild(tdJugador);
    
        }

        if (key != "T"){

            trJuego.onclick = () => anotarPuntaje(key);

        }
            tbody.appendChild(trJuego);
    });

    Array.from(document.querySelectorAll("#puntajes thead th, #puntajes tbody td")).forEach(celda => celda.classList.remove("turnoActual"));
// resalta columna del jugador que esta en este momento

    document.querySelector("#puntajes thead th:nth-of-type(" + (game.turno + 2) +")").classList.add("turnoActual");

    Array.from(document.querySelectorAll("#puntajes tbody td:nth-of-type(" + (game.turno + 2) +")")).forEach(celda  => celda.classList.add("turnoActual"));

}


function anotarPuntaje(queJuego) {

    if (game.puntos[queJuego][game.turno] !== -1){

        mostrarModal("Juego ya anotado", "¡NO se puede volver a anotar '" +  queJuego + "'!");

    } else {

        const puntaje = calcularPuntaje(queJuego);

            if (puntaje === 0){

                mostrarConfirmacion("¿Desea tacharse '" + queJuego + "'?", queJuego);

            } else {
                
                if (queJuego === "D" && game.puntos["G"][game.turno] !==50){

                    mostrarModal ("No se puede tachar la Doble","¡Primero debe anotarse la generala!");

                } else {

                    game.puntos[queJuego][game.turno] = puntaje;

                    game.puntos["T"][game.turno] += puntaje;
                
                    cambiarTurno();

                }
            }
        
    }
}

    console.info("Anotar juego " + queJuego + " para el jugador J" + (game.turno + 1));

    console.info(calcularPuntaje(queJuego));


function calcularPuntaje(queJuego){

const dadosCopia = copyArray(game.dados).sort();

    switch (queJuego){

        case "E":

          return esEscalera(dadosCopia) ? (game.tiros === 1 ? 25 : 20) : 0;
       
          case "F":

            return esFull(dadosCopia) ? (game.tiros === 1 ? 35 : 30) : 0;

        case "P":
            
           return esPoker(dadosCopia) ? (game.tiros === 1 ? 45 : 40) : 0;

        case "G":
            
           return esGenerala(dadosCopia) ? 50 : 0;

        case "D":
            
           return esGenerala(dadosCopia) ? 100 : 0;

        default:
            
           return puntajeNumeros(Number(queJuego));
            
        
    }
}

function dibujarDado(cont,numero) {

    let ctx = cont.getContext("2d");

    //borro

     ctx.clearRect (0, 0, game.dadosize, game.dadosize);

     //dado

     ctx.beginPath();

     ctx.rect(0, 0, game.dadosize, game.dadosize);

     ctx.fillStyle ="#FFFFFF";

     ctx.fill();

     ctx.closePath();

     switch (numero){

            case 1: 
                dibujarCirculo(ctx, atHalf, atHalf);
                break;

            case 2:
                dibujarCirculo(ctx, at3Quarter, atQuarter);
                dibujarCirculo(ctx, atQuarter, at3Quarter);
                break;

            case 3:
                dibujarCirculo(ctx, at3Quarter, atQuarter);
                dibujarCirculo(ctx, atQuarter, at3Quarter);
                dibujarCirculo(ctx, atHalf, atHalf);
                break;

            case 4:
                dibujarCirculo(ctx, at3Quarter, atQuarter);
                dibujarCirculo(ctx, atQuarter, at3Quarter);
                dibujarCirculo(ctx, atQuarter, atQuarter);
                dibujarCirculo(ctx, at3Quarter, at3Quarter);
                break;

            case 5:
                dibujarCirculo(ctx, at3Quarter, atQuarter);
                dibujarCirculo(ctx, atQuarter, at3Quarter);
                dibujarCirculo(ctx, atQuarter, atQuarter);
                dibujarCirculo(ctx, at3Quarter, at3Quarter);
                dibujarCirculo(ctx, atHalf, atHalf);
                break;

            case 6:
                dibujarCirculo(ctx, at3Quarter, atQuarter);
                dibujarCirculo(ctx, atQuarter, at3Quarter);
                dibujarCirculo(ctx, atQuarter, atQuarter);
                dibujarCirculo(ctx, at3Quarter, at3Quarter);
                dibujarCirculo(ctx, atQuarter, atHalf);
                dibujarCirculo(ctx, at3Quarter, atHalf);
                break;

     }


}

function dibujarCirculo (ctx, x , y){
     
    ctx.beginPath();

    ctx.arc(x, y, radius, 0, 2 * Math.PI, false);

    ctx.fillStyle = "#000000";

    ctx.fill();

    ctx.closePath();

}


function tirarDados(){

    if (game.tiros === 0) {

        game.seleccionados = [true, true, true, true, true];
    }

    for (let i= 0; i < 5; i++){

        if (game.seleccionados[i]) {

            game.dados[i] = nroAlAzar(1, 6);
        }

    }
        game.seleccionados = [false, false, false, false, false];

        game.tiros++;
        
    if (game.tiros === 3) {

        document.getElementById("tirarDados").onclick = () => mostrarModal ("Anotar un juego","Se debe anotar algun un puntaje");
    }

    mostrarTurnos();
}

function cambiarTurno() {

    game.tiros = 0;

    game.dados = [];

    game.seleccionados = [];

    game.turno++;

    if (game.turno > game.cantJugadores - 1) {

        game.turno = 0;
    }

    document.getElementById("tirarDados").onclick = () => tirar();

   
    mostrarTurnos();

    mostrarDado();

    dibujarTablaPuntos();

    game.tirosTotales++;

    if (game.tirosTotales === 11 * game.cantJugadores){

        gameOver();
    }
}

function tirar(){

        tirarDados();

        mostrarDados();
}


function initGame (){

    game.turno = nroAlAzar(0, game.cantJugadores - 1);

    ["1", "2", "3", "4", "5", "6", "E", "F", "P", "G", "D", "T"].forEach(key => {
        game.puntos[key] = iniPuntaje(key);
    });
    
    game.dados = [0, 0, 0, 0, 0];

    game.tiros = 0;

    game.tirosTotales = 0;

    game.seleccionados = [false, false, false, false, false];


    mostrarTurnos();

    dibujarTablaPuntos();
}

function puntajeNumeros(numero){

    let puntaje = 0;

    for (let i = 0; i < 5; i++){
        
        if (game.dados[i] === numero){

            puntaje += numero;

        }

    }

        return puntaje;
}

function esEscalera(dados) {

    return /12345|23456|13456/.test(dados.join(""));

}

function esGenerala(dados) {

    return /1{5}|2{5}|3{5}|4{5}|5{5}|6{5}/.test(dados.join(""));
}

function esPoker(dados) {

    return /^([1-6])\1{3}.*$/.test(dados.join(""));

    //return /1{4}[2-6]|12222|13333|14444|15555|16666|2{4}[3-6]|23333|24444|25555|26666|3{4}[4-6]|34444|35555|36666|4{4}[5-6]|45555|46666|5{4}6|56666/.test(dados.join(""));
    
}


function esFull(dados) {

    return /^1{2}([2-6])\1{2}$|^1{3}([2-6])\2{1}$|^2{3}([3-6])\3{1}$|^2{2}([3-6])\4{2}$|^3{3}([4-6])\5{1}$|^3{2}([4-6])\6{2}$|^4{3}([5-6])\7$|^4{2}([5-6])\8{2}$|^5{3}6{2}$|^5{2}6{3}$/mg.test(dados.join(""));

}

function gameOver() {

    let mensaje = "";

    const totales = game.puntos["T"];

    if (allEqual(totales)) {

        mensaje += "Empate";

    } else {

        mensaje += "Gano J" + (totales.indexOf(Math.max(...totales)) + 1);
    }

    document.getElementById("tirarDados").setAttribute("disabled", "disabled");

    mostrarModal ("Juego terminado. ", mensaje);
    
}

function mostrarModal (titulo, mensaje){

    const modal = document.getElementById("modal");

    modal.querySelector("h2").innerHTML = titulo;

    modal.querySelector("p").innerHTML = mensaje;

    modal.classList.remove("nodisp");

}

function mostrarConfirmacion(mensaje, queJuego){
    
    const modal = document.getElementById("modal2");

    modal.querySelector("p").innerHTML = mensaje;

    modal.setAttribute("data-que-juego", queJuego);

    modal.classList.remove("nodisp");

    
}

function confirmAceptado (){

    const queJuego = document.getElementById("modal2").getAttribute("data-que-juego");

    if (queJuego === "G" && game.puntos["D"][game.turno] !== 0){

        mostrarModal("No se puede tachar la Generala", "¡Primero se debe tachar la doble (D)!");
    
    } else {

        game.puntos[queJuego][game.turno] = 0;

        cambiarTurno();

    }

    document.getElementById('modal2').classList.add('nodisp');

}

function confirmRechazado(){

    document.getElementById('modal2').classList.add('nodisp');

}

function onDeviceReady() {
    
    console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);

    initGame();
   
}

function copyArray(a){

    return a.slice();

}

const allEqual = arr => arr.every(val => val === arr[0]);
