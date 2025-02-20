let cartas = ["🍎", "🍌", "🍇", "🍉", "🍓", "🍒", "🍍", "🥭"];
cartas = [...cartas, ...cartas];
cartas.sort(() => Math.random() - 0.5);

let tablero = document.getElementById("tablero");
let primeraCarta = null;
let segundaCarta = null;
let bloqueo = false;
let turno = 1;
let paresJugador1 = 0;
let paresJugador2 = 0;
let totalPares = cartas.length / 2;

let perfiles = JSON.parse(localStorage.getItem("perfiles")) || [
    { nombre: "Jugador 1", color: "blue" },
    { nombre: "Jugador 2", color: "red" }
];
let puntajes = JSON.parse(localStorage.getItem("puntajes")) || {
    jugador1: { tateti: 0, generala: 0, memotest: 0 },
    jugador2: { tateti: 0, generala: 0, memotest: 0 }
};

function actualizarTurno() {
    let jugadorActual = perfiles[turno - 1];
    let nombreJugador = document.getElementById("nombreJugador");
    nombreJugador.textContent = jugadorActual.nombre;
    nombreJugador.style.color = jugadorActual.color;
}

function crearTablero() { 
    tablero.innerHTML = ""; // Limpia el tablero antes de crearlo
    cartas.forEach((emoji, index) => {
        let carta = document.createElement("div");
        carta.classList.add("carta");
        carta.dataset.index = index;
        carta.dataset.emoji = emoji;
        carta.textContent = "?";
        carta.addEventListener("click", voltearCarta);
        tablero.appendChild(carta);
    });

    actualizarTurno();
}

function voltearCarta(event) {
    if (bloqueo) return;

    let carta = event.target;
    if (carta.classList.contains("volteada")) return;  // Si hay dos cartas volteadas, no permite más clics

    let jugadorActual = perfiles[turno - 1];

    carta.textContent = carta.dataset.emoji;
    carta.classList.add("volteada"); // Evita voltear una ya volteada
    carta.style.backgroundColor = jugadorActual.color;

    if (!primeraCarta) {
        primeraCarta = carta;
    } else {
        segundaCarta = carta;
        bloqueo = true;

        setTimeout(() => {
                 // ¡Par encontrado! Oculta las cartas
            if (primeraCarta.dataset.emoji === segundaCarta.dataset.emoji) {
                primeraCarta.style.visibility = "hidden";
                segundaCarta.style.visibility = "hidden";
                if (turno === 1) {
                    paresJugador1++;
                } else {
                    paresJugador2++;
                }
            } else {
                // No son iguales, las voltea de nuevo
                primeraCarta.textContent = "?";
                segundaCarta.textContent = "?";
                primeraCarta.classList.remove("volteada");
                segundaCarta.classList.remove("volteada");
                primeraCarta.style.backgroundColor = "grey";
                segundaCarta.style.backgroundColor = "grey";
                turno = turno === 1 ? 2 : 1;
                actualizarTurno();
            }

            primeraCarta = null;
            segundaCarta = null;
            bloqueo = false;
            if (paresJugador1 + paresJugador2 === totalPares) {
                finalizarJuego();
            }
        }, 1000); // Espera 1 segundo antes de voltear o eliminar las cartas
    }
}

function finalizarJuego() {
    let ganador = null;
    if (paresJugador1 > paresJugador2) {
        ganador = 1;
    } else if (paresJugador2 > paresJugador1) {
        ganador = 2;
    }

    let mensaje = "¡Empate! Nadie gana puntos.";
    if (ganador) {
        puntajes[`jugador${ganador}`].memotest += 20;
        localStorage.setItem("puntajes", JSON.stringify(puntajes));
        mensaje = `¡${perfiles[ganador - 1].nombre} gana con más pares!`;
    }

    document.getElementById("mensajeGanador").textContent = mensaje;
    document.getElementById("popup").style.display = "block";
}

function cerrarPopup() {
    document.getElementById("popup").style.display = "none";
 reiniciarJuego();
}

function reiniciarJuego() {
    cartas.sort(() => Math.random() - 0.5);
    paresJugador1 = 0;
    paresJugador2 = 0;
    turno = 1;
    crearTablero();
}

document.getElementById("reiniciar").addEventListener("click", reiniciarJuego);

crearTablero();

