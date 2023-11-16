let perfiles = Storage.cargar("perfiles") || [];

mostrarPuntos()

function mostrarPuntos(){


    const trEncabezado = document.querySelector("#puntos thead tr");

    for(let i = 0; i < perfiles.length; i++){
        const thJugador = document.createElement("th");
        thJugador.innerHTML = perfiles[i].nombre
        trEncabezado.appendChild(thJugador);
    }

    const tbody = document.querySelector("#puntos tbody");
    tbody.innerHTML = null;

    const trJuego = document.createElement("tr");
        
    for(let i=0; i < perfiles.length;i++){
        const tdJuego = document.createElement("td");
        tdJuego.innerHTML = perfiles[i].puntos;
        trJuego.appendChild(tdJuego);

        
    }
    tbody.appendChild(trJuego);

}