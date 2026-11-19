/**
 * Sistema de Gestión de Asientos de Sala de Cine
 * 
 * Este archivo contiene toda la lógica para gestionar los asientos
 * de una sala de cine, incluyendo disponibilidad, reservas y estado.
 */

// ============================================================
// FUNCIÓN: inicializarSala()
// ============================================================

/**
 * Crea e inicializa una matriz bidimensional de 8 filas x 10 columnas
 * con todos los valores en 0 (representando asientos disponibles).
 * 
 * @returns {number[][]} Matriz de 8x10 inicializada con ceros
 */
function inicializarSala(): number[][] {
  // Declara la variable de tipo matriz bidimensional
  let sala: number[][] = [];

  // Primer bucle: itera sobre las FILAS (0 a 7 = 8 filas)
  for (let fila = 0; fila < 8; fila++) {
    // Inicializa cada fila como un array vacío
    sala[fila] = [];

    // Segundo bucle: itera sobre las COLUMNAS (0 a 9 = 10 columnas)
    for (let columna = 0; columna < 10; columna++) {
      // Asigna 0 a cada posición [fila][columna]
      sala[fila][columna] = 0;
    }
  }

  // Devuelve la matriz completa
  return sala;
}

// ============================================================
// EJECUCIÓN Y PRUEBAS
// ============================================================

console.log("🎬 Inicializando sala de cine...\n");

// Llama la función y almacena la matriz
const matrizSala = inicializarSala();

// Verifica las dimensiones de la matriz
console.log("📊 VERIFICACIÓN DE DIMENSIONES:");
console.log(`   • Número de filas: ${matrizSala.length}`);
console.log(`   • Número de columnas: ${matrizSala[0].length}`);
console.log(`   • Total de asientos: ${matrizSala.length * matrizSala[0].length}\n`);

// Muestra la matriz en consola
console.log("📋 MATRIZ DE ASIENTOS (0 = disponible):\n");
console.log(matrizSala);

export {};
