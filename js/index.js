/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

// Wait for the deviceready event before using any of Cordova's device APIs.
// See https://cordova.apache.org/docs/en/latest/cordova/events/events.html#deviceready
document.addEventListener('deviceready', onDeviceReady, false);

const  cantJugadores = 2;

function onDeviceReady() {

    let perfiles = Storage.cargar("perfiles");

    if (perfiles === null) {
       
        window.location.href = "perfil.html?player=0";

    } else if (perfiles.lenght < cantJugadores){

        window.location.href = "perfil.html?player=" + perfiles.lenght;
    } else {

        window.location.href = "menu.html"
    }
}

// document.addEventListener('deviceready', onDeviceReady, false);

// const cantJugadores = 2;

// function onDeviceReady() {
//     let perfiles = Storage.cargar("perfiles");

//     if (perfiles === null || perfiles.length === 0) {
//         // No hay perfiles, redirige a la página de creación de perfiles
//         window.location.href = "crear_perfil.html";
//     } else if (perfiles.length < cantJugadores) {
//         // Redirige a la página de perfil correspondiente si hay espacio para más jugadores
//         window.location.href = "perfil.html?player=" + perfiles.length;
//     } else {
//         // Hay suficientes perfiles, redirige al menú
//         window.location.href = "menu.html";
//     }
// }
