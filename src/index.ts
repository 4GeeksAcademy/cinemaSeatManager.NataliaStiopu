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
// FUNCIÓN: reservarAsiento()
// ============================================================

/**
 * Intenta reservar un asiento específico en la sala.
 * Valida las coordenadas, verifica disponibilidad y actualiza la matriz.
 * 
 * @param sala {number[][]} - Matriz de asientos
 * @param fila {number} - Número de fila (1-8, coordenadas humanas)
 * @param columna {number} - Número de columna (1-10, coordenadas humanas)
 * @returns {string} - Mensaje indicando resultado de la operación
 */
function reservarAsiento(sala: number[][], fila: number, columna: number): string {
  // ===== VALIDACIÓN 1: Verificar que fila esté en rango válido (1-8) =====
  if (fila < 1 || fila > 8) {
    return `❌ Error: La fila debe estar entre 1 y 8. Ingresaste: ${fila}`;
  }

  // ===== VALIDACIÓN 2: Verificar que columna esté en rango válido (1-10) =====
  if (columna < 1 || columna > 10) {
    return `❌ Error: La columna debe estar entre 1 y 10. Ingresaste: ${columna}`;
  }

  // ===== CONVERSIÓN: Convertir de coordenadas humanas a índices de JavaScript =====
  // Las filas y columnas van de 1-8 y 1-10 respectivamente
  // Pero los arrays en JavaScript comienzan en índice 0
  // Por eso restamos 1 a ambas coordenadas
  const indiceF = fila - 1;      // Fila 1 → índice 0, Fila 8 → índice 7
  const indiceC = columna - 1;   // Columna 1 → índice 0, Columna 10 → índice 9

  // ===== VALIDACIÓN 3: Verificar si el asiento ya está ocupado =====
  if (sala[indiceF][indiceC] === 1) {
    return `❌ El asiento de la fila ${fila}, columna ${columna} ya está ocupado.`;
  }

  // ===== ACCIÓN: Cambiar el valor del asiento de 0 a 1 =====
  sala[indiceF][indiceC] = 1;

  // ===== CONFIRMACIÓN: Devolver mensaje de éxito =====
  return `✅ Reserva realizada correctamente: fila ${fila}, columna ${columna}.`;
}

// ============================================================
// FUNCIÓN: contarAsientos()
// ============================================================

/**
 * Recorre toda la matriz y cuenta los asientos ocupados y disponibles.
 * Devuelve ambos contadores en un arreglo de dos posiciones.
 * 
 * @param sala {number[][]} - Matriz de asientos a contar
 * @returns {[number, number]} - Array con [ocupados, disponibles]
 */
