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
  // const btn3 = document.getElementById("boton-3er-juego");
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

// Función para crear la tabla de puntajes
function crearTabla() {
  let puntajes = JSON.parse(localStorage.getItem("puntajes")) || {
    jugador1: { tateti: 0, generala: 0, memotest: 0 },
    jugador2: { tateti: 0, generala: 0, memotest: 0 },
  };
  let perfiles2 = JSON.parse(localStorage.getItem("perfiles")) || [];

  // Crear una tabla
  let tabla = document.createElement("table");

  // Añadir la primera fila vacía y los nombres de los jugadores
  let thead = tabla.createTHead();
  let headerRow = thead.insertRow();
  headerRow.insertCell(); // Celda vacía para la esquina superior izquierda

  perfiles2.forEach((jugador, jugadorIndex) => {
    let th = document.createElement("th");
    th.appendChild(document.createTextNode(jugador.nombre));
    headerRow.appendChild(th);
  });

  // Añadir filas para cada juego
  let tbody = tabla.createTBody();
  Object.keys(puntajes.jugador1).forEach((juego) => {
    let row = tbody.insertRow();
    let cellNombreJuego = row.insertCell();
    cellNombreJuego.appendChild(document.createTextNode(juego)); 

    perfiles2.forEach((perfil) => {
      let cellPuntaje = row.insertCell();
      let jugadorKey = `jugador${perfiles2.indexOf(perfil) + 1}`;
      let puntaje = puntajes[jugadorKey][juego]; // Acceder al puntaje usando jugadorKey y el nombre del juego
      cellPuntaje.appendChild(document.createTextNode(puntaje));
    });
  });

  // Vaciar el contenedor de la tabla y añadir la nueva tabla
  let contenedorTabla = document.getElementById("tabla-puntajes");
  contenedorTabla.innerHTML = ""; // Limpiar el contenedor
  contenedorTabla.appendChild(tabla); // Añadir la nueva tabla
}

// Obtener el botón que abre el modal
let btnPuntos = document.getElementById("botonPuntos");

// Obtener el modal
let modal = document.getElementById("modalPuntos");

// Obtener el elemento <span> que cierra el modal
let span = document.getElementsByClassName("close")[0];

// Cuando el usuario hace clic en el botón, muestra el modal
btnPuntos.onclick = function () {
  modal.style.display = "block";
  crearTabla(); // Llamar a la función para crear la tabla
};

// Cuando el usuario hace clic en <span> (x), cierra el modal
span.onclick = function () {
  modal.style.display = "none";
};

// Cuando el usuario hace clic fuera del modal, lo cierra
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};
