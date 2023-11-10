// document.addEventListener("deviceready", onDeviceReady, false);

const cantJugadores = 2;

let perfiles = [];

let player = 0;

// function onDeviceReady() {

//   cargarPerfil();
// }

function cargarPerfil() {
  console.log("Cargando Usuarios... ");

  perfiles = Storage.cargar("perfiles") || [];
  console.log("perfiles:", perfiles);
  player = Number(new URLSearchParams(window.location.search).get("player"));

  document.getElementById("jugador").innerHTML = player + 1;

  if (perfiles[player]) {
    document.getElementById("nombre").value = perfiles[player].nombre;

    document.getElementById("apodo").value = perfiles[player].apodo;

    document.getElementById("color").value = perfiles[player].color;

    document.getElementById("pic").setAttribute("src", perfiles[player].pic);
  }
}

function guardarPerfil(event) {
  event.preventDefault();
  validarForm()
  // ["nombre", "apodo", "color", "pic"].forEach((campo) =>
  //   document.getElementById(campo)
  // );
  // Si el formulario es valido, se guarda en el Storage (base de datos)
//   if (validarForm()) {
//     console.log("Guardando..");
//     perfiles[player] = {
//       nombre: document.getElementById("nombre").value,
//       apodo: document.getElementById("apodo").value,
//       color: document.getElementById("color").value,
//       pic: document.getElementById("pic").getAttribute("src"),
//     };

//     Storage.guardar("perfiles", perfiles);

//     if (perfiles.length < cantJugadores) {
//       window.location.href = "perfil.htm?player=" + perfiles.length;
//     } else {
//       window.location.href = "menu.html";
//     }
//   }
}

function validarForm() {
  //   if (!utils.validarCamposDeTexto(["nombre", "apodo", "color"], 2, esValido)) {
  //     return false;
  //   }
  let nombre = document.getElementById("nombre").value;
//   let apodo = document.getElementById("apodo").value;
//   let img = document.getElementById("pic").value;
//   let color = document.getElementById("color").value;

  if (nombre === "") {
    console.log("Nombre vacio");
    alert("El nombre esta vacio");
    return false;
  }

  
 // apodo.length 
  //   if (img.getAttribute("src") === "img/usuario-de-perfil.png") {
  //     //todavía no se saco la foto y no es valido

  //     img.classList.add("notValid");

  //     img.focus();

  //     return false;
  //   } else {
  //     img.classList.remove("notValid");
  //   }
  //   return true;
}

function esValido(propiedad, valor) {
  let found = false;

  for (let i = 0; !found && i < perfiles.length; i++) {
    found = perfiles[i][propiedad] === valor;
  }

  return true;
}

function takePicture() {
  navigator.camera.getPicture(onPicture, onPictureError, {
    destinationType: Camera.DestinationType.DATA_URL,

    quality: 35,
  });
}

function onPicture(data) {
  document
    .getElementById("pic")
    .setAttribute("src", "data:image/jpeg;base64," + data);
}

function onPictureError(err) {
  console.error("No se puede tomar la foto ", err);
}

/* FUNCIONES O EVENTOS DE HTML --- */

// document
//     .getElementById("btn-guardar-perfil")
//     .addEventListener("click", guardarPerfil, false);

document.getElementById("btn-guardar-perfil").onclick = (event) => {
  guardarPerfil(event);
};