function contarAsientos(sala: number[][]): [number, number] {
  // Inicializa los contadores en 0
  let ocupados = 0;
  let disponibles = 0;

  // Bucle externo: recorre todas las FILAS (0 a 7)
  for (let fila = 0; fila < 8; fila++) {
    // Bucle interno: recorre todas las COLUMNAS (0 a 9) de cada fila
    for (let columna = 0; columna < 10; columna++) {
      // Accede al valor actual de la posición [fila][columna]
      if (sala[fila][columna] === 1) {
        // Si el valor es 1 (ocupado), incrementa el contador de ocupados
        ocupados++;
      } else {
        // Si el valor es 0 (disponible), incrementa el contador de disponibles
        disponibles++;
      }
    }
  }

  // Devuelve ambos contadores como un arreglo de dos elementos
  return [ocupados, disponibles];
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
console.log("🎫 Simulando algunas reservas previas...\n");
matrizSala[0][2] = 1; // Fila 1, Columna 3 → Ocupado
matrizSala[0][9] = 1; // Fila 1, Columna 10 → Ocupado
matrizSala[1][5] = 1; // Fila 2, Columna 6 → Ocupado
matrizSala[2][1] = 1; // Fila 3, Columna 2 → Ocupado
matrizSala[4][4] = 1; // Fila 5, Columna 5 → Ocupado
matrizSala[7][0] = 1; // Fila 8, Columna 1 → Ocupado

// Muestra la sala inicial
console.log("🎬 ESTADO INICIAL DE LA SALA:\n");
mostrarSala(matrizSala);

// ===== PRUEBA 1: Reserva correcta =====
console.log("\n\n📝 PRUEBA 1: Reservar un asiento disponible (Fila 3, Columna 5)");
console.log("────────────────────────────────────────────────────");
const resultado1 = reservarAsiento(matrizSala, 3, 5);
console.log(resultado1);

// ===== PRUEBA 2: Intentar reservar el mismo asiento =====
console.log("\n📝 PRUEBA 2: Intentar reservar el mismo asiento (Fila 3, Columna 5)");
console.log("────────────────────────────────────────────────────");
const resultado2 = reservarAsiento(matrizSala, 3, 5);
console.log(resultado2);

// ===== PRUEBA 3: Fila inválida (mayor a 8) =====
console.log("\n📝 PRUEBA 3: Intentar reservar con fila inválida (Fila 10, Columna 5)");
console.log("────────────────────────────────────────────────────");
const resultado3 = reservarAsiento(matrizSala, 10, 5);
console.log(resultado3);

// ===== PRUEBA 4: Columna inválida (mayor a 10) =====
console.log("\n📝 PRUEBA 4: Intentar reservar con columna inválida (Fila 5, Columna 15)");
console.log("────────────────────────────────────────────────────");
const resultado4 = reservarAsiento(matrizSala, 5, 15);
console.log(resultado4);

// ===== PRUEBA 5: Coordenadas negativas =====
console.log("\n📝 PRUEBA 5: Intentar reservar con coordenadas negativas (Fila 0, Columna 5)");
console.log("────────────────────────────────────────────────────");
const resultado5 = reservarAsiento(matrizSala, 0, 5);
console.log(resultado5);

// ===== PRUEBA 6: Otra reserva correcta =====
console.log("\n📝 PRUEBA 6: Reservar otro asiento disponible (Fila 7, Columna 8)");
console.log("────────────────────────────────────────────────────");
const resultado6 = reservarAsiento(matrizSala, 7, 8);
console.log(resultado6);

// Muestra la sala después de las operaciones
console.log("\n\n🎬 ESTADO FINAL DE LA SALA (después de las reservas):\n");
mostrarSala(matrizSala);

// ===== CONTAR ASIENTOS =====
console.log("\n\n📊 CONTEO DE ASIENTOS");
console.log("════════════════════════════════════════════════════");

// Llama a contarAsientos y obtiene los resultados
const [ocupados, disponibles] = contarAsientos(matrizSala);

// Muestra los resultados
console.log(`✈️  Asientos ocupados:    ${ocupados}`);
console.log(`🟢 Asientos disponibles: ${disponibles}`);
console.log(`📋 Total de asientos:    ${ocupados + disponibles}`);

// Verifica que la suma sea correcta (80 asientos en total)
console.log("\n📈 VALIDACIÓN:");
if (ocupados + disponibles === 80) {
  console.log("✅ Suma correcta: ocupados + disponibles = 80");
} else {
  console.log(`❌ Error: ocupados (${ocupados}) + disponibles (${disponibles}) ≠ 80`);
}

// Calcula el porcentaje de ocupación
const porcentajeOcupacion = ((ocupados / 80) * 100).toFixed(2);
const porcentajeDisponibilidad = ((disponibles / 80) * 100).toFixed(2);

console.log(`\n📊 PORCENTAJE DE OCUPACIÓN:`);
console.log(`   • Ocupación: ${porcentajeOcupacion}%`);
console.log(`   • Disponibilidad: ${porcentajeDisponibilidad}%`);

console.log("\n✅ Todas las pruebas completadas exitosamente");

export {};
