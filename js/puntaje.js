let perfiles = Storage.cargar("perfiles") || [];
let puntajes = Storage.cargar("puntajes") || [];
mostrarPuntos();

function mostrarPuntos() {
  console.log(
    puntajes.jugador1.tatati,
    puntajes.jugador1.generala,
    puntajes.jugador1.tercerGame
  );
  const trEncabezado = document.querySelector("#puntos thead tr");

  for (let i = 0; i < perfiles.length; i++) {
    const thJugador = document.createElement("th");
    thJugador.innerHTML = perfiles[i].nombre;
    trEncabezado.appendChild(thJugador);
  }

  const tbody = document.querySelector("#puntos tbody");
  tbody.innerHTML = null;

  const trJuego = document.createElement("tr");

  for (let i = 0; i < perfiles.length; i++) {
    const tdJuego = document.createElement("td");
    tdJuego.innerHTML = perfiles[i].puntos;
    trJuego.appendChild(tdJuego);
  }
  tbody.appendChild(trJuego);
}
