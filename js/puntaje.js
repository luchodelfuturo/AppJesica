let perfiles = Storage.cargar("perfiles") || [];
let puntajes = Storage.cargar("puntajes") || {
    jugador1: { tateti: 0, generala: 0, memotest: 0 },
    jugador2: { tateti: 0, generala: 0, memotest: 0 }
};

mostrarPuntos();

function mostrarPuntos() {
    console.log("Puntajes actuales:", puntajes);

    const trEncabezado = document.querySelector("#puntos thead tr");
    trEncabezado.innerHTML = "";
    const thVacio = document.createElement("th");
    trEncabezado.appendChild(thVacio);

    for (let i = 0; i < perfiles.length; i++) {
        const thJugador = document.createElement("th");
        thJugador.innerHTML = perfiles[i].nombre;
        trEncabezado.appendChild(thJugador);
    }

    const tbody = document.querySelector("#puntos tbody");
    tbody.innerHTML = "";
    const juegos = ["tateti", "generala", "memotest"];

    juegos.forEach((juego) => {
        const trJuego = document.createElement("tr");
        const tdNombreJuego = document.createElement("td");
        tdNombreJuego.innerHTML = juego;
        trJuego.appendChild(tdNombreJuego);

        for (let i = 0; i < perfiles.length; i++) {
            const tdPuntos = document.createElement("td");
            tdPuntos.innerHTML = puntajes[`jugador${i + 1}`][juego] || 0;
            trJuego.appendChild(tdPuntos);
        }
        tbody.appendChild(trJuego);
    });
}
