"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const calculadora_1 = require("./calculadora");
// Punto de entrada imperativo
function main() {
    console.log("=== Calculadora ===");
    console.log("Suma 10 + 5:", (0, calculadora_1.sumar)(10, 5));
    console.log("Resta 10 - 5:", (0, calculadora_1.restar)(10, 5));
    console.log("Multiplicación 10 * 5:", (0, calculadora_1.multiplicar)(10, 5));
    console.log("División 10 / 5:", (0, calculadora_1.dividir)(10, 5));
}
main();
