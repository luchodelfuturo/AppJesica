// Wait for the deviceready event before using any of Cordova's device APIs.
// See https://cordova.apache.org/docs/en/latest/cordova/events/events.html#deviceready
document.addEventListener("deviceready", listo, false);
let perfiles;
var colorDeFondo;
let fondo = document.getElementById("main");
let tablaTateti = document.getElementById("ta-te-ti");
function cargarUsuarios() {
  perfiles = Storage.cargar("perfiles") || [];
  let puntajes2 = Storage.cargar("puntajes") || [];
  console.log(perfiles);
  console.log(puntajes2, "pntjs2");
  colorJugadores(perfiles);

  document.getElementById("turnosName").textContent =
    perfiles[juego.turnos - 1].nombre;
}
function colorJugadores(perfiles) {
  colorDeFondo = perfiles[juego.turnos - 1].color;
  tablaTateti.style.border = "6px solid " + colorDeFondo;
  var celdas = document.querySelectorAll("#ta-te-ti td");
  celdas.forEach(function (td) {
    td.style.border = "4px solid " + colorDeFondo;
    td.style.color = colorDeFondo;
  });
}

let juego = {
  tabla: [
    ["&nbsp;", "&nbsp;", "&nbsp;"],
    ["&nbsp;", "&nbsp;", "&nbsp;"],
    ["&nbsp;", "&nbsp;", "&nbsp;"],
  ], // fichas en el tablero
  jugadas: 0, // las jugadas que se hicieron hasta el momento
  turnos: tirarMoneda(),
  ganador: 0,
};

function empezarJuego() {
  juego = {
    tabla: [
      ["&nbsp;", "&nbsp;", "&nbsp;"],
      ["&nbsp;", "&nbsp;", "&nbsp;"],
      ["&nbsp;", "&nbsp;", "&nbsp;"],
    ],
    jugadas: 0,
    turnos: juego.turnos === 1 ? 2 : 1,
    ganador: 0,
  };
  document.getElementById("juego-terminado").classList.add("nodisp");

  hacerTabla();
}

function tirarMoneda() {
  return Math.random() > 0.5 ? 1 : 2;
}

function hacerTabla() {
  console.log("perfiles", perfiles);

  const cont = document.querySelector("#ta-te-ti tbody");
  document.getElementById("turnosName").textContent =
    perfiles[juego.turnos - 1].nombre;
  for (let r = 0; r < 3; r++) {
    for (let c = 0; c < 3; c++) {
      cont.querySelector(
        "tr:nth-of-type(" + (r + 1) + ") td:nth-of-type(" + (c + 1) + ")"
      ).innerHTML = juego.tabla[r][c];
    }
  }
}

function jugar(r, c) {
  console.log("click");
  colorJugadores(perfiles);
  console.log(perfiles);
  let inicial1 = perfiles[0].apodo;
  let inicial2 = perfiles[1].apodo;
  if (juego.jugadas < 9) {
    if (juego.tabla[r][c] === "&nbsp;") {
      juego.tabla[r][c] = juego.turnos === 1 ? inicial1 : inicial2;

      colorJugadores(perfiles);
      hacerTabla();

      if (esTaTeTi(juego.tabla[r][c])) {
        juego.ganador = juego.turnos;
        juego.jugadas = 9;
        juego.turnos = juego.turnos === 1 ? 2 : 1;
        terminado();
      } else {
        juego.jugadas++;
        juego.turnos = juego.turnos === 1 ? 2 : 1;
        hacerTabla();
        if (juego.jugadas === 9) {
          terminado();
        }
        // juego.turnos = juego.turnos === 1 ? 2 : 1;
      }
    }
  } else {
    terminado();
  }
}

function esTaTeTi(jugador) {
  return (
    esTaTeTiHorizontal(jugador) ||
    esTaTeTiVertical(jugador) ||
    esTaTeTiDiagonal(jugador)
  ); // las tres variantes del tateti para que funcionen
}

function esTaTeTiVertical(jugador) {
  return (
    (juego.tabla[0][0] === jugador &&
      juego.tabla[1][0] === jugador &&
      juego.tabla[2][0] === jugador) ||
    (juego.tabla[0][1] === jugador &&
      juego.tabla[1][1] === jugador &&
      juego.tabla[2][1] === jugador) ||
    (juego.tabla[0][2] === jugador &&
      juego.tabla[1][2] === jugador &&
      juego.tabla[2][2] === jugador)
  );
}

function esTaTeTiHorizontal(jugador) {
  return (
    (juego.tabla[0][0] === jugador &&
      juego.tabla[0][1] === jugador &&
      juego.tabla[0][2] === jugador) ||
    (juego.tabla[1][0] === jugador &&
      juego.tabla[1][1] === jugador &&
      juego.tabla[1][2] === jugador) ||
    (juego.tabla[2][0] === jugador &&
      juego.tabla[2][1] === jugador &&
      juego.tabla[2][2] === jugador)
  );
}

function esTaTeTiDiagonal(jugador) {
  return (
    (juego.tabla[0][0] === jugador &&
      juego.tabla[1][1] === jugador &&
      juego.tabla[2][2] === jugador) ||
    (juego.tabla[0][2] === jugador &&
      juego.tabla[1][1] === jugador &&
      juego.tabla[2][0] === jugador)
  );
}

// COMO PONER EL NOMBRE DEL JUGADOR GANADOR

function juegoGanador() {
  alert("Jugador " + perfiles[juego.ganador - 1].nombre + " ganó");
}

function terminado() {
  let puntajes = JSON.parse(localStorage.getItem("puntajes")) || {
    jugador1: { tateti: 0, generala: 0, tercerGame: 0 },
    jugador2: { tateti: 0, generala: 0, tercerGame: 0 },
  };
  let msg = "Empate";
  if (juego.ganador !== 0) {
    msg = "Ganó: " + perfiles[juego.ganador - 1].nombre;
    if (juego.ganador - 1 == 0) {
      puntajes.jugador1.tateti = puntajes.jugador1.tateti + 10;
    } else {
      puntajes.jugador2.tateti = puntajes.jugador2.tateti + 10;
    }
    console.log("Puntajes antes de subir, ", puntajes);
    localStorage.setItem("puntajes", JSON.stringify(puntajes));
  }
  document.querySelector("#juego-terminado .mensaje").innerHTML = msg;
  document.getElementById("juego-terminado").classList.remove("nodisp");
  document.getElementById("juego-terminado").style.display = "flex";
}

function listo() {
  console.log("Running cordova-" + cordova.platformId + "@" + cordova.version);

  empezarJuego();

  hacerTabla();
}
