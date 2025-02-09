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
    tablero.innerHTML = "";
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
    if (carta.classList.contains("volteada")) return;

    let jugadorActual = perfiles[turno - 1];

    carta.textContent = carta.dataset.emoji;
    carta.classList.add("volteada");
    carta.style.backgroundColor = jugadorActual.color;

    if (!primeraCarta) {
        primeraCarta = carta;
    } else {
        segundaCarta = carta;
        bloqueo = true;

        setTimeout(() => {
            if (primeraCarta.dataset.emoji === segundaCarta.dataset.emoji) {
                primeraCarta.style.visibility = "hidden";
                segundaCarta.style.visibility = "hidden";
                if (turno === 1) {
                    paresJugador1++;
                } else {
                    paresJugador2++;
                }
            } else {
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
        }, 1000);
    }
}

document.getElementById("reiniciar").addEventListener("click", () => location.reload());

crearTablero();