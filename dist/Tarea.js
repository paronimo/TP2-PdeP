"use strict";
/*1)Instalar prompt-sync → npm install prompt-sync
  2)Compilar: tsc tareas.ts
  3)Ejecutar: node tareas.js */
Object.defineProperty(exports, "__esModule", { value: true });
const prompt_sync_1 = require("prompt-sync");
const prompt = (0, prompt_sync_1.default)({ sigint: true });
const MAX_TAREAS = 100;
let listaTareas = [];
let cantidadTareas = 0;
//funciones de crear tarea
function pedirTitulo(t) {
    t.titulo = prompt("Título de la tarea: ");
}
function pedirDescripcion(t) {
    t.descripcion = prompt("Descripción: ");
}
function pedirDificultad(t) {
    do {
        console.log("\n1 = § = Facilisimo\n2 = §§ = Facil\n3 = §§§ = Medio\n4 = §§§§ = Complicado\n5 = §§§§§ = Dificilisimo");
        t.dificultad = parseInt(prompt("Seleccione su dificultad (1-5): "));
    } while (t.dificultad < 1 || t.dificultad > 5);
}
function pedirEstado(t) {
    let opcion;
    do {
        console.log("\n1 = Pendiente\n2 = En curso\n3 = Terminada");
        opcion = parseInt(prompt("Seleccione el estado: "));
    } while (opcion < 1 || opcion > 3);
    switch (opcion) {
        case 1:
            t.estado = "Pendiente";
            break;
        case 2:
            t.estado = "En curso";
            break;
        case 3:
            t.estado = "Terminada";
            break;
    }
}
function pedirFechaVencimiento(t) {
    const desea = parseInt(prompt("¿Quiere fecha de vencimiento? SI(1) / NO(2): "));
    t.preguntaFecha = desea;
    if (desea === 1) {
        let confirm = 0;
        do {
            t.dia = parseInt(prompt("Ingrese día: "));
            t.mes = parseInt(prompt("Ingrese mes: "));
            t.anio = parseInt(prompt("Ingrese año: "));
            if (t.dia > 31 || t.dia <= 0 || t.mes > 12 || t.mes <= 0 || t.anio < 2025) {
                console.log("Fecha inválida. Intente nuevamente.\n");
                continue;
            }
            console.log(`Fecha ingresada: ${t.dia}/${t.mes}/${t.anio}`);
            confirm = parseInt(prompt("¿Confirmar? SI(1) / NO(2): "));
        } while (confirm !== 1);
    }
}
//Crear tarea
function crearTarea() {
    if (cantidadTareas >= MAX_TAREAS) {
        console.log("No se pueden agregar más tareas.");
        return;
    }
    console.clear();
    console.log("Creando una nueva tarea...\n");
    let tarea = {
        titulo: "",
        descripcion: "",
        dificultad: 1,
        estado: "Pendiente",
        preguntaFecha: 2
    };
    pedirTitulo(tarea);
    pedirDescripcion(tarea);
    pedirDificultad(tarea);
    pedirEstado(tarea);
    pedirFechaVencimiento(tarea);
    console.clear();
    mostrarResumen(tarea);
    const confirm = parseInt(prompt("¿Confirmar tarea? SI(1) / NO(2): "));
    if (confirm === 1) {
        listaTareas.push(tarea);
        cantidadTareas++;
        console.log("\n¡Tarea guardada exitosamente!\n");
    }
    else {
        console.log("\nTarea cancelada.");
    }
}
function mostrarResumen(t) {
    console.log("----------------------------------------");
    console.log(`Título: ${t.titulo}`);
    console.log(`Descripción: ${t.descripcion}`);
    const dificultadTexto = ["Facilisimo", "Facil", "Medio", "Complicado", "Dificilisimo"][t.dificultad - 1];
    console.log(`Dificultad: ${"§".repeat(t.dificultad)} (${dificultadTexto})`);
    const fecha = new Date();
    console.log(`Creada el: ${fecha.getDate()}/${fecha.getMonth() + 1}/${fecha.getFullYear()}`);
    console.log(`Estado: ${t.estado}`);
    if (t.preguntaFecha === 1 && t.dia && t.mes && t.anio) {
        console.log(`Vencimiento: ${t.dia}/${t.mes}/${t.anio}`);
    }
    else {
        console.log("Vencimiento: Sin fecha definida");
    }
    console.log("----------------------------------------\n");
}
//ver tarea
function verTareas() {
    console.clear();
    if (cantidadTareas === 0) {
        console.log("No hay tareas registradas.");
        return;
    }
    let opcion;
    do {
        console.log("\n--- VER TAREAS ---");
        console.log("(0) Volver\n(1) Todas\n(2) Pendientes\n(3) En curso\n(4) Terminadas");
        opcion = parseInt(prompt("Seleccione una opción: "));
        switch (opcion) {
            case 0: return;
            case 1:
                mostrarPorEstado("Todas");
                break;
            case 2:
                mostrarPorEstado("Pendiente");
                break;
            case 3:
                mostrarPorEstado("En curso");
                break;
            case 4:
                mostrarPorEstado("Terminada");
                break;
            default: console.log("Opción inválida.");
        }
    } while (opcion !== 0);
}
function mostrarPorEstado(estado) {
    console.clear();
    console.log(`\n--- ${estado === "Todas" ? "Todas las tareas" : "Tareas " + estado} ---\n`);
    let encontradas = false;
    for (let i = 0; i < cantidadTareas; i++) {
        if (estado === "Todas" || listaTareas[i].estado === estado) {
            mostrarResumen(listaTareas[i]);
            encontradas = true;
        }
    }
    if (!encontradas)
        console.log("No hay tareas en esta categoría.");
    prompt("ENTER para continuar...");
}
//buscar tarea
function buscarTarea() {
    console.clear();
    if (cantidadTareas === 0) {
        console.log("No hay tareas registradas.");
        return;
    }
    console.log("\n--- BUSCAR TAREA ---");
    for (let i = 0; i < cantidadTareas; i++) {
        console.log(`${i + 1}. ${listaTareas[i].titulo}`);
    }
    const seleccion = parseInt(prompt("Seleccione el número de tarea (0 para volver): "));
    if (seleccion > 0 && seleccion <= cantidadTareas) {
        console.clear();
        mostrarResumen(listaTareas[seleccion - 1]);
    }
    else if (seleccion !== 0) {
        console.log("Número inválido.");
    }
    prompt("ENTER para continuar...");
}
//editar tarea
function editarTarea() {
    console.clear();
    if (cantidadTareas === 0) {
        console.log("No hay tareas registradas.");
        return;
    }
    console.log("\n--- EDITAR TAREA ---");
    for (let i = 0; i < cantidadTareas; i++) {
        console.log(`${i + 1}. ${listaTareas[i].titulo}`);
    }
    const seleccion = parseInt(prompt("Seleccione el número (0 para volver): ")) - 1;
    if (seleccion >= 0 && seleccion < cantidadTareas) {
        let tarea = listaTareas[seleccion];
        console.log(`\nEditando: ${tarea.titulo}\n`);
        pedirTitulo(tarea);
        pedirDescripcion(tarea);
        pedirDificultad(tarea);
        pedirEstado(tarea);
        pedirFechaVencimiento(tarea);
        console.log("¡Tarea editada con éxito!");
    }
    else if (seleccion !== -1) {
        console.log("Número inválido.");
    }
    prompt("ENTER para continuar...");
}
//menu principal
function main() {
    let opc;
    do {
        console.log("\n--- MENÚ PRINCIPAL ---");
        console.log("0. Salir\n1. Crear tarea\n2. Ver tareas\n3. Buscar tarea\n4. Editar tarea");
        opc = parseInt(prompt("Seleccione una opción: "));
        switch (opc) {
            case 0:
                console.log("¡Hasta luego!");
                break;
            case 1:
                crearTarea();
                break;
            case 2:
                verTareas();
                break;
            case 3:
                buscarTarea();
                break;
            case 4:
                editarTarea();
                break;
            default: console.log("Opción inválida.");
        }
    } while (opc !== 0);
}
main();
