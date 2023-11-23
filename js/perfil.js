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
  // perfiles = [0{},1{}] perfiles[1]
  if (perfiles[player]) {
    document.getElementById("nombre").value = perfiles[player].nombre;

    document.getElementById("apodo").value = perfiles[player].apodo;

    document.getElementById("color").value = perfiles[player].color;

    document.getElementById("pic").setAttribute("src", perfiles[player].pic);
  }
}

function guardarPerfil(event) {
  event.preventDefault();

  //  ["nombre", "apodo", "color", "pic"].forEach((campo) =>
  //   document.getElementById(campo)
  // );
  // Si el formulario es valido, se guarda en el Storage (base de datos)
  if (validarForm()) {
    console.log("Guardando..");
    perfiles[player] = {
      nombre: document.getElementById("nombre").value,
      apodo: document.getElementById("apodo").value,
      color: document.getElementById("color").value,
      pic: document.getElementById("pic").src,
    };
    //perfiles = [ {nombre, apodo, color, pic}, {nombre,apodo}]
    Storage.guardar("perfiles", perfiles);

    if (perfiles.length < cantJugadores) {
      window.location.href = "perfil.html?player=" + perfiles.length;
    } else {
      window.location.href = "menu.html";
    }
  }
}

function validarForm() {
  //   if (!utils.validarCamposDeTexto(["nombre", "apodo", "color"], 2, esValido)) {
  //     return false;
  //   }
  console.log("Validando...");
  let nombre = document.getElementById("nombre").value;
  let apodo = document.getElementById("apodo").value;
  let img = document.getElementById("pic").src;
  let color = document.getElementById("color").value;

  if (nombre === "") {
    console.log("Nombre vacio");
    alert("El nombre esta vacio");
    return false;
  }

  if (apodo === "") {
    console.log("apodo vacio");
    alert("El apodo esta vacio");
    return false;
  }
  console.log(color);
  if (color === "#000000") {
    console.log("color vacio");
    alert("El color esta vacio");

    return false;
  }
  perfiles = Storage.cargar("perfiles") || [];

  if (perfiles.length != 0) {
    if (color === perfiles[0].color) {
      console.log(color, perfiles);
      alert("El Color ya fue usado, elija otro.")
      return false;
    }
  }

  //FUNCION FOTO //

// Primero traer colores del storage
// checkear que Perfil es, si 1 o 2 .

//  Comprar color con color1 y color2, si son d

 apodo.length
 if (img.getAttribute("src") === "img/usuario-de-perfil.png") {
   //     //todavía no se saco la foto y no es valido

   return false;
 } else {
   return true;
 }
  return true;
}

function esValido(propiedad, valor) {
  let found = false;

  for (let i = 0; !found && i < perfiles.length; i++) {
    found = perfiles[i][propiedad] === valor;
  }

  return true;
}

//FUNCION FOTO //

 function takePicture() {
   navigator.camera.getPicture(
     (imageData) => {
       document.getElementById("pic").src =
         "data:image/jpeg;base64," + imageData;
     },
     (error) => {
       console.error("No se puede tomar la foto", error);
     },
     {
       destinationType:
         device.platform === "browser"
           ? Camera.DestinationType.FILE_URI
           : Camera.DestinationType.DATA_URL,
     }
   );
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
