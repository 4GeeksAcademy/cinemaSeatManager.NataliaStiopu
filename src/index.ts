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
// FUNCIÓN: mostrarSala()
// ============================================================

/**
 * Muestra el estado actual de la sala en la consola de forma legible.
 * Recorre la matriz bidimensional y convierte los valores numéricos
 * en caracteres visuales (L para libre, X para ocupado).
 * 
 * @param sala {number[][]} - Matriz de asientos a mostrar
 * @returns {void} - Solo muestra en consola, no retorna valores
 */
function mostrarSala(sala: number[][]): void {
  // Primera línea: Encabezado con números de columnas (1 a 10)
  let encabezado = "       "; // Espaciado inicial para alineación

  // Bucle para agregar números de columnas
  for (let col = 1; col <= 10; col++) {
    encabezado += col.toString().padStart(3, " "); // Alinea números con padding
  }

  console.log(encabezado);

  // Segundo nivel: recorrer todas las FILAS (0 a 7)
  for (let fila = 0; fila < 8; fila++) {
    // Comienza la línea con el número de fila (1 a 8)
    let linea = `Fila ${(fila + 1).toString().padStart(1, " ")} `;

    // Tercer nivel: recorrer todas las COLUMNAS de esa fila (0 a 9)
    for (let columna = 0; columna < 10; columna++) {
      // Convierte valor numérico a letra:
      // Si valor es 0 → "L" (asiento libre)
      // Si valor es 1 → "X" (asiento ocupado)
      const asiento = sala[fila][columna] === 0 ? "L" : "X";

      // Agrega el asiento a la línea con padding para alineación
      linea += asiento.padStart(3, " ");
    }

    // Muestra la línea completa
    console.log(linea);
  }
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

// Simula algunos asientos ocupados (valores 1) para demostración
console.log("🎫 Simulando algunas reservas para demostración...\n");
matrizSala[0][2] = 1; // Fila 1, Columna 3 → Ocupado
matrizSala[0][9] = 1; // Fila 1, Columna 10 → Ocupado
matrizSala[1][5] = 1; // Fila 2, Columna 6 → Ocupado
matrizSala[2][1] = 1; // Fila 3, Columna 2 → Ocupado
matrizSala[4][4] = 1; // Fila 5, Columna 5 → Ocupado
matrizSala[7][0] = 1; // Fila 8, Columna 1 → Ocupado

// Muestra la sala con la visualización formateada
console.log("🎬 ESTADO DE LA SALA:\n");
mostrarSala(matrizSala);

console.log("\n✅ Función completada exitosamente");

export {};
