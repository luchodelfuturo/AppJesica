const Storage = {
  cargar: (key) => {
    try {
      return JSON.parse(localStorage.getItem(key));
    } catch (x) {
      console.error("No se pudo leer el item" + key + ". Error: " + x);

      return null;
    }
  },

  guardar: (key, obj) => {
    localStorage.setItem(key, JSON.stringify(obj)); //stringify: te convierte un objeto en string
  },

  borrar: (key) => {
    localStorage.removeItem(key);
  },

  limpiar: () => {
    localStorage.clear();
  },
};

const utils = {
  validarCamposDeTexto: (campos, longMin, funcValidacion) => {
    for (const campo of campos) {
      const el = document.getElementById(campo);

      const valor = el.value;

      if (valor.length < longMin || !funcValidacion(campo, valor)) {
        el.classList.add("notValid");

        el.focus();

        return false;
      } else {
        el.classList.remove("notValid");
      }
    }

    return true;
  },
};

// BTN 3ER JUEGO --> POPUP //

function mostrarPopup(mensaje) {
  document.getElementById("popup-texto").textContent = mensaje;
  document.getElementById("popup").style.display = "block";
}
function mostrarPopupPuntos() {
  document.getElementById("popupPuntos").style.display = "block";
}

function cerrarPopup() {
  document.getElementById("popup").style.display = "none";
}
function cerrarPopUpPuntos() {
  document.getElementById("popupPuntos").style.display = "none";
}

document.addEventListener("DOMContentLoaded", function () {
  // Agregar un evento de clic al botón "3er Juego"
  const btn3 = document.getElementById("boton-3er-juego");
  const btnPuntos = document.getElementById("botonPuntos");
  if (btn3) {
    btn3.addEventListener("click", function (event) {
      event.preventDefault();

      mostrarPopup(
        "Este Juego va a estar disponible más adelante, ¡Mil disculpas!"
      );
    });
  }

  if (btnPuntos) {
    btnPuntos.addEventListener("click", function (event) {
      event.preventDefault();
      mostrarPopupPuntos();
    });
  }
});

//BTN PUNTAJE //

//   document.addEventListener("DOMContentLoaded", function () {
//     // Agregar un evento de clic al botón "3er Juego"
//     document.getElementById("boton-3er-juego").addEventListener("click", function (event) {
//       // Evitar el comportamiento predeterminado del enlace
//       event.preventDefault();
//       // Mostrar el popup con un mensaje personalizado
//       mostrarPopup("Este Juego va a estar disponible más adelante, ¡Mil disculpas!");
//     });

//     // Agregar un evento de clic al botón "Puntajes"
//     document.getElementById("botonPuntaje").addEventListener("click", function (event) {
//       // Evitar el comportamiento predeterminado del enlace
//       event.preventDefault();
//       // Mostrar el popup con un mensaje personalizado
//       mostrarPopup('FUNCION NO HABILITADA, ¡MIL DISCULPAS!');
//     });
//   });


// PUNTAJES - TABLA 
let puntajes = JSON.parse(localStorage.getItem("puntajes")) || {
  jugador1: { tateti: 0, generala: 0, tercerGame: 0 },
  jugador2: { tateti: 0, generala: 0, tercerGame: 0 },
};
let perfiles = JSON.parse(localStorage.getItem("perfiles")) || [];

// Crear una tabla
let tabla = document.createElement("table");

// Añadir la primera fila vacía y los nombres de los juegos
let thead = tabla.createTHead();
let headerRow = thead.insertRow();
headerRow.insertCell(); // Celda vacía
Object.keys(puntajes.jugador1).forEach((juego) => {
  let th = document.createElement("th");
  th.appendChild(document.createTextNode(juego[0]));
  headerRow.appendChild(th);
});

// Añadir filas para cada jugador
let tbody = tabla.createTBody();
Object.keys(puntajes).forEach((jugador, index) => {
  let row = tbody.insertRow();
  let cellJugador = row.insertCell();
  cellJugador.appendChild(
    document.createTextNode(perfiles[index].nombre)
  );

  Object.values(puntajes[jugador]).forEach((puntaje) => {
    let cell = row.insertCell();
    cell.appendChild(document.createTextNode(puntaje));
  });
});

// Añadir la tabla al DOM
document.getElementById("tabla-puntajes").appendChild(tabla);