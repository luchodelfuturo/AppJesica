let perfiles = Storage.cargar("perfiles") || [];
let puntajes = Storage.cargar("puntajes") || [];
mostrarPuntos();

// function mostrarPuntos() {
//   console.log(
//     puntajes.jugador1.tatati,
//     puntajes.jugador1.generala,
//     puntajes.jugador1.tercerGame
//   );
//   const trEncabezado = document.querySelector("#puntos thead tr");

//   for (let i = 0; i < perfiles.length; i++) {
//     const thJugador = document.createElement("th");
//     thJugador.innerHTML = perfiles[i].nombre;
//     trEncabezado.appendChild(thJugador);
//   }

//   const tbody = document.querySelector("#puntos tbody");
//   tbody.innerHTML = null;

//   const trJuego = document.createElement("tr");

//   for (let i = 0; i < perfiles.length; i++) {
//     const tdJuego = document.createElement("td");
//     tdJuego.innerHTML = perfiles[i].puntos;
//     trJuego.appendChild(tdJuego);
//   }
//   tbody.appendChild(trJuego);
// }
function mostrarPuntos() {
  console.log(
    puntajes.jugador1.tatati,
    puntajes.jugador1.generala,
    puntajes.jugador1.tercerGame
  );

  // Crear el encabezado de la tabla con los nombres de los jugadores
  const trEncabezado = document.querySelector("#puntos thead tr");
  trEncabezado.innerHTML = null; // Limpiar el encabezado existente

  // Crear la primera celda del encabezado como vacía ya que la primera columna serán los juegos
  const thVacio = document.createElement("th");
  trEncabezado.appendChild(thVacio);

  // Llenar el encabezado con los nombres de los jugadores
  for (let i = 0; i < perfiles.length; i++) {
    const thJugador = document.createElement("th");
    thJugador.innerHTML = perfiles[i].nombre;
    trEncabezado.appendChild(thJugador);
  }

  const tbody = document.querySelector("#puntos tbody");
  tbody.innerHTML = ""; // Limpiar el cuerpo de la tabla existente

  // Suponiendo que tienes un objeto juegos que contiene los nombres de los juegos y los puntos de cada jugador
  const juegos = ["tatati", "2enerala", "tercerGame"];

  // Crear una fila para cada juego
  juegos.forEach((juego) => {
    const trJuego = document.createElement("tr");

    // Crear la primera celda de la fila con el nombre del juego
    const tdNombreJuego = document.createElement("td");
    tdNombreJuego.innerHTML = juego;
    trJuego.appendChild(tdNombreJuego);

    // Llenar el resto de la fila con los puntos de cada jugador para ese juego
    for (let i = 0; i < perfiles.length; i++) {
      const tdPuntos = document.createElement("td");
      // Suponiendo que puntajes es un objeto que tiene una estructura similar a:
      // puntajes = { 'jugador1': { 'tatati': 10, 'generala': 20, ... }, 'jugador2': { ... }, ... }
      tdPuntos.innerHTML = puntajes[`jugador${i + 1}`][juego];
      trJuego.appendChild(tdPuntos);
    }
    tbody.appendChild(trJuego);
  });
}
